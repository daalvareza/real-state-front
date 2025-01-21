const API_KEY = 'dcd30bef';
const BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = async (movieName: string, page: number = 1) => {
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${movieName}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

export const getMovieDetails = async (id: string) => {
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

export const getMovieDetailsByTitle = async (title: string) => {
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&t=${title}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

export const getAllMovieDetails = async (movies: string[]) => {
  return await Promise.all(movies.map(title => getMovieDetailsByTitle(title)));
};
