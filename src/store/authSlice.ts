import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    userId: string | null;
    userName: string | null;
}

const initialState: AuthState = {
    userId: null,
    userName: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string|null>) => {
            state.userId = action.payload;
        },
        setUserName: (state, action: PayloadAction<string|null>) => {
            state.userName = action.payload;
        },
        clearUser: (state) => {
            state.userId = null;
            state.userName = null;
        },
    },
});

export const { setUserId, setUserName, clearUser } = authSlice.actions;
export default authSlice.reducer;
