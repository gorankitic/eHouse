import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
    user: userFromStorage,
    loading: false,
    error: null
};

const signupSlice = createSlice({
    name: 'signup',
    initialState: {},
    reducers: {
        signupRequest() {
            return { loading: true };
        },
        signupSuccess(state, action) {
            return { loading: false, user: action.payload };
        },
        signupFail(state, action) {
            return { loading: false, error: action.payload };
        }
    }
});

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRequest() {
            return { loading: true };
        },
        loginSuccess(state, action) {
            return { loading: false, user: action.payload };
        },
        loginFail(state, action) {
            return { loading: false, error: action.payload };
        },
        logout() {
            return { user: null };
        }
    }
});

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
        user: {}
    },
    reducers: {
        userDetailsRequest(state) {
            return { ...state, loading: true };
        },
        userDetailsSuccess(state, action) {
            return { loading: false, user: action.payload };
        },
        userDetailsFail(state, action) {
            return { loading: false, error: action.payload };
        }
    }
});

const updateProfileSlice = createSlice({
    name: 'updateProfile',
    initialState: {},
    reducers: {
        updateProfileRequest(state) {
            return { loading: true };
        },
        updateProfileSuccess(state, action) {
            return { loading: false, success: true, user: action.payload };
        },
        updateProfileFail(state, action) {
            return { loading: false, error: action.payload };
        },
        updateProfileReset(state) {
            return {};
        }
    }
});

export const signupActions = signupSlice.actions;
export const signupReducer = signupSlice.reducer;

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export const userDetailsActions = userDetailsSlice.actions;
export const userDetailsReducer = userDetailsSlice.reducer;

export const updateProfileActions = updateProfileSlice.actions;
export const updateProfileReducer = updateProfileSlice.reducer;