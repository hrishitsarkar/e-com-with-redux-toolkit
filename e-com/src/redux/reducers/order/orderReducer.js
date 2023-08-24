import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc,onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseInIt";
import { toast } from "react-toastify";
const initialState = {
    orders: []
}
export const getOrdersAsync = createAsyncThunk("order/getOrderAsync", (uid,thunkAPI) => {
    const unsub = onSnapshot(collection(db,`/userOrders/${uid}/orders`), (snapshot) => {
        const order = snapshot.docs.map((doc) => {
            return {
                ...doc.data(),id:doc.id
            }
        })
        thunkAPI.dispatch(orderActions.setOrders(order));
    })
})
export const addOrderAsync = createAsyncThunk("order/addOrderAsync", async ({ cartItems, cartAmount, uid }, thunkAPI) => {
    const orderData = [...cartItems];
    
    const order = {
        cart: orderData,
        orderedAt: new Date().toUTCString().slice(5, 16),
        total: cartAmount
    }
    const docRef = await addDoc(collection(db,`/userOrders/${uid}/orders`),order );
    toast.success("Order Placed")
})
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrders : (state,action) => {
            state.orders = action.payload;
        }
    },
    extraReducers: {}
})

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderSelector = (state) => state.orderReducer;