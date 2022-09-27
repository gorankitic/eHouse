//styles
import styles from './Home.module.css'

// components
import ProductList from '../../components/ProductList'
import products from '../../products'

const Home = () => {
  return (
    <div className={styles.homepage}>
        <h1>Latest products</h1>
        <ProductList products={products} />
    </div>
  )
}

export default Home