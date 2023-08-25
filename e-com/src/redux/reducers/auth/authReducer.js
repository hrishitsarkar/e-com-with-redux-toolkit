import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
//initial state
const initialState = {
    isLoggedIn: false,
    error: "",
    uid: null,

}
//function for sign up a user
export const signUpUserAsync = createAsyncThunk("auth/signUpUserAsync", (credentials) => {
    const { email, password } = credentials;
    const auth = getAuth();
    const res = createUserWithEmailAndPassword(auth, email, password);
    return res;
})
//function for sign in a user
export const signInUserAsync = createAsyncThunk("auth/signInUserAsync", (credentials) => {
    const { email, password } = credentials;
    const auth = getAuth();
    const res = signInWithEmailAndPassword(auth, email, password);
    return res;

})
//function for sign out a user
export const signOutUserAsync = createAsyncThunk("auth/signOutUserAsync", () => {
    const auth = getAuth();
    const res = signOut(auth)
    return res;
})

//slice for auth
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(signUpUserAsync.fulfilled, (state, action) => {

            toast.success("Sign Up successful");


        })
            .addCase(signUpUserAsync.pending, (state, action) => {
                //setting error
                state.error = "pending error"

            })
            .addCase(signUpUserAsync.rejected, (state, action) => {
                toast.error("Invalid Email")
                state.error = "error";
            })
            .addCase(signInUserAsync.fulfilled, (state, action) => {
                //setting isLoggedIn to true
                state.isLoggedIn = true;
                //storing logged in uid to the redux state
                state.uid = action.payload.user.uid;
                toast.success("Sign In Successful");

            })
            .addCase(signInUserAsync.rejected, (state, action) => {
                //showing error
                toast.error("Invalid Username/Password")
            })
            .addCase(signOutUserAsync.fulfilled, (state, action) => {
                //toggling isLoggedIn
                state.isLoggedIn = false;
                toast.success("Sign Out successful")
            })
    }

})
//exporting the reducer
export const authReducer = authSlice.reducer;
//exporting the actions
export const authActions = authSlice.actions;
//exporting the selector
export const authSelector = (state) => state.authReducer;