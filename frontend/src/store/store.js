import { configureStore } from '@reduxjs/toolkit';
import { productListReducer, productDetailsReducer } from './slices/productSlices';
import { cartReducer } from './slices/cartSlices';


export const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer
    }
});