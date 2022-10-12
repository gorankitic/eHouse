import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
    },
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
        }
    }
});

export const cartActions = cartSlice.actions;

