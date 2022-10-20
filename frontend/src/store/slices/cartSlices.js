import { createSlice } from '@reduxjs/toolkit';
        
// it's not a great solution, double check on backend
const itemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}


const initialState = {
    cartItems: itemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existItem = state.cartItems.find(cartItem => cartItem.id === item.id);
            if(existItem) {
                return { ...state, cartItems: state.cartItems.map(cartItem => cartItem.id === existItem.id ? item : cartItem) }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        },
        removeFromCart(state, action) {
            return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) }
        },
        saveShippingAddress(state, action) {
            return { ...state, shippingAddress: action.payload };
        },
        savePaymentMethod(state, action) {
            return { ...state, paymentMethod: action.payload };
        },
        clearCartItems(state) {
            return { ...state, cartItems: [] };
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;