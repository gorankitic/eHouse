// hook
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// styles
import styles from './Cart.module.css'
// components
import { Link } from 'react-router-dom';
// actions
import { removeFromCart } from '../../store/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    navigate('/shipping');
  }

  return (
    <div className={styles.cartpage}>
      <h1>Shopping cart</h1>
      <div className={styles.containers}>
        <div className={styles.cartItems}>
          {cartItems.length === 0 && <p className={styles.empty}>Your cart is empty.</p>}
          {cartItems.map(item => (
            <div className={styles.cartItem} key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p><strong>€{item.price}</strong></p>
              <p>Qty: {item.qty}</p>
              <button className='secondary-btn' onClick={() => removeFromCartHandler(item.id)}>Remove</button>
            </div>
          ))}
          <Link to='/'>Continue shopping</Link>
        </div>
        <div className={styles.total}>
            <p><strong>Total:</strong> {cartItems.reduce((acc, item) => acc + item.qty, 0)} items</p>
            <p><strong>Total price:</strong> €{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
            <button className='secondary-btn' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;