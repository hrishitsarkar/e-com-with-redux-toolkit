import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseInIt";
//initial state
const initialState = {
    items: [],
    status: null,
    isLoading: true,
    searchResults: [],
}
//function I used to fetch products from api then added to database

// export const productsFetchFromApi = createAsyncThunk("products/productsFetchFromApi",
// async() => {
//     const res = await axios.get("https://fakestoreapi.com/products");
//     res.data.map(async(d) => await addDoc(collection(db, "/products"), d));
// })
//function to get the products from database
export const productsFetch = createAsyncThunk("products/productsFetch",
    async (_, thunkAPI) => {
        const unsub = onSnapshot(collection(db, "/products"), (snapshot) => {
            const products = snapshot.docs.map((product => {
                return {
                    ...product.data()
                }
            }))
            //storing the products inside redux state
            thunkAPI.dispatch(productActions.setProducts(products))
        });
    })
//slice for product
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        //setting the products
        setProducts: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        //updating the search results while a user filters
        updateSearchResults: (state, action) => {
            state.searchResults = action.payload
        }
    },
    extraReducers: (builder) => {

    }
});
//exporting product reducer
export const productReducer = productSlice.reducer;
//exporting product actions
export const productActions = productSlice.actions;
//exporting product selector
export const productSelector = (state) => state.productReducer;