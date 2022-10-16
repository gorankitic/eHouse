import { signupActions, loginActions, userDetailsActions, updateProfileActions } from '../slices/userSlices';

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
        dispatch(loginActions.logout());
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