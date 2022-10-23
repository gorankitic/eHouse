import { signupActions, loginActions, userDetailsActions, updateProfileActions, listUsersActions, updateUserActions, deleteUserActions } from '../slices/userSlices';
import { myOrdersActions, orderDetailsActions } from '../slices/orderSlices';

export const signup = (name, email, password) => {
    return async (dispatch) => {
        dispatch(signupActions.signupRequest());

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();

        if(!response.ok) {
            dispatch(signupActions.signupFail(json.message));
        }
        if(response.ok) {
            dispatch(signupActions.signupSuccess(json));
            dispatch(loginActions.loginSuccess(json));
            localStorage.setItem('user', JSON.stringify(json)); 
        }
    }
};

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(loginActions.loginRequest());

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();

        if(!response.ok) {
            dispatch(loginActions.loginFail(json.message));
        } else if(response.ok) {
            dispatch(loginActions.loginSuccess(json));
            localStorage.setItem('user', JSON.stringify(json));
        }
    }
};

export const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem('user');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');

        dispatch(loginActions.logout());
        dispatch(userDetailsActions.userDetailsReset());
        dispatch(myOrdersActions.myOrdersReset());
        dispatch(orderDetailsActions.orderDetailsReset());
    }
};

export const getUserDetails = (id) => {
    return async (dispatch, getState) => {
        dispatch(userDetailsActions.userDetailsRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(!response.ok) {
            dispatch(userDetailsActions.userDetailsFail(json.message));
        } else if(response.ok) {
            dispatch(userDetailsActions.userDetailsSuccess(json));
        }
    }
};

export const updateProfile = (userObj) => {
    return async (dispatch, getState) => {
        dispatch(updateProfileActions.updateProfileRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(userObj)
        })
        const json = await response.json();
        
        if(!response.ok) {
            dispatch(updateProfileActions.updateProfileFail(json.message));
        } else if(response.ok) {
            dispatch(updateProfileActions.updateProfileSuccess(json));
            dispatch(loginActions.loginSuccess(json));
            localStorage.setItem('user', JSON.stringify(json));
        }
    }
};

export const listUsers = () => {
    return async (dispatch, getState) => {
        dispatch(listUsersActions.listUsersRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        })
        const json = await response.json();
        
        if(!response.ok) {
            dispatch(listUsersActions.listUsersFail(json.message));
        } else if(response.ok) {
            dispatch(listUsersActions.listUsersSuccess(json));
        }
    }
};

export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        dispatch(deleteUserActions.deleteUserRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        })
        const json = await response.json();
        
        if(!response.ok) {
            dispatch(deleteUserActions.deleteUserFail(json.message));
        } else if(response.ok) {
            dispatch(deleteUserActions.deleteUserSuccess());
        }
    }
};

export const updateUser = (userObject) => {
    return async (dispatch, getState) => {
        dispatch(updateUserActions.updateUserRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/users/${userObject._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(userObject)
        })
        const json = await response.json();

        if(!response.ok) {
            dispatch(updateUserActions.updateUserFail(json.message));
        } else if(response.ok) {
            dispatch(updateUserActions.updateUserSuccess());
            dispatch(userDetailsActions.userDetailsSuccess(json));
        }
    }
};