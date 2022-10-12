import { createSlice } from '@reduxjs/toolkit';

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: []
    },
    reducers: {
        productListRequest(state) {
            return { loading: true }
        },
        productListSuccess(state, action) {
            return { loading: false, products: action.payload }
        },
        productListFail(state, action) {
            return { loading: false, error: action.payload }
        }
    }
});

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        product: {}
    },
    reducers: {
        productDetailsRequest(state) {
            return { loading: true, ...state }
        },
        productDetailsSuccess(state, action) {
            return { loading: false, product: action.payload }
        },
        productDetailsFail(state, action) {
            return { loading: false, error: action.payload }
        }
    }
});

export const productListActions = productListSlice.actions;
export const productDetailsActions = productDetailsSlice.actions;

export const productListReducer = productListSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;