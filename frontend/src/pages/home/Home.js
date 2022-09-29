//styles
import styles from './Home.module.css'
// components
import ProductList from '../../components/ProductList'
// hooks
import { useFetch } from '../../hooks/useFetch'

const Home = () => {
  const { data, isPending, error} = useFetch('/api/products')

  return (
    <div className={styles.homepage}>
        <h1>Latest products</h1>
        {error && <p className='error'>{error}</p>}
        {isPending && <p>Loading...</p>}
        {data && <ProductList products={data} />}
    </div>
  )
}

export default Home