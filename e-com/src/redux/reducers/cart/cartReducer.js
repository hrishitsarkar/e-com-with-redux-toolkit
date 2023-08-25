import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, doc, onSnapshot, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseInIt"
import { toast } from "react-toastify";
import { addOrderAsync } from "../order/orderReducer";
//initial state
const initialState = {
    cartItems: [],
    cartAmount: 0
}
//function to clear cart
export const clearCartAsync = createAsyncThunk("cart/clearCartAsync", async (uid, thunkAPI) => {
    const querySnapshot = await getDocs(collection(db, `/usersCarts/${uid}/myCart`));
    querySnapshot.forEach(async (document) => {
        //deleting each and every items inside cart
        await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, document.id))
    });
})
//function to decrease cart quantity
export const decreaseQtyAsync = createAsyncThunk("cart/decreaseQtyAsync", async ({ item, uid }, thunkAPI) => {
    try {

        const cartRef = collection(db, `/usersCarts/${uid}/myCart`);
        //running a query
        const q = query(cartRef, where("id", "==", item.id));
        //getting document
        const querySnapshot = await getDocs(q);
        //updating the cart
        querySnapshot.docs.forEach(async (document) => {
            if (document.data().qty > 1) {
                const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, document.id);
                await updateDoc(updateDocRef, { ...item, qty: item.qty - 1 })
            }
        })

    } catch (error) {
        console.log(error);
    }
})
//function to increase cart quantity
export const increaseQtyAsync = createAsyncThunk("cart/increaseQtyAsync", async ({ item, uid }, thunkAPI) => {
    try {

        const cartRef = collection(db, `/usersCarts/${uid}/myCart`);
        //running a query
        const q = query(cartRef, where("id", "==", item.id));
        //getting document
        const querySnapshot = await getDocs(q);
        //updating the cart
        querySnapshot.docs.forEach(async (document) => {
            if (document.data().qty > 0) {
                const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, document.id);
                await updateDoc(updateDocRef, { ...item, qty: item.qty + 1 })
            }
        })

    } catch (error) {
        console.log(error)
    }
})
//function to delete from cart 
export const deleteFromCartAsync = createAsyncThunk("cart/deleteFromCartAsync", async ({ item, uid }, thunkAPI) => {
    try {

        const cartRef = collection(db, `/usersCarts/${uid}/myCart`);
        //running a query
        const q = query(cartRef, where("id", "==", item.id));
        //getting document
        const querySnapshot = await getDocs(q);
        //removing from cart
        querySnapshot.forEach(async (document) => {
            await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, document.id));
        });
        toast.success(`${item.title} is removed from the cart}`)
    } catch (error) {
        console.log("error", error)
    }

})
//function to add to cart 
export const addToCartAsync = createAsyncThunk("cart/addToCartAsync", async ({ product, uid }, thunkAPI) => {
    //getting the state from thunkAPI
    const state = thunkAPI.getState();
    //finding the product to be added
    const productToBeAdded = state.cartReducer.cartItems.find((item) => product.id === item.id);
    //if found then increase the qty else add to cart
    if (productToBeAdded) {

        const cartRef = collection(db, `/usersCarts/${uid}/myCart`);
        //running a query
        const q = query(cartRef, where("id", "==", product.id))
        //getting document
        const querySnapshot = await getDocs(q);
        //increasing qty
        querySnapshot.forEach(async (document) => {
            const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, document.id);
            await updateDoc(updateDocRef, { ...product, qty: productToBeAdded.qty + 1 })
        });
        toast.info(`${product.title}'s quantity increased`)
    } else {
        const dummyProduct = { ...product, qty: 1 };
        //adding to cart
        const docRef = await addDoc(collection(db, `/usersCarts/${uid}/myCart`), dummyProduct);
        toast.success(`${product.title} added to the cart`)
    }


})
//function to get cart 
export const getCartAsync = createAsyncThunk("cart/getCartAsync", (uid, thunkAPI) => {
    //getting the cart
    const unsub = onSnapshot(collection(db, `/usersCarts/${uid}/myCart`), (snapshot) => {
        const cart = snapshot.docs.map((doc) => {

            return {
                ...doc.data()
            }
        })
        //storing the cart in redux state
        thunkAPI.dispatch(cartActions.setCartItems(cart));
    });


})
//slice for cart
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        //set cart items
        setCartItems: (state, action) => {
            state.cartItems = action.payload
        },
        //get the cart total
        getCartTotal: (state, action) => {
            let { total } = state.cartItems.reduce((cartTotal, item) => {
                const { price, qty } = item;
                const itemTotal = price * qty;
                cartTotal.total += itemTotal
                return cartTotal;
            }, { total: 0 })
            state.cartAmount = total;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addOrderAsync, (state, action) => {
            //after add order gets completed we set the state like below
            state.cartItems = [];
            state.cartAmount = 0;
        })
    }
})
//exporting cart reducer
export const cartReducer = cartSlice.reducer;
//exporting cart actions
export const cartActions = cartSlice.actions;
//exporting cart selector
export const cartSelector = (state) => state.cartReducer;