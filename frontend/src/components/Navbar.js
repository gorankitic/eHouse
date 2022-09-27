//styles
import styles from './Navbar.module.css'

//icon
import House from '../assets/home.svg'

//components
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.logo}>
                <img src={House} alt="House icon" />
                <Link to='/'>eHouse</Link>
            </li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><button className='btn'>Logout</button></li>
        </ul>
    </nav>
  )
}

export default Navbar