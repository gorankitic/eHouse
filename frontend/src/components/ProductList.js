// styles
import styles from './ProductList.module.css'
// components
import Product from './Product'

const ProductList = ({ products }) => {
  return (
    <div className={styles.cards}>
         {products.map(product => (
            <div key={product._id}>
                <Product product={product} />
            </div>
        ))}
    </div>
  )
}

export default ProductList