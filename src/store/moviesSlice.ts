import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
    query: string;
    page: number;
    selectedMovieId: string | null;
}

const initialState: MovieState = {
    query: "",
    page: 1,
    selectedMovieId: null,
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setSelectedMovieId(state, action: PayloadAction<string | null>) {
            state.selectedMovieId = action.payload;
        },
    },
});

export const { setQuery, setPage, setSelectedMovieId } = movieSlice.actions;
export default movieSlice.reducer;
