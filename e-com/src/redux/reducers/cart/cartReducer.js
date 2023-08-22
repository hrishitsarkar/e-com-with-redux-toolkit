import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, doc, onSnapshot, query, where, getDocs, updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseInIt"
import { toast } from "react-toastify";
const initialState = {
    cartItems: [],
    cartAmount: 0
}
export const clearCartAsync = createAsyncThunk("cart/clearCartAsync",async (uid,thunkAPI) => {
    const querySnapshot = await getDocs(collection(db, `/usersCarts/${uid}/myCart`));
    querySnapshot.forEach(async(document) => {
        await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, document.id))
      });
})
export const decreaseQtyAsync = createAsyncThunk("cart/decreaseQtyAsync", async ({item,uid},thunkAPI) => {
try {
    const cartRef = collection(db,`/usersCarts/${uid}/myCart`); 
        const q = query(cartRef, where("id", "==", item.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach(async(document) => {
            if(document.data().qty > 1){
                const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, document.id);
                await updateDoc(updateDocRef, { ...item, qty: item.qty - 1 })
            }
        })
        
} catch (error) {
    console.log(error)
}
})

export const increaseQtyAsync = createAsyncThunk("cart/increaseQtyAsync", async ({item,uid},thunkAPI) => {
    try {
        const cartRef = collection(db,`/usersCarts/${uid}/myCart`); 
            const q = query(cartRef, where("id", "==", item.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.forEach(async(document) => {
                if(document.data().qty > 0){
                    const updateDocRef = doc(db, `/usersCarts/${uid}/myCart`, document.id);
                    await updateDoc(updateDocRef, { ...item, qty: item.qty + 1 })
                }
            })
            
    } catch (error) {
        console.log(error)
    } 
})
export const deleteFromCartAsync = createAsyncThunk("cart/deleteFromCartAsync", async({item, uid },thunkAPI) => {
    try{
        
        const cartRef = collection(db,`/usersCarts/${uid}/myCart`); 
        const q = query(cartRef, where("id", "==", item.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
            await deleteDoc(doc(db, `/usersCarts/${uid}/myCart`, document.id));
        });
        toast.success(`${item.title} is removed from the cart}`)
    }catch(error){
        console.log("error",error)
    }
    
})
export const addToCartAsync = createAsyncThunk("cart/addToCartAsync", async ({ product, uid }, thunkAPI) => {
    const state = thunkAPI.getState();
    const productToBeAdded = state.cartReducer.cartItems.find((item) => product.id === item.id);

    if (productToBeAdded) {

        const cartRef = collection(db, `/usersCarts/${uid}/myCart`);

        const q = query(cartRef, where("id", "==", product.id))

        const querySnapshot = await getDocs(q);
        
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
        },
        getCartTotal : (state,action) => {
            let {total} = state.cartItems.reduce((cartTotal,item) => {
                const {price,qty} = item;
                const itemTotal = price * qty;
                cartTotal.total += itemTotal
                return cartTotal;
            },{total : 0})
            state.cartAmount = total;
        }
    },
    extraReducers: (builder) => {

    }
})

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;