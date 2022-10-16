import { configureStore } from '@reduxjs/toolkit';
import { productListReducer, productDetailsReducer } from './slices/productSlices';
import { cartReducer } from './slices/cartSlices';
import { signupReducer, loginReducer, userDetailsReducer, updateProfileReducer } from './slices/userSlices';


export const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        signup: signupReducer,
        login: loginReducer,
        userDetails: userDetailsReducer,
        updateProfile: updateProfileReducer
    }
});