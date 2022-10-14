// hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// components
import { Link } from 'react-router-dom';
// styles
import styles from './Login.module.css';
// actions
import { login } from '../../store/actions/userActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector(state => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate('/');
  };

  return (
    <form className={styles.login} onSubmit={handleLogin}>
      <h1>Login</h1>
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
      {error && <p>{error}</p>}
    </form>
  )
};

export default Login;