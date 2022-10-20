// hooks
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// styles
import styles from './Payment.module.css';
// components
import CheckoutSteps from '../../components/CheckoutSteps';
// actions
import { savePaymentMethod } from '../../store/actions/cartActions';


const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const navigate = useNavigate();
  const { shippingAddress } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if(!shippingAddress) {
    navigate('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  }

  return (
    <div className={styles.payment}>
        <CheckoutSteps step1 step2 step3 />
        <div className={styles.container}>
            <h1>Payment method</h1>
            <form onSubmit={submitHandler}>
                <label>Select method:</label>
                <div className={styles.radio}>
                  <label>Paypal: </label>
                  <input type='radio' name='method' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
                <button className='secondary-btn'>Continue</button>
            </form>
        </div>
    </div>
  )
}

export default Payment;