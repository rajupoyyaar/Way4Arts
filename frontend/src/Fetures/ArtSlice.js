import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    art: [],
    loading: false,
    error: false,
};

export const uploadArt = createAsyncThunk(
    'upload/art',
    async ({ category, price, art }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().artist.artist.token;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            };
            const { data } = await axios.post(
                'http://localhost:5002/art/upload',
                { category, price, art },
                config
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message);
        }
    }
);

export const fetchArt = createAsyncThunk(
    'fetch/arts',
    async(_,thunkAPI)=>{
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const {data} = await axios.get('http://localhost:5002/art/paintings', config)
            console.log(data)
            return data
        }
        catch(error){
            thunkAPI.rejectWithValue(error?.response?.data?.message)
        }
    }
)

const artSlice = createSlice({
    name: "art",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadArt.pending, (state) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(uploadArt.fulfilled, (state, action) => {  
                if (!state.art) {
                    state.art = [];
                }
                state.art.push(action.payload);
                state.loading = false;
                state.error = false
            })
            .addCase(uploadArt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch all Paintings
            .addCase(fetchArt.pending, (state)=>{
                state.loading = true
                state.error = false
            })
            .addCase(fetchArt.fulfilled, (state,action)=>{
                state.art = action.payload
                state.loading = false
            })
            .addCase(fetchArt.rejected,(state,action)=>{
                state.error = action.payload
                state.loading = false
            })
    },
});

// Export the reducer and async thunk
export default artSlice.reducer; // Export reducer as the default
