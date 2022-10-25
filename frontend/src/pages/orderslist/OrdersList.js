// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// styles
import styles from './OrdersList.module.css';
// components
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
// actions
import { listOrders } from '../../store/actions/orderActions';
import { orderDetailsActions } from '../../store/slices/orderSlices';

const OrdersList = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.listOrders);

    useEffect(() => {
        dispatch(listOrders());
        dispatch(orderDetailsActions.orderDetailsReset());
    }, [dispatch]);

    return (
        <div className={styles.orderslist}> 
            <h1>Users:</h1>
            {loading && <Loader />}
            {error && <p className='error'>{error}</p>}
            <table className={styles.container}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>User</th>
                    <th>Total Price</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                </tr>
                </thead>
                <tbody >
                    {orders && orders.map(order => (
                        <tr key={order._id} className={styles.container}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>€{order.totalPrice}</td>

                            <td>{
                                order.isPaid ? 
                                    (<div className={styles.check}>
                                        <p>{order.paidAt.substring(0,10)}</p>
                                        <i className='fas fa-check' style={{color: 'green'}}></i>
                                    </div>) : 
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                }
                            </td>
                            <td>{
                                order.isDelivered ? 
                                    (<div className={styles.check}>
                                        <p>{order.deliveredAt.substring(0,10)}</p>
                                        <i className='fas fa-check' style={{color: 'green'}}></i>
                                    </div>) : 
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                }
                            </td>
                            <td><Link to={`/order/${order._id}`}>Details</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
    )
};

export default OrdersList;