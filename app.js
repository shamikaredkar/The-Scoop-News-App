const apiUrl = 'https://api.tvmaze.com/search/shows?q=';

const container = document.querySelector('.container');
const dateElement = document.querySelector('#date');
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');
const searchQueryElement = document.querySelector('#search-query');

let currentPage = 1;
let currentQuery = 'space'; // Default query
let totalPages = 0;
const itemsPerPage = 9; // Set the number of items per page
const seenShows = new Set(); // Set to keep track of unique shows

// FETCH TODAY'S DATE
const date = new Date();
dateElement.textContent = date.toDateString();

// Helper function to create a unique key for each show
function createUniqueKey(show) {
    return `${show.id}-${show.name}`;
}

// Helper function to truncate text to a certain number of words
function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

// FETCH API
async function getShows(query = 'space', page = 1) {
    try {
        const res = await fetch(`${apiUrl}${query}&page=${page}`);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);

        // Clear the current container and seenShows set only if it's a new search
        if (page === 1) {
            container.innerHTML = '';
            seenShows.clear();
        }

        if (data && data.length) {
            data.forEach(item => {
                const show = item.show;
                if (!show || !show.id || !show.name) {
                    // Skip this item if id or name is missing
                    return;
                }
                const uniqueKey = createUniqueKey(show);

                // Check if the show has already been seen
                if (seenShows.has(uniqueKey)) {
                    return;
                }
                seenShows.add(uniqueKey);

                const cardWrapper = document.createElement('div');
                cardWrapper.classList.add('card-wrapper');

                const card = document.createElement('div');
                card.classList.add('card');

                const cardImage = document.createElement('div');
                cardImage.classList.add('card-image');
                const figure = document.createElement('figure');
                figure.classList.add('image', 'is-4by3');

                if (show.image && show.image.medium) {
                    const image = document.createElement('img');
                    image.src = show.image.medium;
                    image.alt = show.name;
                    image.onerror = () => {
                        image.src = 'https://via.placeholder.com/300x300.png?text=No+Image';
                    };
                    figure.appendChild(image);
                } else {
                    const placeholderImage = document.createElement('img');
                    placeholderImage.src = 'https://via.placeholder.com/300x300.png?text=No+Image';
                    placeholderImage.alt = 'No Image Available';
                    figure.appendChild(placeholderImage);
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
                title.textContent = show.name;
                mediaContent.appendChild(title);

                if (show.network && show.network.name) {
                    const subtitle = document.createElement('p');
                    subtitle.classList.add('subtitle', 'is-6');
                    subtitle.textContent = `Network: ${show.network.name}`;
                    mediaContent.appendChild(subtitle);
                }

                media.appendChild(mediaContent);
                cardContent.appendChild(media);

                const content = document.createElement('div');
                content.classList.add('content');
                const summary = show.summary ? show.summary.replace(/<\/?[^>]+(>|$)/g, "") : 'No description available.';
                content.textContent = truncateText(summary, 40);

                const readMore = document.createElement('a');
                readMore.href = show.url;
                readMore.textContent = 'Read More';
                readMore.target = '_blank';
                readMore.classList.add('read-more');

                cardContent.appendChild(content);
                cardContent.appendChild(readMore); // Append read more link
                card.appendChild(cardContent);

                cardWrapper.appendChild(card);
                container.appendChild(cardWrapper);
            });

            // Update totalPages based on the data length
            totalPages = Math.ceil(data.length / itemsPerPage);
            updatePagination();
        } else {
            // Disable buttons if no data
            totalPages = 0;
            updatePagination();
        }
    } catch (e) {
        console.error('Error fetching data:', e);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error Occurred';
        container.appendChild(errorMessage);
        // Disable buttons on error
        totalPages = 0;
        updatePagination();
    }
}

// Update Pagination
function updatePagination() {
    if (currentPage <= 1) {
        prevButton.classList.add('is-disabled');
        prevButton.disabled = true;
    } else {
        prevButton.classList.remove('is-disabled');
        prevButton.disabled = false;
    }

    if (currentPage >= totalPages) {
        nextButton.classList.add('is-disabled');
        nextButton.disabled = true;
    } else {
        nextButton.classList.remove('is-disabled');
        nextButton.disabled = false;
    }

    // Disable both buttons if there are no more pages to show
    if (totalPages <= 1) {
        prevButton.classList.add('is-disabled');
        nextButton.classList.add('is-disabled');
        prevButton.disabled = true;
        nextButton.disabled = true;
    }
}

// Handle Search
searchButton.addEventListener('click', () => {
    const search = searchInput.value.trim();
    if (search) {
        currentQuery = search;
        currentPage = 1;
        searchQueryElement.textContent = `Search Results for "${search}"`; // Update the H3 element with the search query
        getShows(currentQuery, currentPage);
        searchInput.value = '';
    }
});

// Handle Pagination
prevButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        getShows(currentQuery, currentPage);
    }
});

nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
        currentPage++;
        getShows(currentQuery, currentPage);
    }
});

// Fetch initial shows on page load
getShows(currentQuery, currentPage);






























