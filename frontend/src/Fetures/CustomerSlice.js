import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    customer: null, // Stores logged-in customer data
    loading: false, // Indicates if a request is in progress
    error: null, // Stores any errors that occur
};

export const registerCustomer = createAsyncThunk(
    "customer/register",
    async ({ name, email, password, phone }, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5002/customers/register",
                { name, email, password, phone },
                config
            );
            localStorage.setItem("Way4Arts_Customer", JSON.stringify(data)); // Save customer info in local storage
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const loginCustomer = createAsyncThunk(
    "customer/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5002/customers/login",
                { email, password },
                config
            );
            localStorage.setItem("Way4Arts_Customer", JSON.stringify(data)); // Save customer info in local storage
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message);
        }
    }
);

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        logOutCustomer: (state) => {
            localStorage.removeItem("Way4Arts_Customer"); 
            state.customer = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register Customer
            .addCase(registerCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerCustomer.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
            })
            .addCase(registerCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong during registration.";
            })

            // Login Customer
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                state.customer = action.payload;
                state.loading = false;
            })
            .addCase(loginCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Invalid email or password.";
            });
    },
});

export const { resetError, logOutCustomer } = customerSlice.actions;
export default customerSlice.reducer;
