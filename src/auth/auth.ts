import { jwtDecode } from 'jwt-decode';
import type { UserData } from "../models/UserData.ts";

/**
 * Check if JWT token is expired.
 * @param token JWT string
 * @returns true if expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        if (!exp) return true;
        return Date.now() >= exp * 1000;
    } catch (error) {
        console.error("Invalid token:", error);
        return true;
    }
};

/**
 * Decode token and extract user data.
 * @param token JWT string
 * @returns decoded user data (username, role, etc.)
 */
export const getUserFromToken = (token: string): UserData => {
    try {
        const decodedToken = jwtDecode<any>(token);
        return {
            username: decodedToken.username || null,
            role: decodedToken.role || null
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return { username: null, role: null };
    }
};
