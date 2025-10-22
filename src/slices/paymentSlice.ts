import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../api.ts";

interface PaymentData {
    amount: number;
    movieId: number;
    userId: string;
    quantity: number;
    movieName: string;
}

interface PaymentState {
    payments: PaymentData[];
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    payments: [],
    loading: false,
    error: null
};

export const savePayment = createAsyncThunk(
    'payments/savePayment',
    async (paymentData: PaymentData) => {
        try {
            console.log("Processing payment:", paymentData);
            const response = await backendApi.post("/payments/save", paymentData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Payment error:", error);
            throw error;
        }
    }
);

export const getUserPayments = createAsyncThunk(
    'payments/getUserPayments',
    async (userId: string) => {
        try {
            const response = await backendApi.get(`/payments/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user payments:", error);
            throw error;
        }
    }
);

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        clearPaymentError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(savePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(savePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.payments.push(action.payload);
            })
            .addCase(savePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Payment failed";
                alert("Payment failed: " + state.error);
            })
            .addCase(getUserPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })
            .addCase(getUserPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch payment history";
            });
    }
});

export const { clearPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;