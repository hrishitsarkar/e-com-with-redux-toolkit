import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from './reducers/products/productReducer';
import { authReducer } from './reducers/auth/authReducer';
export const store = configureStore({
reducer : {
    productReducer,
    authReducer
}
});