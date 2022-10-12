import { configureStore } from '@reduxjs/toolkit';
import { productListSlice, productDetailsSlice } from './slices/productSlices';


const store = configureStore({
    reducer: { 
        productList: productListSlice.reducer,
        productDetails: productDetailsSlice.reducer 
    }
});

export default store;