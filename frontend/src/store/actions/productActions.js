import { productListActions, productDetailsActions, productCreateActions, productUpdateActions, productDeleteActions } from '../slices/productSlices';

export const listProducts = () => {
    return async (dispatch) => {
        try {
            dispatch(productListActions.productListRequest());

            const res = await fetch('/api/products');
            if(!res.ok) {
                throw new Error(res.statusText)
            }
            const data = await res.json();

            dispatch(productListActions.productListSuccess(data));
        } catch(error) {
            dispatch(productListActions.productListFail(error.message));
        }
    }
};

export const listProductDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch(productDetailsActions.productDetailsRequest());

            const res = await fetch(`/api/products/${id}`);
            if(!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();

            dispatch(productDetailsActions.productDetailsSuccess(data));
        } catch(error) {
            dispatch(productListActions.productListFail(error.message));
        }
    }
};

export const createProduct = () => {
    return async (dispatch, getState) => {
        dispatch(productCreateActions.productCreateRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if(!response.ok) {
            dispatch(productCreateActions.productCreateFail(json.message));
        } else if(response.ok) {
            dispatch(productCreateActions.productCreateSuccess(json));
        }
    }
};

export const updateProduct = (product) => {
    return async (dispatch, getState) => {
        dispatch(productUpdateActions.productUpdateRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(product)
        });
        const json = await response.json();

        if(!response.ok) {
            dispatch(productUpdateActions.productUpdateFail(json.message));
        } else if(response.ok) {
            dispatch(productUpdateActions.productUpdateSuccess(json));
        }
    }
};

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        dispatch(productDeleteActions.productDeleteRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        });
        const json = await response.json();

        if(!response.ok) {
            dispatch(productDeleteActions.productDeleteFail(json.message));
        } else if(response.ok) {
            dispatch(productDeleteActions.productDeleteSuccess());
        }
    }
};