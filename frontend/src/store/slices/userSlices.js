import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        user: {}
    },
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
    name: 'signup',
    initialState: {
        user: {}
    },
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
            return {};
        }
    }
});

export const signupActions = signupSlice.actions;
export const signupReducer = signupSlice.reducer;

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;