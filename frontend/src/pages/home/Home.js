// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//styles
import styles from './Home.module.css';
// components
import ProductList from '../../components/ProductList';
import Loader from '../../components/Loader';
// actions
import { listProducts } from '../../store/actions/productActions';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(listProducts())
  },[dispatch]);

  return (
    <div className={styles.homepage}>
        <h1>Latest products</h1>
        {error && <p className='error'>{error}</p>}
        {loading && <Loader />}
        {products && <ProductList products={products} />}
    </div>
  )
}

export default Home;