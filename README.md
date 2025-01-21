# Movie Explorer React App

## Overview

Movie Explorer is a comprehensive React-based application for browsing and managing a personalized list of favorite movies. It features a clean architecture, state management with Redux Toolkit, and asynchronous data fetching with `react-query`. The app also integrates with OpenAI to recommend movies based on user preferences.

---

## Features

1. **Movie Search**: Search for movies using the OMDB API and display search results in a grid format.
2. **Movie Details Modal**: View detailed information about a movie, including title, genre, plot, and a poster image.
3. **Favorites Management**: Add, update, and remove movies in the user's favorites list.
4. **Login Modal**: Log in or sign up to personalize the experience, utilizing a simple REST API.
5. **Movie Recommendations**: Uses OpenAI integration to recommend movies based on user interactions.
6. **Pagination**: Navigate through multiple pages of search results.
7. **Header with Search Bar**: Includes a search input, favorites count, and a login button with a dropdown for authentication.

---

## Components

### 1. `MovieSearch`
  - Search for movies using a query string.
  - Pagination for browsing large results.
  - Movie cards display the poster and title.

### 2. `MovieDetailsModal`
  - Fetches additional details about a movie using its `imdbID`.
  - Allows users to add the movie to their favorites.
  - Includes OpenAI-based recommendations for similar movies.

### 3. `FavoritesView`
  - Fetches movie posters for favorite movies dynamically.
  - Allows users to remove movies from their favorites.
  - Opens `MovieDetailsModal` for detailed views.

### 4. `LoginModal`
  - Saves a JWT token for authentication.
  - Displays error messages for failed attempts.
  - Switches between login and signup modes.

### 5. `Header`
  - Includes a search bar to initiate movie searches.
  - Displays a favorites count button that navigates to the `FavoritesView`.
  - Provides a login icon to toggle the `LoginModal`.

### 6. `FavoritesFormModal`
  - Validates user authentication before submission.
  - Dynamically updates the Redux state and persists data using API calls.

### 7. `MovieSearchContainer`
  - Manages movie search queries and pagination.
  - Handles rendering of the MovieSearch component for displaying results.

---

## Tools & Technologies

- **React**: Component-based library for building user interfaces.
- **Redux Toolkit**: Manages global state, including favorites and authentication.
- **React Query**: Handles asynchronous data fetching and caching.
- **Material-UI (MUI)**: Provides a styled component library for UI elements.
- **TypeScript**: Ensures type safety and code reliability.
- **Jest & React Testing Library**: Unit testing framework and utilities.
- **OpenAI API**: Generates movie recommendations.
- **OMDB API**: Fetches movie details and search results.

---

## Running the Project Locally

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn

### Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/movie-explorer.git
    cd movie-explorer/react-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set API URL**:
    In the `favoriteService.ts` update the `BASE_URL` value with the API you want to use, by default is the node.js API deployed on Render

4. **Run the Application**:
    ```bash
    npm start
    # or
    yarn start
    ```

5. **Run Tests**:
    ```bash
    npm test
    # or
    yarn test
    ```

---

## How It Works

1. **Search Flow**:
   - The user enters a movie title to search in the `Header` component.
   - `useMovies` fetches results from the OMDB API.
   - Results are displayed in the `MovieSearch` grid.

2. **Favorites Flow**:
   - Users can add movies to their favorites from the `MovieDetailsModal`.
   - Favorites are stored in the Redux state and persisted using `favoriteService`.

3. **Recommendations Flow**:
   - OpenAI API provides recommendations for movies based on user preferences.
   - Recommendations are displayed in a `Swiper` slider in the `MovieDetailsModal`.

4. **Authentication**:
   - The `LoginModal` handles login and signup.
   - JWT tokens are stored in `localStorage` for authenticated requests.

---

## Future Enhancements

- Implement advanced filters for movie search.
- Add user profile management.
- Improve test coverage for all components and services.
- Optimize the recommendation algorithm using user interaction history.
