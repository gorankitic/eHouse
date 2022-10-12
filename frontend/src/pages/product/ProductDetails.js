// hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
// styles
import styles from './ProductDetails.module.css';
// components
import Rating from '../../components/Rating';
import Select from 'react-select';
import Loader from '../../components/Loader';
// actions
import { listProductDetails } from '../../store/actions/productActions';

const ProductDetails = () => {
  const { mode } = useTheme();
  const [ option, setOption ] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(state => state.productDetails);

  useEffect(() => {
    dispatch(listProductDetails(id))
  },[dispatch, id]) 

  const qOptions = []
  if(product) {
    for(let i=1; i<=product.countInStock; i++) {
      qOptions.push({value: i, label: i})
    }
  }
  
  const addToCartHandler = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
          id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty: option.value
      }
    })
    navigate('/cart')
  }

  return (
    <div className={`${styles.page} ${mode === 'dark' ? styles.dark : ''}`}>
      {error && <p className='error'>{error}</p>}
      {loading && <Loader />}
      {product && (
        <>
          <Link to='/'>Go Back</Link>
          <div className={styles.container}>
            <img src={product.image} alt={product.name} />
            <div className={styles.details}>
              <h1>{product.name}</h1>
              <div className={styles.rating}>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#358bec' />
              </div>
              <p className={styles.price}>Price: <strong> €{product.price}</strong></p>
              <p><strong>Description:</strong> {product.description}</p>
            </div>
            <div className={styles.checkout}>
                <h2>Price: €{product.price}</h2>
                <p><strong>Status:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</p>
                <Select 
                  className={`${styles.select} ${mode === 'dark' ? styles.dark : ''}`} 
                  options={qOptions} 
                  onChange={(option) => setOption(option)}
                />
                <button className='secondary-btn' disabled={product.countInStock === 0 || !option} onClick={addToCartHandler}>Add To Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductDetails;