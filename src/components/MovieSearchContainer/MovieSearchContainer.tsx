import React from "react";
import { useMovies } from "../../hooks/useMovies";
import MovieSearch from "../MovieSearch/MovieSearch";
import MovieDetailsModal from "../MovieDetailsModal/MovieDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPage, setSelectedMovieId } from "../../store/moviesSlice";
import { CircularProgress } from "@mui/material";
import { SpinnerContainer } from "./MovieSearchContainer.styled";

const MovieSearchContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { query, page, selectedMovieId } = useSelector((state: RootState) => state.movies);
    const { data, isLoading } = useMovies(query, page);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    return (
        <>
        {isLoading ? (
            <SpinnerContainer>
                <CircularProgress />
            </SpinnerContainer>
        ) : (
            data?.Search && (
                <MovieSearch
                    movies={data.Search}
                    onSelect={(id) => dispatch(setSelectedMovieId(id))}
                    totalResults={data.totalResults}
                    onPageChange={handlePageChange}
                    currentPage={page}
                />
            )
        )}
        {selectedMovieId && (
            <MovieDetailsModal 
                movieId={selectedMovieId}
                onClose={() => dispatch(setSelectedMovieId(null))}
            />
        )}
        </>
    );
};

export default MovieSearchContainer;