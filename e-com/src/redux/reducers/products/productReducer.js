import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    items : [],
    status : null,
    isLoading : false
}
export const productsFetch = createAsyncThunk("products/productsFetch",
async() => {
    const res = await axios.get("https://dummyjson.com/products");
    return res?.data;
})

const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(productsFetch.pending,(state,action) => {
            state.status = "Pending"
            state.isLoading = true
        })
        .addCase(productsFetch.fulfilled,(state,action) => {
            state.status = "Success"
            state.items = action.payload;
            state.isLoading = false

        })
        .addCase(productsFetch.rejected,(state,action) => {
            state.status = "Rejected"

        })
    }
});

export const productReducer = productSlice.reducer;
export const productSelector = (state) => state.productReducer;