// components
import { Link } from 'react-router-dom';
// styles
import styles from './CheckoutSteps.module.css';
// icons
import Next from '../assets/next.svg';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className={styles.steps}>
        <div>
            {step1 ? <div className={styles.item}><Link to='/login'>Sign in</Link><img src={Next} alt='Next page icon' /></div> : <Link style={{pointerEvents: 'none'}}>Sign In</Link>}
        </div>
        <div>
            {step2 ? <div className={styles.item}><Link to='/shipping'>Shipping</Link><img src={Next} alt='Next page icon' /></div> : <Link style={{pointerEvents: 'none'}}>Shipping</Link>}
        </div>
        <div>
            {step3 ? <div className={styles.item}><Link to='/payment'>Payment</Link><img src={Next} alt='Next page icon' /></div> : <Link style={{pointerEvents: 'none'}}>Payment</Link>}
        </div>
        <div>
            {step4 ? <div className={styles.item}><Link to='/placeorder'>Place order</Link><img src={Next} alt='Next page icon' /></div> : <Link style={{pointerEvents: 'none'}}>Place order</Link>}
        </div>
    </nav>
  )
}

export default CheckoutSteps