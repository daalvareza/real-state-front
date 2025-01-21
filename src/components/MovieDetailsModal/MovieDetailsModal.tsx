import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { useQuery } from '@tanstack/react-query';
import { getAllMovieDetails, getMovieDetails } from '../../services/movieService';
import { Movie } from '../../store/types';
import {
    AddToFavoriesButton,
    DetailsContainer, 
    InfoContainer, 
    LoadingPlaceholder, 
    ModalContent, 
    PosterCard, 
    RecommendationCard, 
    RecommendationImage, 
    RecommendedSection, 
    Separator, 
    StyledModal 
} from './MovieDetailsModal.styled';
import theme from '../../theme';
import { useDispatch } from 'react-redux';
import { setSelectedMovieId } from '../../store/moviesSlice';
import FavoritesFormModal from '../FavoritesFormModal/FavoritesFormModal';
import { getMovieRecommendations, getMovieSentiment } from '../../services/favoriteService';

interface MovieDetailsModalProps {
  movieId: string | null;
  onClose: () => void;
  notes?: string;
  toUpdate?: boolean;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
    movieId,
    onClose,
    notes,
    toUpdate = false,
}) => {
    const dispatch = useDispatch();
    const [isFormOpen, setIsFormOpen] = useState(false);

    let { data: movieDetails, isLoading } = useQuery({
        queryKey: ['movieDetails', movieId],
        queryFn: () => getMovieDetails(movieId!),
        enabled: !!movieId,
    });

    const { data: recommendations } = useQuery({
        queryKey: ['recommendations', movieDetails?.Title],
        queryFn: () => getMovieRecommendations(movieDetails?.Title!),
        enabled: !!movieDetails?.Title,
    });

    const { data: recommendedMovieDetails, isLoading: isLoadingDetails } = useQuery({
        queryKey: ['recommendedMovieDetails', recommendations],
        queryFn: () => getAllMovieDetails(recommendations?.data?.movies || []),
        enabled: Array.isArray(recommendations?.data?.movies) && recommendations.data.movies.length > 0,
    });

    const { data: sentiment, isLoading: isLoadingSentiment } = useQuery({
        queryKey: ['sentiment', movieDetails?.imdbID],
        queryFn: () => getMovieSentiment(movieDetails?.imdbID!),
        enabled: !!movieDetails?.imdbID,
    });

    const isAnyLoading = [isLoading, isLoadingDetails, !recommendations, isLoadingSentiment].some(Boolean);

    if (!movieDetails) return null;
    if (notes) {
        movieDetails = {
            ...movieDetails,
            Notes: notes,
        };
    }
    if (sentiment?.data?.sentiment) {
        movieDetails = {
            ...movieDetails,
            Sentiment: sentiment.data.sentiment,
        };
    }

    return (
        <>
        <StyledModal open={!!movieId} onClose={onClose}>
            <ModalContent>
                <DetailsContainer>
                    <PosterCard>
                        <img
                            src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/placeholder.jpg"}
                            alt={movieDetails.Title}
                            style={{ maxHeight: "20rem", borderRadius: "4px"}}
                        />
                    </PosterCard>
                    <InfoContainer>
                        <Typography variant="h4" sx={{ paddingBottom: theme.spacing(2)}}>{movieDetails.Title}</Typography>
                        <Typography><b>Year:</b> {movieDetails.Year}</Typography>
                        <Typography><b>Genre:</b> {movieDetails.Genre}</Typography>
                        <Typography><b>Plot:</b> {movieDetails.Plot}</Typography>
                        {movieDetails.Notes && (<Typography><b>Your Notes:</b> {movieDetails.Notes}</Typography>)}
                        {movieDetails.Sentiment && (<Typography><b>Overall Sentiment:</b> {movieDetails.Sentiment}</Typography>)}
                        <AddToFavoriesButton
                            variant="contained"
                            color="secondary"
                            onClick={() => setIsFormOpen(true)}
                        >
                            {toUpdate ? "Update Favorite" : "Add to Favorites"}
                        </AddToFavoriesButton>
                    </InfoContainer>
                </DetailsContainer>

                <Separator />

                <RecommendedSection>
                    <Typography variant="h5" sx={{ paddingBottom: theme.spacing(2) }}>
                        Recommended Movies
                    </Typography>
                    {isAnyLoading ? (
                        <LoadingPlaceholder>
                            <CircularProgress />
                        </LoadingPlaceholder>                        
                    ) : Array.isArray(recommendedMovieDetails) && recommendedMovieDetails.length > 0 ? (
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={20}
                            slidesPerView={5}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            grabCursor={true}
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 10 },
                                768: { slidesPerView: 3, spaceBetween: 15 },
                                1024: { slidesPerView: 5, spaceBetween: 20 },
                            }}
                        >
                            {recommendedMovieDetails.map((movie: Movie) => (
                                <SwiperSlide key={movie.imdbID}>
                                    <RecommendationCard onClick={() => dispatch(setSelectedMovieId(movie.imdbID))}>
                                        <RecommendationImage
                                            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                                            alt={movie.Title}
                                            style={{ maxHeight: "15rem", borderRadius: "4px" }}
                                        />
                                        <Typography variant="subtitle1" align="center">
                                            {movie.Title}
                                        </Typography>
                                    </RecommendationCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <Typography>No recommended movies available.</Typography>
                    )}
                </RecommendedSection>

            </ModalContent>
        </StyledModal>
        <FavoritesFormModal 
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            movie={movieDetails}
            toUpdate={toUpdate}
        />
        </>
    );
};

export default MovieDetailsModal;
