import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import movieReducer from "./moviesSlice";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
