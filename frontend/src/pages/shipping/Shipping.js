// hooks
import { useState } from 'react';
// styles
import styles from './Shipping.module.css';

const Shipping = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className={styles.shipping}>
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
                <label>Contry:</label>
                <input 
                    type='text'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                />
                <button>Procced To Payment</button>
            </form>
        </div>
    )
}

export default Shipping