// hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// styles
import styles from './Signup.module.css';
// actions
import { signup } from '../../store/actions/userActions';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password));
    navigate('/');
  };

  return (
    <form className={styles.signup} onSubmit={handleSignup}>
      <h1>Sign up</h1>
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
  )
};

export default Signup;