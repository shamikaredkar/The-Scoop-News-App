# The-Scoop-News-App

![The-Scoop-News-App](https://github.com/shamikaredkar/The-Scoop-News-App/blob/main/Preview.png)

## Purpose
The Scoop is a web application that allows users to search for TV shows from various sources. Users can navigate through the shows using pagination and see the results of their search queries displayed dynamically.

## Features
- Search for TV shows
- Display search results with show title, network, description, read more link, and premiered date
- Navigate through shows using previous and next buttons
- Display the search query dynamically above the results
- Handle duplicate shows to ensure unique results

## Usage
- Enter a search term in the input field.
- Click the "Search" button to fetch and display TV shows related to the search term.
- Use the "Previous" and "Next page" buttons to navigate through the results.
- The search query is displayed above the results to indicate what was searched.
   
## Code Structure
### HTML
index.html: The main HTML file that includes the structure of the app.
### CSS
styles.css: Styles the main components of the app using Bulma and custom styles.
### JavaScript
app.js: Handles the functionality of the app, including fetching TV shows, updating the DOM, handling pagination, and preventing duplicate shows.
### Bulma
The Scoop App uses Bulma, a modern CSS framework, for styling the components. Bulma provides a clean and responsive design with minimal effort, ensuring the app looks great on all devices.

## How It Works
### HTML
The main container of the app includes the input field for the search query, the search button, and the container div where the TV shows are displayed. The previous and next buttons are used for pagination. An <h3> element is included to dynamically display the search query.

### CSS
The CSS styles the body, the main container, the search input, buttons, and the TV show cards. Bulma is used for overall layout and responsiveness, while custom styles ensure the app's unique look and feel.

### JavaScript
The JavaScript file includes the following main functions:

- `createUniqueKey(show)`: Generates a unique key for each show using its ID and name.
- `getShows(query, page)`: Fetches TV shows based on the search query and page number. Updates the DOM with the shows and handles duplicates.
- `updatePagination()`: Updates the state of the previous and next buttons based on the current page and total pages.
- `searchButton.addEventListener('click', () => { ... })`: Handles the search button click event to fetch and display shows based on the user's query.
- `prevButton.addEventListener('click', (event) => { ... })`: Handles the previous button click event to navigate to the previous page of results.
- `nextButton.addEventListener('click', (event) => { ... })`: Handles the next button click event to navigate to the next page of results.

### Main Functions in Detail
- `createUniqueKey(show)`: This function generates a unique key for each show by combining its ID and name. This key is used to ensure that duplicate shows are not displayed.
- 
- `getShows(query, page)`: This function fetches TV shows from the TVMaze API based on the provided search query and page number. It clears previous results and updates the DOM with new shows. It also ensures that only unique shows are displayed by checking against a set of seen shows.
- 
- `updatePagination()`: This function updates the state of the pagination buttons (previous and next) based on the current page and the total number of pages available. It enables or disables the buttons as necessary.
- 
- `searchButton.addEventListener('click', () => { ... })`: This event listener handles the click event on the search button. It reads the user's search query, updates the search query display, and fetches the TV shows.
- 
- `prevButton.addEventListener('click', (event) => { ... })`: This event listener handles the click event on the previous button. It decrements the current page number and fetches the previous page of TV shows.
- 
- `nextButton.addEventListener('click', (event) => { ... })`: This event listener handles the click event on the next button. It increments the current page number and fetches the next page of TV shows.
