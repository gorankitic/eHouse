// hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// styles
import styles from './Signup.module.css';
// components
import Loader from '../../components/Loader';
// actions
import { signup } from '../../store/actions/userActions';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.signup);

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password));
  };

  return (
    <div className={styles.signup}>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        {loading && <Loader />}
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
        <button className='secondary-btn'>Sign up</button>
      </form>
    </div>
  )
};

export default Signup;