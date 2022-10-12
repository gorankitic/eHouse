import { createSlice } from '@reduxjs/toolkit';

// Not great solution, doble check on backend
const itemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cartItems: itemsFromStorage
}

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
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;