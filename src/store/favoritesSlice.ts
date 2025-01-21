import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Favorite } from "./types";

interface FavoritesState {
    items: Favorite[];
}

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<Favorite[]>) => {
            state.items = action.payload;
        },
        addFavorite: (state, action: PayloadAction<Favorite>) => {
            state.items.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(movie => movie.imdbID !== action.payload);
        },
        updateFavorite: (state, action: PayloadAction<Favorite>) => {
            const index = state.items.findIndex(movie => movie.imdbID === action.payload.imdbID);
            if (index !== -1) state.items[index] = action.payload;
        }
    },
});

export const { setFavorites, addFavorite, removeFavorite, updateFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
