import { Movie } from "../store/types";

const BASE_URL = 'https://node-api-service-ugki.onrender.com';

export const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
};

export const signUp = async (name: string, password: string, email: string) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            name: name,
            password: password,
            email: email,
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to register user');
    }
    return response.json();
};

export const getFavoritesByUser = async (userId: string) => {
    const response = await fetch(`${BASE_URL}/user/${userId}/favorites`);
    if (!response.ok) {
        throw new Error('Failed to get user favorites');
    }
    return response.json();
};

export const addFavoriteToUser = async (favorite: Movie, userId: string) => {    
    const response = await fetch(`${BASE_URL}/user/${userId}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(favorite),
    });
    if (!response.ok) {
        throw new Error('Failed to add favorite');
    }
    return response.json();
};

export const updateUserFavorite = async (favorite: Movie, userId: string) => {    
    const response = await fetch(`${BASE_URL}/user/${userId}/favorites/${favorite.imdbID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(favorite),
    });
    if (!response.ok) {
        throw new Error('Failed to update favorite');
    }
    return response.json();
};

export const removeUserFavorite = async (favorite: Movie, userId: string) => {    
    const response = await fetch(`${BASE_URL}/user/${userId}/favorites/${favorite.imdbID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete favorite');
    }
    return response.json();
};

export const getMovieRecommendations = async (favorite: Movie) => {
    const encodedTitle = encodeURIComponent(favorite.Title);
    const response = await fetch(`${BASE_URL}/ai/movie-recommendations?movieName=${encodedTitle}`);
    if (!response.ok) {
        throw new Error('Failed to get movie recommendations');
    }
    return response.json();
}

export const getMovieSentiment = async (movieId: string) => {
    const response = await fetch(`${BASE_URL}/ai/movie-sentiment/${movieId}`);
    if (!response.ok) {
        throw new Error('Failed to get movie sentiment');
    }
    return response.json();
}
