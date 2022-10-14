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

export const signupActions = signupSlice.actions;
export const signupReducer = signupSlice.reducer;

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;