// hooks
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// styles
import styles from './Shipping.module.css';
// actions
import { saveShippingAddress } from '../../store/actions/cartActions';
// components
import CheckoutSteps from '../../components/CheckoutSteps';

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingAddress } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className={styles.shipping}>
            <CheckoutSteps step1 step2 />
            <div className={styles.container}>
                <h1>Shipping</h1>
                <form onSubmit={submitHandler}>
                    <label>Address:</label>
                    <input 
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                    <label>City:</label>
                    <input 
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                    <label>Postal code:</label>
                    <input 
                        type='text'
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                    />
                    <label>Country:</label>
                    <input 
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                    />
                    <button className='secondary-btn'>Proceed To Payment</button>
                </form>
            </div>
        </div>
    )
}

export default Shipping;