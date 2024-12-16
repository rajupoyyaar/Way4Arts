import {configureStore} from "@reduxjs/toolkit"
import artistReducer from './Fetures/ArtistSlice'
import artReducer from './Fetures/ArtSlice'
import customerReducer from './Fetures/CustomerSlice'
import orderReducer from './Fetures/OrderSlice'

const artistInfoFromLocalStorage = localStorage.getItem("Way4Arts_Artist") ? JSON.parse(localStorage.getItem('Way4Arts_Artist')) : null;
const customerInfoFromLocalStorage = localStorage.getItem("Way4Arts_Customer")
    ? JSON.parse(localStorage.getItem("Way4Arts_Customer"))
    : null;
const store = configureStore({
    reducer:{
        artist: artistReducer,
        art: artReducer,
        customer: customerReducer,
        order: orderReducer
    },
    preloadedState:{
        artist:{
            artist: artistInfoFromLocalStorage
        },
        customer:{
            customer: customerInfoFromLocalStorage
        }
    }
})

export default store