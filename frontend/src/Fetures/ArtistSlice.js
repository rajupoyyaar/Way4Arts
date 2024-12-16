import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    artist: null,
    loading: false,
    error: false
}

export const registerArtist = createAsyncThunk(
    'artist/register',
    async({name,email,phone,password,profile}, thunkApi)=>{
        try{
            const config = {
                headers:{
                    "Content-Type" : "application/json"
                }
            }
            const {data} = await axios.post('https://way4arts.onrender.com/artist/register',
                {
                    name,email,phone,password,profile
                },
                config
            )
            console.log(data)
            localStorage.setItem("Way4Arts_Artist", JSON.stringify(data))
            return data
        }
        catch(error){
            return thunkApi.rejectWithValue(error?.response?.data?.message)
        }
    }
)

export const artistLogin = createAsyncThunk(
    "login/artist",
    async({email,password}, thunkApi)=>{
        try{  
            const config = {
                headers: {
                    "Content-Type" : "application/json"
                }
            }
            const {data} = await axios.post('https://way4arts.onrender.com/artist/login',
                {email,password},
                 config
                )
            console.log(data)
            localStorage.setItem("Way4Arts_Artist", JSON.stringify(data))
            return data
        }
        catch(err){
            return thunkApi.rejectWithValue(err?.response?.data?.message)
        }
    }
)

const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        resetError: (state)=>{
            state.error = null
        },
        logOut:(state)=>{
            localStorage.removeItem("Way4Arts_Artist")
            state.artist = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerArtist.pending,(state)=>{
            state.loading = true
            state.error = false
        })
        .addCase(registerArtist.fulfilled, (state, action) => {
            state.artist = action.payload; 
            state.loading = false; 
        })
        .addCase(registerArtist.rejected,(state,action)=>{
            state.error = action.payload || "Something went wrong"
            state.loading = false
        })

        //login
        .addCase(artistLogin.pending,(state)=>{
            state.loading = true
            state.error = false
        })
        .addCase(artistLogin.fulfilled, (state,action)=>{
            state.artist = action.payload
            state.loading = false
        })
        .addCase(artistLogin.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {resetError, logOut} = artistSlice.actions
export default artistSlice.reducer

