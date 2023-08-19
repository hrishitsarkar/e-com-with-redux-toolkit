import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from './reducers/products/productReducer';
import { authReducer } from './reducers/auth/authReducer';
import { cartReducer } from './reducers/cart/cartReducer';
export const store = configureStore({
reducer : {
    productReducer,
    authReducer,
    cartReducer
}
});