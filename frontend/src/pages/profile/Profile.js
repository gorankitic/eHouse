// hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// styles
import styles from './Profile.module.css';
// components
import Loader from '../../components/Loader';
// actions
import { getUserDetails, updateProfile } from '../../store/actions/userActions';
import { updateProfileActions } from '../../store/slices/userSlices';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.userDetails);
  const { success } = useSelector(state => state.updateProfile);

  useEffect(() => {
    if(!user.name || !user) {
      dispatch(updateProfileActions.updateProfileReset());
      dispatch(getUserDetails('profile'));
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
        <h1>Orders</h1>
      </div>
    </div>
  )
}

export default Profile;