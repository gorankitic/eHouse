import { productListActions, productDetailsActions } from '../slices/productSlices';

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
}

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
}