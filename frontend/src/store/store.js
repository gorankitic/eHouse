import { configureStore } from '@reduxjs/toolkit';
import { productListSlice, productDetailsSlice } from './slices/productSlices';
import { cartSlice } from './slices/cartSlices';


const store = configureStore({
    reducer: { 
        productList: productListSlice.reducer,
        productDetails: productDetailsSlice.reducer,
        cart: cartSlice.reducer
    }
});

export default store;