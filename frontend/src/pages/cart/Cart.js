// hook
import { useDispatch, useSelector } from 'react-redux';
// styles
import styles from './Cart.module.css'
// components
import { Link } from 'react-router-dom';
// actions
import { removeFromCart } from '../../store/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    console.log('checkout');
  }

  return (
    <div className={styles.cartpage}>
      <h1>Shopping cart</h1>
      <div className={styles.containers}>
        <div>
          {cartItems.length === 0 && <p>Your cart is empty. <Link to='/'>Go back</Link></p>}
          {cartItems.map(item => (
            <div className={styles.cartItem} key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p><strong>€{item.price}</strong></p>
              <p>Qty: {item.qty}</p>
              <button className='secondary-btn' onClick={() => removeFromCartHandler(item.id)}>Remove</button>
            </div>
          ))}
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