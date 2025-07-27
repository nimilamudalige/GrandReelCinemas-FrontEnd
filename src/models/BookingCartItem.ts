import type { MovieData } from "./MovieData.ts"; // formerly ProductData.ts

export interface BookingCartItem {
    movie: MovieData;
    ticketCount: number; // renamed for clarity
}