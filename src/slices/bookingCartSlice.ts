import type { BookingCartItem } from "../models/BookingCartItem.ts";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MovieData } from "../models/MovieData.ts";

interface BookingCartState {
    items: BookingCartItem[];
}

const initialState: BookingCartState = {
    items: []
};

const bookingCartSlice = createSlice({
    name: 'bookingCart',
    initialState: initialState,
    reducers: {
        addBookingToCart(state: BookingCartState,
                         action: PayloadAction<MovieData>) {
            const existingItem = state.items.find(
                (item) => item.movie.id === action.payload.id
            );
            if (!existingItem) {
                state.items.push({
                    movie: action.payload,
                    ticketCount: 1
                });
            }
        },
        increaseQuantity(state: BookingCartState,
                            action: PayloadAction<number>) {
            const item = state.items.find(
                (item) => item.movie.id === action.payload
            );
            if (item) {
                item.ticketCount += 1;
            }
        },
        decreaseQuantity(state: BookingCartState,
                            action: PayloadAction<number>) {
            const item = state.items.find(
                (item) => item.movie.id === action.payload
            );
            if (item && item.ticketCount > 1) {
                item.ticketCount -= 1;
            }
        }
    }
});

export const {
    addBookingToCart,
    increaseQuantity,
    decreaseQuantity
} = bookingCartSlice.actions;

export default bookingCartSlice.reducer;

