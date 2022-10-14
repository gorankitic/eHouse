import { signupActions, loginActions } from '../slices/userSlices';

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