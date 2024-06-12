const newsapi = new NewsAPI('YOUR_API_KEY', { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });

const container = document.querySelector('.container');
const dateElement = document.querySelector('#date');
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');
const searchQueryElement = document.querySelector('#search-query');

let currentPage = 1;
let currentQuery = 'latest';
let totalPages = 0;
const seenArticles = new Set();

// FETCH TODAY'S DATE
const date = new Date();
dateElement.textContent = date.toDateString();

// Helper function to create a unique key for each article
function createUniqueKey(article) {
    return `${article.url}-${article.title}`;
}

// FETCH API
async function getNews(query = 'latest', page = 1) {
    try {
        const response = await newsapi.v2.everything({
            q: query,
            from: '2024-05-12',
            sortBy: 'publishedAt',
            language: 'en',
            page: page,
            pageSize: 9
        });
        const data = response;
        console.log(data);
        
        // Clear the current container and seenArticles set only if it's a new search
        if (page === 1) {
            container.innerHTML = '';
            seenArticles.clear();
        }

        if (data.articles && data.articles.length) {
            data.articles.forEach(article => {
                const uniqueKey = createUniqueKey(article);

                // Check if the article has already been seen
                if (!seenArticles.has(uniqueKey)) {
                    seenArticles.add(uniqueKey);

                    const cardWrapper = document.createElement('div');
                    cardWrapper.classList.add('card-wrapper');

                    const card = document.createElement('div');
                    card.classList.add('card');

                    const cardImage = document.createElement('div');
                    cardImage.classList.add('card-image');
                    const figure = document.createElement('figure');
                    figure.classList.add('image', 'is-4by3');
                    
                    if (article.urlToImage) {
                        const image = document.createElement('img');
                        image.src = article.urlToImage;
                        image.alt = article.title;
                        figure.appendChild(image);
                    }

                    cardImage.appendChild(figure);
                    card.appendChild(cardImage);

                    const cardContent = document.createElement('div');
                    cardContent.classList.add('card-content');

                    const media = document.createElement('div');
                    media.classList.add('media');

                    const mediaContent = document.createElement('div');
                    mediaContent.classList.add('media-content');
                    
                    const title = document.createElement('p');
                    title.classList.add('title', 'is-4');
                    title.textContent = article.title;
                    mediaContent.appendChild(title);

                    if (article.author) {
                        const subtitle = document.createElement('p');
                        subtitle.classList.add('subtitle', 'is-6');
                        subtitle.textContent = `@${article.author}`;
                        mediaContent.appendChild(subtitle);
                    }

                    media.appendChild(mediaContent);
                    cardContent.appendChild(media);

                    const content = document.createElement('div');
                    content.classList.add('content');
                    content.textContent = article.description; // Use description instead of content

                    const readMore = document.createElement('a');
                    readMore.href = article.url;
                    readMore.textContent = 'Read More';
                    readMore.target = '_blank';
                    readMore.classList.add('read-more');

                    const time = document.createElement('time');
                    time.setAttribute('datetime', article.publishedAt);
                    time.textContent = new Date(article.publishedAt).toLocaleString();
                    time.classList.add('article-time');

                    cardContent.appendChild(content);
                    cardContent.appendChild(readMore); // Append read more link
                    cardContent.appendChild(time); // Append time below read more link
                    card.appendChild(cardContent);

                    cardWrapper.appendChild(card);
                    container.appendChild(cardWrapper);
                }
            });

            // Update totalPages
            totalPages = Math.ceil(data.totalResults / 9);
            updatePagination();
        }
    } catch (e) {
        console.error('Error fetching data:', e);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error Occurred';
        container.appendChild(errorMessage);
    }
}

// Update Pagination
function updatePagination() {
    if (currentPage > 1) {
        prevButton.classList.remove('is-disabled');
    } else {
        prevButton.classList.add('is-disabled');
    }

    if (currentPage < totalPages) {
        nextButton.classList.remove('is-disabled');
    } else {
        nextButton.classList.add('is-disabled');
    }
}

// Handle Search
searchButton.addEventListener('click', () => {
    const search = searchInput.value.trim();
    if (search) {
        currentQuery = search;
        currentPage = 1;
        searchQueryElement.textContent = `Search Results for "${search}"`; // Update the H3 element with the search query
        getNews(currentQuery, currentPage);
        searchInput.value = '';
    }
});

// Handle Pagination
prevButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        getNews(currentQuery, currentPage);
    }
});

nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
        currentPage++;
        getNews(currentQuery, currentPage);
    }
});

// Fetch initial news on page load
getNews(currentQuery, currentPage);













