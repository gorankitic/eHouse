import axios from 'axios';
// hooks
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
// styles
import styles from './Order.module.css';
// components
import Loader from '../../components/Loader';
import { PayPalButton } from 'react-paypal-button-v2';
// actions
import { getOrderDetails, payOrder, deliverOrder } from '../../store/actions/orderActions';
import { orderDeliverActions, orderPayActions } from '../../store/slices/orderSlices';


const Order = () => {
    const [sdkReady, setSdkReady] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { mode } = useTheme();
    const { loading, error, order } = useSelector(state => state.orderDetails);
    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay);
    const { loading: loadingDeliver, success: successDeliver } = useSelector(state => state.orderDeliver);
    const { user } = useSelector(state => state.login);

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }

        if(!order || successPay || successDeliver) {
            dispatch(orderPayActions.orderPayReset());
            dispatch(orderDeliverActions.orderDeliverReset());
            dispatch(getOrderDetails(id));
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
       
    }, [dispatch, id, order, successPay, successDeliver]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult));
    };

    return (
        <div className={styles.orderpage}>
            {loading && <Loader />}
            {error && <p className='error'>{error}</p>}
            {order && 
                <div className={styles.container}>
                    <div className={`${styles.details} ${mode === 'dark' ? styles.dark : ''}`}>
                        <h1>Order: </h1>
                        <h2>User: </h2>
                        <p>
                            <strong>Name: </strong>{order.user.name}, 
                            <strong> email: </strong>{order.user.email}
                        </p>
                        <h2>Shipping: </h2>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <p className='success'>Delivered at: ${order.deliveredAt}</p> : <p className='error'>Not delivered!</p>}
                        <h2>Payment method: </h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <p className='success'>Paid at: ${order.paidAt}</p> : <p className='error'>Not paid!</p>}
                        <h2>Ordered items: </h2>
                        {order.orderItems === 0 ? <p>Your cart is empty</p> : (
                            order.orderItems.map((item, index) => (
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
                        <p>Items: <strong>€{order.itemsPrice}</strong></p>
                        <p>Shipping price: <strong>€{order.shippingPrice}</strong></p>
                        <p>Total price: <strong>€{order.itemsPrice + order.shippingPrice}</strong></p>
                        {!order.isPaid && (
                            <div className={styles.paypalbutton}>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </div>
                        )}
                        {loadingDeliver ? <Loader /> :
                        user && user.isAdmin && order.isPaid && !order.isDelivered && (
                            <button className='secondary-btn' onClick={deliverHandler}>Mark As Delivered</button>
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

export default Order;