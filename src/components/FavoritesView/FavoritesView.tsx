import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFavorite } from '../../store/favoritesSlice';
import MovieDetailsModal from '../MovieDetailsModal/MovieDetailsModal';
import {
  MoviesContainer,
  MovieItem,
  MovieCard,
  MoviePoster,
  MovieCardContent,
  MovieTitle,
} from '../MovieSearch/MovieSearch.styled'; // Reuse styles from MovieSearch
import { Favorite } from '../../store/types';
import { getMovieDetails } from '../../services/movieService';
import { removeUserFavorite } from '../../services/favoriteService';

const FavoritesView: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch();
  const [favoritesWithPosters, setFavoritesWithPosters] = useState<Favorite[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);

  const handleRemoveFavorite = (favorite: Favorite) => {
    dispatch(removeFavorite(favorite.imdbID));
    if (userId) removeUserFavorite(favorite, userId);
  };

  const handleCardClick = (favorite: Favorite) => {
    setSelectedMovieId(favorite.imdbID);
    setSelectedFavorite(favorite);
  };

  useEffect(() => {
    const fetchPosters = async () => {
        const posters = await Promise.all(
          favorites.map(async (favorite) => {
            try {
              const movieDetails = await getMovieDetails(favorite.imdbID);
              return {
                ...favorite,
                Poster: movieDetails.Poster !== 'N/A' ? movieDetails.Poster : '/placeholder.img',
                imdbID: favorite.imdbID || 'unknown',
              };
            } catch (error) {
              console.error(`Failed to fetch details for ${favorite.imdbID}`, error);
              return { ...favorite, poster: '/placeholder.img' };
            }
          })
        );
        setFavoritesWithPosters(posters);
    };
    fetchPosters();
  }, [favorites]);

  return (
    <Box>
      <MoviesContainer container>
        {favoritesWithPosters.map((movie, index) => (
          <MovieItem key={movie.imdbID || `${movie.Title}-${index}`}>
            <MovieCard onClick={() => handleCardClick(movie)}>
              <MoviePoster
                image={movie.Poster}
              />
              <MovieCardContent>
                <MovieTitle variant="h6" align="center" data-testid="movie-title">
                  {movie.Title}
                </MovieTitle>
              </MovieCardContent>
              <Button
                variant="contained"
                color="error"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  handleRemoveFavorite(movie);
                }}
              >
                X
              </Button>
            </MovieCard>
          </MovieItem>
        ))}
      </MoviesContainer>
      {selectedMovieId && (
        <MovieDetailsModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          notes={selectedFavorite?.Notes}
          toUpdate={true}
        />
      )}
    </Box>
  );
};

export default FavoritesView;
