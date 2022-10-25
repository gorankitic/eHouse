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
    if(!user || !user.name || success) {
      dispatch(updateProfileActions.updateProfileReset());
      dispatch(getUserDetails('profile'));
      dispatch(listMyOrders());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user, success]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateProfile({_id: user._id, name, email, password }));
  }

  return (
    <div className={styles.profile}>
      <div>
        <h1>User profile</h1>
        <form className={styles.userDetails} onSubmit={handleUpdateUser}>
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
      <div className={styles.container}>
        <h1>My orders</h1>
        {loadingOrders && <Loader />}
        {errorOrders && <p className='error'>{errorOrders}</p>}
        <table>
          <thead>
          <tr>
              <th>Price</th>
              <th>Paid</th>
              <th>Delivered</th>
          </tr>
          </thead>
          <tbody >
              {orders && orders.map(order => (
                  <tr key={order._id} className={styles.item}>
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
    </div>
  )
}

export default Profile;