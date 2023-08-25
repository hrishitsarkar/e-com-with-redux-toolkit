import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseInIt";
import { toast } from "react-toastify";
//initial state
const initialState = {
    orders: []
}
//function to get order 
export const getOrdersAsync = createAsyncThunk("order/getOrderAsync", (uid, thunkAPI) => {
    //getting the order with id
    const unsub = onSnapshot(collection(db, `/userOrders/${uid}/orders`), (snapshot) => {
        const order = snapshot.docs.map((doc) => {
            return {
                ...doc.data(), id: doc.id
            }
        })
        //storing the orders inside redux state
        thunkAPI.dispatch(orderActions.setOrders(order));
    })
})
//function to add order 
export const addOrderAsync = createAsyncThunk("order/addOrderAsync", async ({ cartItems, cartAmount, uid }, thunkAPI) => {
    //spreading cartItems array
    const orderData = [...cartItems];
    //creating an order object with cart, orderedAt and total amount
    const order = {
        cart: orderData,
        orderedAt: new Date().toUTCString().slice(5, 16),
        total: cartAmount
    }
    //adding the order
    const docRef = await addDoc(collection(db, `/userOrders/${uid}/orders`), order);
    toast.success("Order Placed")
})
//slice for order
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        //setting the orders
        setOrders: (state, action) => {
            state.orders = action.payload;
        }
    },
    extraReducers: {}
})
//exporting order reducer
export const orderReducer = orderSlice.reducer;
//exporting order actions
export const orderActions = orderSlice.actions;
//exporting order selector
export const orderSelector = (state) => state.orderReducer;