// hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// styles
import styles from './Profile.module.css';
// components
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
// actions
import { getUserDetails, updateProfile } from '../../store/actions/userActions';
import { updateProfileActions } from '../../store/slices/userSlices';
import { listMyOrders } from '../../store/actions/orderActions';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.userDetails);
  const { success } = useSelector(state => state.updateProfile);
  const { loading: loadingOrders, error: errorOrders, orders } = useSelector(state => state.myOrders);

  useEffect(() => {
    if(!user.name || !user) {
      dispatch(updateProfileActions.updateProfileReset());
      dispatch(getUserDetails('profile'));
      dispatch(listMyOrders());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateProfile({_id: user._id, name, email, password }));
  }

  return (
    <div className={styles.profile}>
      <div className={styles.userDetails}>
        <h1>User profile</h1>
        <form className={styles.signup} onSubmit={handleUpdateUser}>
          {loading && <Loader />}
          {success && <p className='success'>Profile updated</p>}
          {error && <p className='error'>{error}</p>}
          <label>Name:</label>
          <input 
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label>Email:</label>
          <input 
            type='email' 
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
          />
          <label>Password:</label>
          <input 
            type='password' 
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
          />
          <button className='secondary-btn'>Update</button>
        </form>
      </div>
      <div className={styles.orders}>
        <h1>My orders</h1>
        {loadingOrders && <Loader />}
        {errorOrders && <p className='error'>{errorOrders}</p>}
        {orders && orders.map(order => (
          <div key={order._id} className={styles.orderItem}>
            <p>Price: €{order.totalPrice}</p>
            <p>Paid: {order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</p>
            <p>Delivered: {order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</p>      
            <Link to={`/order/${order._id}`}>Details</Link>       
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile;