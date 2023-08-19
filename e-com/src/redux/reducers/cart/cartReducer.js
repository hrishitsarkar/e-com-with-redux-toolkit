import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, doc, onSnapshot, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInIt"
import { toast } from "react-toastify";
const initialState = {
    cartItems: [],
    cartQuantity: 0,
    cartAmount: 0
}
export const addToCartAsync = createAsyncThunk("cart/addToCartAsync", async ({ product, uid }, thunkAPI) => {
    const state = thunkAPI.getState();
    const productToBeAdded = state.cartReducer.cartItems.find((item) => product.id === item.id);

    if (productToBeAdded) {

        const cartRef = collection(db, `/usersCarts/${uid}/myCart`);

        const q = query(cartRef, where("id", "==", product.id))

        const querySnapshot = await getDocs(q);
        console.log("here")
        querySnapshot.forEach(async (document) => {
            const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, document.id);
            await updateDoc(updateDocRef, { ...product, qty: productToBeAdded.qty + 1 })
        });
        toast.info(`${product.title}'s quantity increased`)
    } else {
        const dummyProduct = { ...product, qty: 1 };
        const docRef = await addDoc(collection(db, `/usersCarts/${uid}/myCart`), dummyProduct);
        toast.success(`${product.title} added to the cart`)
    }


})
export const getCartAsync = createAsyncThunk("cart/getCartAsync", (uid, thunkAPI) => {
    const unsub = onSnapshot(collection(db, `/usersCarts/${uid}/myCart`), (snapshot) => {
        const cart = snapshot.docs.map((doc) => {

            return {
                ...doc.data()
            }
        })

        thunkAPI.dispatch(cartActions.setCartItems(cart));
    });


})
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload
        }
    },
    extraReducers: (builder) => {

    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;