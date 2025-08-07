import type { MovieData } from "./MovieData.ts"; // formerly ProductData.ts

export interface BookingCartItem {
    movie: MovieData;
    ticketCount: number;
    ticketPrice: number; // renamed for clarity
}