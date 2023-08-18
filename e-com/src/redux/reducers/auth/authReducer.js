import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    error: ""

}

export const signUpUserAsync = createAsyncThunk("auth/signUpUserAsync", (credentials) => {
    const { email, password } = credentials;
    const auth = getAuth();
    const res = createUserWithEmailAndPassword(auth, email, password);
    return res;
})
export const signInUserAsync = createAsyncThunk("auth/signInUserAsync", (credentials) => {
    const { email, password } = credentials;
    const auth = getAuth();
    const res = signInWithEmailAndPassword(auth, email, password);
    return res;

})
export const signOutUserAsync = createAsyncThunk("auth/signOutUserAsync", () => {
    const auth = getAuth();
    const res = signOut(auth)
    return res;
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(signUpUserAsync.fulfilled, (state, action) => {

            //do nothing


        })
            .addCase(signUpUserAsync.pending, (state, action) => {
                state.error = "pending error"
            })
            .addCase(signUpUserAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(signInUserAsync.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                console.log(action.payload)
            })
            .addCase(signInUserAsync.rejected, (state, action) => {
                console.log(action.error.message)
            })
            .addCase(signOutUserAsync.fulfilled,(state,action) => {
                state.isLoggedIn = false;
            })
    }

})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelector = (state) => state.authReducer;