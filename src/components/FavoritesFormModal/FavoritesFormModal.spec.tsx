import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import FavoritesFormModal from './FavoritesFormModal';
import favoritesReducer from '../../store/favoritesSlice';
import movieReducer from '../../store/moviesSlice';
import authReducer from '../../store/authSlice';
import { Favorite } from '../../store/types';
import { configureStore } from '@reduxjs/toolkit';

const mockMovie: Favorite = {
    imdbID: 'tt1234567',
    Title: 'Sample Movie',
    Notes: 'Some notes',
    Poster: 'https://via.placeholder.com/150',
    Year: '2024',
};

jest.mock('../../services/favoriteService', () => ({
    addFavoriteToUser: jest.fn(),
    updateUserFavorite: jest.fn(),
}));

let mockStore: ReturnType<typeof configureStore>;

describe('FavoritesFormModal Component', () => {
    const mockSetIsFormOpen = jest.fn();
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
            payload: { Title: "Test Movie", imdbID: "123", Notes: "Test Notes" },
        });
    });
    
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });    

    const renderComponent = (props = {}) => {
        act(() => {
            render(
                <Provider store={mockStore}>
                    <FavoritesFormModal
                        isFormOpen={true}
                        setIsFormOpen={jest.fn()}
                        movie={mockMovie}
                        {...props}
                    />
                </Provider>
            );
        });
    };

    test('renders without crashing', () => {
        renderComponent();
        expect(screen.getByText(/Add to Favorites/i)).toBeInTheDocument();
    });

    test('displays movie title in the title input field', () => {
        renderComponent();
        const titleInput = screen.getByLabelText(/Title/i) as HTMLInputElement;
        expect(titleInput.value).toBe(mockMovie.Title);
    });

    test('allows user to edit notes', () => {
        renderComponent();
        const notesInput = screen.getByLabelText(/Notes/i) as HTMLInputElement;
        fireEvent.change(notesInput, { target: { value: 'Updated notes' } });
        expect(notesInput.value).toBe('Updated notes');
    });

    test('shows error message when user is not logged in and tries to submit', () => {
        mockStore.dispatch({ type: 'auth/setUserId', payload: null })
        renderComponent();
        const submitButton = screen.getByText(/Add Movie/i);
        fireEvent.click(submitButton);
        expect(screen.getByText(/You need to login to add favorites/i)).toBeInTheDocument();
    });  

    test('displays "Update Movie" button when `toUpdate` is true', () => {
        renderComponent({ toUpdate: true });
        expect(screen.getByText(/Update Movie/i)).toBeInTheDocument();
    });

    test('calls the correct function on submit for adding a favorite', () => {
        const { addFavoriteToUser } = require('../../services/favoriteService');
        renderComponent();
        const submitButton = screen.getByRole('button', { name: /Add Movie/i });
        expect(submitButton).toBeInTheDocument();
        fireEvent.click(submitButton);
        expect(addFavoriteToUser).toHaveBeenCalled();
    });

    test('calls the correct function on submit for updating a favorite', () => {
        const { updateUserFavorite } = require('../../services/favoriteService');
        renderComponent({ toUpdate: true });
        const submitButton = screen.getByText(/Update Movie/i);
        fireEvent.click(submitButton);
        expect(updateUserFavorite).toHaveBeenCalled();
    });
});
