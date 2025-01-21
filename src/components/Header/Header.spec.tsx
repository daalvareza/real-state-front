import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { setFavorites } from '../../store/favoritesSlice';
import moviesReducer, { setQuery } from '../../store/moviesSlice';
import authReducer from '../../store/authSlice';
import * as favoriteService from '../../services/favoriteService';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';

import '@testing-library/jest-dom';

jest.mock('react-redux', () => {
    const actualRedux = jest.requireActual('react-redux');
    return {
        ...actualRedux,
        useDispatch: jest.fn(),
        useSelector: jest.fn(),
    };
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../services/favoriteService', () => ({
    getFavoritesByUser: jest.fn(),
}));

describe('Header Component', () => {
    let mockDispatch: jest.Mock;
    let mockUseSelector: jest.Mock;
    let mockNavigate: jest.Mock;

    beforeEach(() => {
        mockDispatch = jest.fn();
        mockUseSelector = jest.requireMock('react-redux').useSelector;
        jest.requireMock('react-redux').useDispatch.mockReturnValue(mockDispatch);

        mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        (favoriteService.getFavoritesByUser as jest.Mock).mockResolvedValue([]);

        mockUseSelector.mockImplementation((selector: (state: RootState) => any) => {
            const state: RootState = {
            auth: { userId: null, userName: null },
            favorites: { items: [] },
            movies: { query: "", page: 1, selectedMovieId: null },
            };
            return selector(state);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    function renderWithStore() {
        const store = configureStore({
            reducer: {
            auth: authReducer,
            favorites: favoritesReducer,
            movies: moviesReducer,
            },
        });
        return render(
            <Provider store={store}>
            <Header />
            </Provider>
        );
    }

    it('renders and dispatches initial query "Harry Potter"', async () => {
        renderWithStore();
        expect(mockDispatch).toHaveBeenCalledWith(setQuery("Harry Potter"));
    });

    it('does not fetch favorites if no userId', async () => {
        renderWithStore();
        expect(favoriteService.getFavoritesByUser).not.toHaveBeenCalled();
    });

    it('fetches and sets favorites if userId is present', async () => {
        mockUseSelector.mockImplementation((selector: (state: RootState) => any) => {
            const state: RootState = {
            auth: { userId: 'user123', userName: null },
            favorites: { items: [] },
            movies: { query: "", page: 1, selectedMovieId: null },
            };
            return selector(state);
        });

        const mockFavorites = [{
            imdbID: 'fav1',
            Title: 'Mocked Favorite',
            Year: '2020',
            Poster: 'test.jpg'
        }];
        (favoriteService.getFavoritesByUser as jest.Mock).mockResolvedValueOnce(mockFavorites);

        renderWithStore();

        await waitFor(() => {
            expect(favoriteService.getFavoritesByUser).toHaveBeenCalledWith('user123');
            expect(mockDispatch).toHaveBeenCalledWith(setFavorites(mockFavorites));
        });
    });

    it('updates query when Enter is pressed in search input', async () => {
        renderWithStore();
        const searchInput = screen.getByPlaceholderText(/search for a movie/i);
        await userEvent.type(searchInput, 'Inception{enter}');
        expect(mockDispatch).toHaveBeenCalledWith(setQuery('Inception'));
    });

    it('updates query when search icon is clicked', async () => {
        renderWithStore();
        const searchInput = screen.getByPlaceholderText(/search for a movie/i);
        await userEvent.type(searchInput, 'Matrix');

        const searchIcon = screen.getByTestId('search-icon');
        fireEvent.click(searchIcon);

        expect(mockDispatch).toHaveBeenCalledWith(setQuery('Matrix'));
    });

    it('navigates to /favorites when user is logged in and View Favorites is clicked', async () => {
        mockUseSelector.mockImplementation((selector: (state: RootState) => any) => {
            const state: RootState = {
            auth: { userId: 'user123', userName: null },
            favorites: {
                items: [
                { imdbID: '1', Title: 'Fav1', Year: '2020', Poster: '' },
                { imdbID: '2', Title: 'Fav2', Year: '2021', Poster: '' }
                ]
            },
            movies: { query: "", page: 1, selectedMovieId: null },
            };
            return selector(state);
        });

        renderWithStore();
        const favoritesButton = screen.getByRole('button', { name: /View Favorites \(2\)/i });
        await userEvent.click(favoritesButton);
        expect(mockNavigate).toHaveBeenCalledWith('/favorites');
    });

    it('navigates to home when the title is clicked', async () => {
        renderWithStore();
        const title = screen.getByText(/movie explorer/i);
        await userEvent.click(title);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('opens and closes login modal when account icon is clicked', async () => {
        renderWithStore();
        const accountButton = screen.getByTestId('AccountCircleIcon');
        await userEvent.click(accountButton);

        const modal = screen.getByTestId('login-modal');
        expect(modal).toBeInTheDocument();
    });
});
