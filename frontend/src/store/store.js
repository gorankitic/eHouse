import { configureStore } from '@reduxjs/toolkit';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './slices/productSlices';
import { cartReducer } from './slices/cartSlices';
import { signupReducer, loginReducer, userDetailsReducer, updateProfileReducer, listUsersReducer, deleteUserReducer, updateUserReducer } from './slices/userSlices';
import { createOrderReducer, orderDetailsReducer, orderPayReducer, orderDeliverReducer, myOrderReducer, listOrdersReducer } from './slices/orderSlices';


export const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        cart: cartReducer,
        signup: signupReducer,
        login: loginReducer,
        userDetails: userDetailsReducer,
        updateProfile: updateProfileReducer,
        createOrder: createOrderReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderDeliver: orderDeliverReducer,
        myOrders: myOrderReducer,
        listOrders: listOrdersReducer,
        listUsers: listUsersReducer,
        deleteUser: deleteUserReducer,
        updateUser: updateUserReducer
    }
});