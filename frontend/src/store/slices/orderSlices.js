import { createSlice } from '@reduxjs/toolkit';

const createOrderSlice = createSlice({
    name: 'createOrder',
    initialState: {
        success: false
    },
    reducers: {
        createOrderRequest(state) {
            return { ...state, success: false, loading: true };
        },
        createOrderSuccess(state, action) {
            return { loading: false, success: true, order: action.payload };
        },
        createOrderFail(state, action) {
            return { loading: false, success: false, error: action.payload };
        },
        createOrderReset() {
            return {};
        }
    }
});

const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        loading: false,
        order: null
    },
    reducers: {
        orderDetailsRequest(state) {
            return { ...state, loading: true };
        },
        orderDetailsSuccess(state, action) {
            return { loading: false, order: action.payload };
        },
        orderDetailsFail(state, action) {
            return { loading: false, error: action.payload };
        },
        orderDetailsReset(state) {
            return { loading: false, order: null };
        }

    }
});

const orderPaySlice = createSlice({
    name: 'orderPay',
    initialState: {},
    reducers: {
        orderPayRequest(state) {
            return { ...state, loading: true };
        },
        orderPaySuccess(state) {
            return { ...state, loading: false, success: true };
        },
        orderPayFail(state, action) {
            return { ...state, loading: false, error: action.payload };
        },
        orderPayReset(state) {
            return {};
        }
    }
});

const orderDeliverSlice = createSlice({
    name: 'orderDelivered',
    initialState: {},
    reducers: {
        orderDeliverRequest(state) {
            return { ...state, loading: true };
        },
        orderDeliverSuccess(state) {
            return { ...state, loading: false, success: true };
        },
        orderDeliverFail(state, action) {
            return { ...state, loading: false, error: action.payload };
        },
        orderDeliverReset(state) {
            return {};
        }
    }
});

const myOrdersSlice = createSlice({
    name: 'myOrders',
    initialState: {
        orders: []
    },
    reducers: {
        myOrdersRequest(state) {
            return { ...state, loading: true };
        },
        myOrdersSuccess(state, action) {
            return { ...state, loading: false, orders: action.payload };
        },
        myOrdersFail(state, action) {
            return { ...state, loading: false, error: action.payload };
        },
        myOrdersReset(state) {
            return {};
        }
    }
});

const listOrdersSlice = createSlice({
    name: 'listOrders',
    initialState: {
        orders: []
    },
    reducers: {
        listOrdersRequest(state) {
            return { ...state, loading: true };
        },
        listOrdersSuccess(state, action) {
            return { ...state, loading: false, orders: action.payload };
        },
        listOrdersFail(state, action) {
            return { ...state, loading: false, error: action.payload };
        }
    }
});

export const createOrderActions = createOrderSlice.actions;
export const createOrderReducer = createOrderSlice.reducer;

export const orderDetailsActions = orderDetailsSlice.actions;
export const orderDetailsReducer = orderDetailsSlice.reducer;

export const orderPayActions = orderPaySlice.actions;
export const orderPayReducer = orderPaySlice.reducer;

export const orderDeliverActions = orderDeliverSlice.actions;
export const orderDeliverReducer = orderDeliverSlice.reducer;

export const myOrdersActions = myOrdersSlice.actions;
export const myOrderReducer = myOrdersSlice.reducer;

export const listOrdersActions = listOrdersSlice.actions;
export const listOrdersReducer = listOrdersSlice.reducer;