import { combineReducers } from "redux";
import movieReducer from "./movieSlice.ts";
import bookingCartReducer from "./bookingCartSlice.ts";

export const rootReducer = combineReducers({
    movies: movieReducer,
    bookingCart: bookingCartReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;