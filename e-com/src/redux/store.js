import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from './reducers/products/productReducer';
export const store = configureStore({
reducer : {
    productReducer
}
});