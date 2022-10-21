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
        },
        userDetailsReset(state) {
            return {};
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

const listUsersSlice = createSlice({
    name: 'listUsers',
    initialState: {
        users: []
    },
    reducers: {
        listUsersRequest(state) {
            return { loading: true };
        },
        listUsersSuccess(state, action) {
            return { loading: false, users: action.payload };
        },
        listUsersFail(state, action) {
            return { loading: false, error: action.payload };
        }
    }
});

const deleteUserSlice = createSlice({
    name: 'deleteUser',
    initialState: {},
    reducers: {
        deleteUserRequest(state) {
            return { loading: true };
        },
        deleteUserSuccess(state) {
            return { loading: false, success: true };
        },
        deleteUserFail(state, action) {
            return { loading: false, error: action.payload };
        }
    }
});

const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState: {
        user: {}
    },
    reducers: {
        updateUserRequest(state) {
            return { loading: true };
        },
        updateUserSuccess(state) {
            return { loading: false, success: true };
        },
        updateUserFail(state, action) {
            return { loading: false, error: action.payload };
        },
        updateUserReset(state) {
            return { user: {} };
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

export const listUsersActions = listUsersSlice.actions;
export const listUsersReducer = listUsersSlice.reducer;

export const deleteUserActions = deleteUserSlice.actions;
export const deleteUserReducer = deleteUserSlice.reducer;

export const updateUserActions = updateUserSlice.actions;
export const updateUserReducer = updateUserSlice.reducer;