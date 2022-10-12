import { cartActions } from "../slices/cartSlices";

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {
        const res = await fetch(`/api/products/${id}`);
        if(!res.ok) {
            throw new Error(res.statusText)
        }
        const product = await res.json();
        
        dispatch(cartActions.addToCart({
            id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            qty
        }));
        
        // Not great solution, doble check on backend
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
}

export const removeFromCart = (id) => {
    return async (dispatch) => {
        dispatch(cartActions.removeFromCart(id))
    }
}