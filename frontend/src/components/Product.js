// styles
import styles from './Product.module.css'
// components
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <div className={styles.card}>
        <Link to={`/products/${product._id}`}>
            <img src={product.image} alt={product.name} />
        </Link>
        <div className={styles.details}>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
            <p className={styles.price}>€{product.price}</p>
        </div>
        <div className={styles.rating}>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#358bec' />
        </div>
    </div>
  )
}

export default Product