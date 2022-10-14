import { signupActions, loginActions } from '../slices/userSlices';

export const signup = (name, email, password) => {
    return async (dispatch) => {
        try {
            dispatch(signupActions.signupRequest());

            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();

            dispatch(signupActions.signupSuccess(json));
            dispatch(loginActions.signupSuccess(json));
        } catch(error) {
            dispatch(signupActions.signupFail(error.message));
        }
    }
};

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(loginActions.loginRequest());

            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();

            dispatch(loginActions.loginSuccess(json));

        } catch(error) {
            dispatch(loginActions.loginFail(error.message));
        }
    }
};

export const logout = () => {
    return async (dispatch) => {
        
    }
};