# Real Estate Explorer React App

## Overview

Real Estate Explorer is a dynamic React-based application designed for browsing, searching, and managing real estate properties. It offers a seamless user experience with features such as user authentication, property filtering, detailed property views, and the ability to save favorite listings. The app leverages modern technologies and best practices to ensure performance, scalability, and maintainability.

---

## Features

1. **User Authentication**: Access your account using secure authentication.
2. **Property Browsing & Search**: Search for properties by name, address, or other criteria. Navigate through multiple pages of property listings.
3. **Property Details**: View comprehensive information about each property, including images, price, description, and key features.
4. **Responsive Design**: Optimized for various devices, ensuring a smooth experience on desktops, tablets, and mobile phones.

---

## Components

### 1. `Header`
  - Initiates property searches.
  - Displays login/signup buttons or user info when authenticated.

### 2. `LoginModal`
  - Toggle between login and signup forms.
  - Handle authentication via API endpoints.
  - Display error messages for failed attempts.

### 3. `FilterBar`
  - Select filters such as price range, name, address, etc.
  - Apply or reset filters to update property listings.

### 4. `HouseList`
  - Renders property cards with essential information.
  - Supports pagination for navigating through listings.

### 6. `HouseDetails`
  - Comprehensive details including description, amenities, and pricing.

### 7. `ImageCarousel`
  - Image carousel for property photos.

---

## Tools & Technologies

- **React**: Component-based library for building user interfaces.
- **React Router**: Manages client-side routing and navigation.
- **React Query**: Handles asynchronous data fetching and caching.
- **Material-UI (MUI)**: Provides a styled component library for UI elements.
- **TypeScript**: Ensures type safety and code reliability.
- **Jest & React Testing Library**: Unit testing framework and utilities.

---

## Running the Project Locally

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn

### Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/daalvareza/real-estate-front.git
    cd real-estate-front/react-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set API URL**:
    In the `authService.ts` and `propertyService.ts` update the `BASE_URL` value with the API you want to use, by default is the C# API local hosted

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

**Search Flow**:
   - The page includes a search bar that allows users to search for properties.
   - The `FilterBar` provides additional filtering options such as price range, name, and address.
   - The `PropertyList` component fetches and displays properties based on search and filter criteria.
   - Each property is represented by a `PropertyCard` displaying essential information.
   - Clicking on a `PropertyCard` opens the `HouseDetails` page, showing detailed information about the property.

---

## Future Enhancements

- Allow users to manage their profiles, view their activity history, and customize preferences.
- Implement additional security measures such as rate limiting, data validation, and encryption for sensitive data.
