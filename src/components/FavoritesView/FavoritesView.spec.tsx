import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FavoritesView from './FavoritesView';
import { getMovieDetails } from '../../services/movieService';
import { removeUserFavorite } from '../../services/favoriteService';
import favoritesReducer from '../../store/favoritesSlice';
import movieReducer from '../../store/moviesSlice';
import authReducer from '../../store/authSlice';
import { RootState } from '../../store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../../services/movieService');
jest.mock('../../services/favoriteService');
jest.mock('swiper/react', () => ({
    Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
    SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));
jest.mock('swiper', () => ({
    Autoplay: jest.fn(),
}));

const mockFavorites = [
    { imdbID: '1', Title: 'Movie 1', Notes: 'Great movie' },
    { imdbID: '2', Title: 'Movie 2', Notes: 'Another great movie' },
];

describe('FavoritesView Component', () => {
    let mockStore: ReturnType<typeof configureStore>;
    let queryClient: QueryClient;

    beforeEach(() => {
        mockStore = configureStore({
            reducer: {
                auth: authReducer,
                movies: movieReducer,
                favorites: favoritesReducer,
            },
        });
        mockStore.dispatch({ type: "auth/setUserId", payload: "1" });
        mockStore.dispatch({ type: "auth/setUserName", payload: "Test User" });
        mockStore.dispatch({
            type: "favorites/addFavorite",
            payload: mockFavorites,
        });

        queryClient = new QueryClient();

        (getMovieDetails as jest.Mock).mockImplementation((imdbID) =>
            Promise.resolve({
                Poster: `https://example.com/${imdbID}.jpg`,
                imdbID: imdbID,
            })
        );

        (removeUserFavorite as jest.Mock).mockResolvedValue(undefined);
    });

    const renderComponent = async () => {
        await act(async () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <Provider store={mockStore}>
                        <FavoritesView />
                    </Provider>
                </QueryClientProvider>
            );
        });

        await waitFor(() => {
            expect(screen.getByTestId('movie-title'));
        })
    };

    test('renders favorite movies with posters', async () => {
        renderComponent();
      
        await waitFor(() => {
            mockFavorites.forEach(() => {
                expect(screen.getByTestId('movie-title')).toBeInTheDocument();
            });
        });
    });      

    test('opens MovieDetailsModal when a movie card is clicked', async () => {
        await renderComponent();
        await waitFor(() => {
            const movieCard = screen.getByTestId('movie-title');
            fireEvent.click(movieCard);

            expect(screen.getByText(/Year/i)).toBeInTheDocument();
        });
    });

    test('removes a favorite when the delete button is clicked', async () => {
        await renderComponent();
        const removeButton = screen.getAllByText('X')[0];
        fireEvent.click(removeButton);

        await waitFor(() => {
            const state = mockStore.getState() as RootState;
            expect(state.favorites.items).not.toContainEqual(mockFavorites[0]);
            expect(removeUserFavorite).toHaveBeenCalled();
        });
    });
});
