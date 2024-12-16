import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [], // Array to store all orders
    loading: false, // Indicates if a request is in progress
    error: null, // Stores any errors that occur
};

// Place a new order
export const placeOrder = createAsyncThunk(
    "orders/placeOrder",
    async ({ artId, artistId, customerName, customerId, customerPhone, customerAddress }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().customer.customer.token; // Get customer token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.post(
                "http://localhost:5002/customers/order",
                { artId, artistId, customerName, customerId, customerPhone, customerAddress },
                config
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message);
        }
    }
);

// Fetch all orders for a customer
export const fetchCustomerOrders = createAsyncThunk(
    "orders/fetchCustomerOrders",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().customer.customer.token; // Get customer token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get("http://localhost:5002/customers/orders", config);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message);
        }
    }
);

// Fetch all orders for an artist
export const fetchArtistOrders = createAsyncThunk(
    "orders/fetchArtistOrders",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().artist.artist.token; // Get artist token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get("http://localhost:5002/artist/orders", config);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message);
        }
    }
);

// Update the status of an order (e.g., completed, canceled)
export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus",
    async ({ orderId, status }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().artist.artist.token; // Get artist token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.put(
                `http://localhost:5002/artist/order/status`,  // Correct API endpoint
                { orderId, status },  // Pass orderId along with status
                config
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message);
        }
    }
);


const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        resetOrderState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Place order
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload); // Add the new order to the orders array
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch customer orders
            .addCase(fetchCustomerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload; // Set the fetched orders
            })
            .addCase(fetchCustomerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch artist orders
            .addCase(fetchArtistOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtistOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload; // Set the fetched orders
            })
            .addCase(fetchArtistOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update order status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(
                    (order) => order._id === action.payload._id
                );
                if (index !== -1) {
                    state.orders[index] = action.payload; // Update the specific order
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
