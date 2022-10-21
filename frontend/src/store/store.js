import { configureStore } from '@reduxjs/toolkit';
import { productListReducer, productDetailsReducer } from './slices/productSlices';
import { cartReducer } from './slices/cartSlices';
import { signupReducer, loginReducer, userDetailsReducer, updateProfileReducer, listUsersReducer, deleteUserReducer, updateUserReducer } from './slices/userSlices';
import { createOrderReducer, orderDetailsReducer, orderPayReducer, myOrderReducer } from './slices/orderSlices';


export const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        signup: signupReducer,
        login: loginReducer,
        userDetails: userDetailsReducer,
        updateProfile: updateProfileReducer,
        createOrder: createOrderReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        myOrders: myOrderReducer,
        listUsers: listUsersReducer,
        deleteUser: deleteUserReducer,
        updateUser: updateUserReducer
    }
});