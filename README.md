# The-Scoop-News-App

![The-Scoop-News-App]()

## Purpose
The Scoop is a web application that allows users to search for news articles from various sources. Users can navigate through the articles using pagination and see the results of their search queries displayed dynamically.

## Features
- Search for news articles
- Display search results with article title, author, description, read more link, and published date
- Navigate through articles using previous and next buttons
- Display the search query dynamically above the results
- Handle duplicate articles to ensure unique results

## Usage
1. Enter a search term in the input field.
2. Click the "Search" button to fetch and display news articles related to the search term.
3. Use the "Previous" and "Next page" buttons to navigate through the results.
4. The search query is displayed above the results to indicate what was searched.
   
## Code Structure
### HTML
index.html: The main HTML file that includes the structure of the app.
### CSS
styles.css: Styles the main components of the app using Bulma and custom styles.
### JavaScript
app.js: Handles the functionality of the app, including fetching news articles, updating the DOM, handling pagination, and preventing duplicate articles.
### Bulma
The Scoop App uses Bulma, a modern CSS framework, for styling the components. Bulma provides a clean and responsive design with minimal effort, ensuring the app looks great on all devices.

## How It Works
### HTML
The main container of the app includes the input field for the search query, the search button, and the container div where the news articles are displayed. The previous and next buttons are used for pagination. An <h3> element is included to dynamically display the search query.

### CSS
The CSS styles the body, the main container, the search input, buttons, and the news article cards. Bulma is used for overall layout and responsiveness, while custom styles ensure the app's unique look and feel.

### JavaScript
The JavaScript file includes the following main functions:

-`createUniqueKey(article)`: Generates a unique key for each article using its URL and title.

-`getNews(query, page)`: Fetches news articles based on the search query and page number. Updates the DOM with the articles and handles duplicates.

-`updatePagination()`: Updates the state of the previous and next buttons based on the current page and total pages.

-`searchButton.addEventListener('click', () => { ... })`: Handles the search button click event to fetch and display articles based on the user's query.

-`prevButton.addEventListener('click', (event) => { ... })`: Handles the previous button click event to navigate to the previous page of results.

-`nextButton.addEventListener('click', (event) => { ... })`: Handles the next button click event to navigate to the next page of results.

### Main Functions in Detail
-`createUniqueKey(article)`: This function generates a unique key for each article by combining its URL and title. This key is used to ensure that duplicate articles are not displayed.

-`getNews(query, page)`: This function fetches news articles from the News API based on the provided search query and page number. It clears previous results and updates the DOM with new articles. It also ensures that only unique articles are displayed by checking against a set of seen articles.

`updatePagination()`: This function updates the state of the pagination buttons (previous and next) based on the current page and the total number of pages available. It enables or disables the buttons as necessary.

-`searchButton.addEventListener('click', () => { ... })`: This event listener handles the click event on the search button. It reads the user's search query, updates the search query display, and fetches the news articles.

-`prevButton.addEventListener('click', (event) => { ... })`: This event listener handles the click event on the previous button. It decrements the current page number and fetches the previous page of news articles.

-`nextButton.addEventListener('click', (event) => { ... })`: This event listener handles the click event on the next button. It increments the current page number and fetches the next page of news articles.
