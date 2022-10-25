// hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
// styles
import styles from './Login.module.css';
// actions
import { login } from '../../store/actions/userActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form  onSubmit={handleLogin}>
        {loading && <Loader />}
        {error && <p className='error'>{error}</p>}
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
        <button className='secondary-btn' disabled={loading}>Login</button>
        <p>New customer? <Link to='/signup'>Sign up</Link></p>
      </form>
    </div>
  )
};

export default Login;