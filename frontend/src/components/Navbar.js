//styles
import styles from './Navbar.module.css'

//icon
import House from '../assets/home.svg'
import Mode from '../assets/mode.svg'

//components
import { Link } from 'react-router-dom'

// hooks
import { useTheme } from '../hooks/useTheme'

const Navbar = () => {
  const { changeMode, mode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }

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
            <li>
              <img className={styles.mode} src={Mode} onClick={toggleMode} alt="Mode icon" />
            </li>
        </ul>
    </nav>
  )
}

export default Navbar