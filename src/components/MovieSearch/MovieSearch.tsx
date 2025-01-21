import React from "react";
import { Movie } from "../../store/types";
import { MoviesContainer, MovieItem, MovieCard, MovieCardContent, MoviePoster, MovieTitle, MoviesSearchContainer, PaginationContainer, StyledPagination } from "./MovieSearch.styled";

interface MovieSearchProps {
    movies: Movie[];
    onSelect: (id: string) => void;
    totalResults: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ 
    movies,
    onSelect,
    totalResults,
    onPageChange,
    currentPage 
}) => {
    return (
        <MoviesSearchContainer>
            <MoviesContainer container >
                {movies.map((movie) => (
                    <MovieItem key={movie.imdbID}>
                        <MovieCard onClick={() => onSelect(movie.imdbID)}>
                            <MoviePoster
                                image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
                            />
                            <MovieCardContent>
                                <MovieTitle variant="h6" align="center">
                                    {movie.Title}
                                </MovieTitle>
                            </MovieCardContent>
                        </MovieCard>
                    </MovieItem>
                ))}
            </MoviesContainer>
            <PaginationContainer mt={4}>
                <StyledPagination 
                    count={Math.ceil(totalResults / 10)}
                    page={currentPage}
                    onChange={(_, page) => onPageChange(page)}
                    color="secondary"
                />
            </PaginationContainer>
        </MoviesSearchContainer>
    );
};

export default MovieSearch;