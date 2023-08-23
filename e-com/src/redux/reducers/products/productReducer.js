import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore"; 
import { db } from "../../../firebaseInIt";
const initialState = {
    items : [],
    status : null,
    isLoading : true,
    searchResults : [],
}
export const productsFetchFromApi = createAsyncThunk("products/productsFetchFromApi",
async() => {
    const res = await axios.get("https://fakestoreapi.com/products");
    res.data.map(async(d) => await addDoc(collection(db, "/products"), d));
})
export const productsFetch = createAsyncThunk("products/productsFetch", 
async (_,thunkAPI) => {
    const unsub = onSnapshot(collection(db, "/products"), (snapshot) => {
       const products = snapshot.docs.map((product => {
        return {
            ...product.data()
        }
       }))
       thunkAPI.dispatch(productActions.setProducts(products))
    });
})
const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {
        setProducts : (state,action) => {
          state.items = action.payload 
          state.isLoading = false 
        },
        updateSearchResults : (state,action) => {
            state.searchResults = action.payload
        }
    },
    extraReducers : (builder) => {
       
    }
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const productSelector = (state) => state.productReducer;