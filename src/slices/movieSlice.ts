import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { MovieData } from "../models/MovieData.ts";
import { backendApi } from "../api.ts";

interface MovieState {
    list: MovieData[];
    error: string | null | undefined;
}

const initialState: MovieState = {
    list: [],
    error: null
};

// Thunk to fetch all movies
export const getAllMovies = createAsyncThunk(
    'movies/getAllMovies',
    async () => {
        const response = await backendApi.get("/movies/all");
        return await response.data;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMovies.pending, () => {
                alert("Movies are loading...");
            })
            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(getAllMovies.rejected, (state, action) => {
                state.error = action.error.message;
                alert("Error loading movies: " + state.error);
            });
    }
});

export default moviesSlice.reducer;
