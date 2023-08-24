import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from './reducers/products/productReducer';
import { authReducer } from './reducers/auth/authReducer';
import { cartReducer } from './reducers/cart/cartReducer';
import { orderReducer } from './reducers/order/orderReducer';
export const store = configureStore({
reducer : {
    productReducer,
    authReducer,
    cartReducer,
    orderReducer
}
});