// hooks
import { useTheme } from '../hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//styles
import styles from './Navbar.module.css';
//components
import { Link } from 'react-router-dom';
//icons
import House from '../assets/home.svg';
import Mode from '../assets/mode.svg';
import Cart from '../assets/cart.svg';
import User from '../assets/user.svg';
// actions
import { logout } from '../store/actions/userActions';

const Navbar = () => {
  const { changeMode, mode } = useTheme();
  const { user } = useSelector(state => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.logo}>
                <img src={House} alt="House icon" />
                <Link to='/'>eHouse</Link>
            </li>
            {user && user.isAdmin && (
              <div className={styles.admin}>
                <li><Link to='/admin/users'>Users</Link></li>
                <li><Link to='/admin/products'>Products</Link></li>
                <li><Link to='/admin/orders'>Orders</Link></li>
              </div>
            )}
            <li className={styles.cart}>
              <img src={Cart} alt="Cart icon" />
              <Link to='/cart'>Cart</Link>
            </li>
            {user && (
              <div className={styles.logedin}>
                <li className={styles.user}>
                  <img src={User} alt='User icon' />
                  <Link to='/profile'>Profile</Link>
                </li>
                <li><button className='btn' onClick={handleLogout}>Logout</button></li>
              </div>
            )}
            {!user && <li><Link to='/login'>Login</Link></li>}
            <li>
              <img className={styles.mode} src={Mode} onClick={toggleMode} alt="Mode icon" />
            </li>
        </ul>
    </nav>
  )
};

export default Navbar;