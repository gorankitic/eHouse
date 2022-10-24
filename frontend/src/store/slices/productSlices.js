import { createSlice } from '@reduxjs/toolkit';

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: []
    },
    reducers: {
        productListRequest(state) {
            return { loading: true };
        },
        productListSuccess(state, action) {
            return { loading: false, products: action.payload };
        },
        productListFail(state, action) {
            return { loading: false, error: action.payload };
        }
    }
});

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        product: {
            reviews: []
        }
    },
    reducers: {
        productDetailsRequest(state) {
            return { ...state, loading: true  };
        },
        productDetailsSuccess(state, action) {
            return { loading: false, product: action.payload };
        },
        productDetailsFail(state, action) {
            return { loading: false, error: action.payload };
        },
        productDetailsReset(state) {
            return { product: { reviews: []} };
        }
    }
});

const productDeleteSlice = createSlice({
    name: 'productDelete',
    initialState: {},
    reducers: {
        productDeleteRequest(state) {
            return { loading: true, };
        },
        productDeleteSuccess(state, action) {
            return { loading: false, success: true };
        },
        productDeleteFail(state, action) {
            return { loading: false, error: action.payload };
        }
    }
});

const productCreateSlice = createSlice({
    name: 'productCreate',
    initialState: {},
    reducers: {
        productCreateRequest(state) {
            return { loading: true, };
        },
        productCreateSuccess(state, action) {
            return { loading: false, success: true, product: action.payload };
        },
        productCreateFail(state, action) {
            return { loading: false, error: action.payload };
        },
        productCreateReset() {
            return {};
        }
    }
});

const productUpdateSlice = createSlice({
    name: 'productUpdate',
    initialState: {
        product: {}
    },
    reducers: {
        productUpdateRequest(state) {
            return { loading: true, };
        },
        productUpdateSuccess(state, action) {
            return { loading: false, success: true, product: action.payload };
        },
        productUpdateFail(state, action) {
            return { loading: false, error: action.payload };
        },
        productUpdateReset() {
            return { product: {} };
        }
    }
});

const reviewCreateSlice = createSlice({
    name: 'reviewCreate',
    initialState: {},
    reducers: {
        reviewCreateRequest(state) {
            return { loading: true, };
        },
        reviewCreateSuccess(state, action) {
            return { loading: false, success: true };
        },
        reviewCreateFail(state, action) {
            return { loading: false, error: action.payload };
        },
        reviewCreateReset() {
            return {};
        }
    }
});

export const productListActions = productListSlice.actions;
export const productListReducer = productListSlice.reducer;

export const productDetailsActions = productDetailsSlice.actions;
export const productDetailsReducer = productDetailsSlice.reducer;

export const productDeleteActions = productDeleteSlice.actions;
export const productDeleteReducer = productDeleteSlice.reducer;

export const productCreateActions = productCreateSlice.actions;
export const productCreateReducer = productCreateSlice.reducer;

export const productUpdateActions = productUpdateSlice.actions;
export const productUpdateReducer = productUpdateSlice.reducer;

export const reviewCreateActions = reviewCreateSlice.actions;
export const reviewCreateReducer = reviewCreateSlice.reducer;