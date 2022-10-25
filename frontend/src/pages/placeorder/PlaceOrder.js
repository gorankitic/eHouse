// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
// styles
import styles from './PlaceOrder.module.css';
// components
import CheckoutSteps from '../../components/CheckoutSteps';
// actions
import { createOrder } from '../../store/actions/orderActions';
import { createOrderActions } from '../../store/slices/orderSlices';
import { userDetailsActions } from '../../store/slices/userSlices';

const PlaceOrder = () => {
    const { paymentMethod, shippingAddress, cartItems } = useSelector(state => state.cart);
    const { order, success, error } = useSelector(state => state.createOrder);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode } = useTheme();

    // samo za prikaz korisniku, na bekendu sve proveriti
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;

    useEffect(() => {
        if(order && success) {
            navigate(`/order/${order._id}`);
            dispatch(createOrderActions.createOrderReset());
            dispatch(userDetailsActions.userDetailsReset());
        }
    }, [navigate, order, success, dispatch]);

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod
        }));
    }

    return (
        <div className={styles.placeorder}>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className={styles.container}>
                <div className={`${styles.details} ${mode === 'dark' ? styles.dark : ''}`}>
                    <h2>Shipping: </h2>
                    <p>
                        <strong>Address: </strong>
                        {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                    </p>
                    <h2>Payment method: </h2>
                    <p>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </p>
                    <h2>Ordered items: </h2>
                    {cartItems === 0 ? <p>Your cart is empty</p> : (
                        cartItems.map((item, index) => (
                            <div key={index} className={`${styles.cartItem} ${mode === 'dark' ? styles.dark : ''}`}>
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p><strong>{item.qty} x €{item.price} = €{item.qty * item.price}</strong></p>
                            </div>
                        ))
                    )}
                </div>
                <div className={styles.summary}>
                    <h2>Order summary: </h2>
                    <p>Items: <strong>€{itemsPrice}</strong></p>
                    <p>Shipping price: <strong>€{shippingPrice}</strong></p>
                    <p>Total price: <strong>€{itemsPrice + shippingPrice}</strong></p>
                    {error && <p>{error}</p>}
                    <button className='secondary-btn' onClick={placeOrderHandler}>PLACE ORDER</button>
                </div>
            </div>
        </div>
    )
};

export default PlaceOrder;