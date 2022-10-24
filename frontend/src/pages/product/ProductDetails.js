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
import { listProductDetails, createReview } from '../../store/actions/productActions';
import { reviewCreateActions } from '../../store/slices/productSlices';
import { addToCart } from '../../store/actions/cartActions';

const ProductDetails = () => {
  const { id } = useParams();
  const { mode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ option, setOption ] = useState(null);
  const [ rating, setRating ] = useState(0);
  const [ comment, setComment ] = useState('');
  const { loading, error, product } = useSelector(state => state.productDetails);
  const { user } = useSelector(state => state.login);
  const { error: errorReview, success: successReview } = useSelector(state => state.reviewCreate);

  useEffect(() => {
    if(successReview) {
      dispatch(reviewCreateActions.reviewCreateReset());
      setRating(0);
      setComment('');
    }
    dispatch(listProductDetails(id));
  },[dispatch, id, successReview]) 

  const qOptions = [];
  if(product) {
    for(let i=1; i<=product.countInStock; i++) {
      qOptions.push({value: i, label: i});
    }
  }

  const ratingOptions = [
    {value: 1, label: '1 star - poor'}, 
    {value: 2, label: '2 stars - fair'}, 
    {value: 3, label: '3 stars - good'}, 
    {value: 4, label: '4 stars - very good'}, 
    {value: 5, label: '5 stars - excellent'}
  ];

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart(id, option.value))
    navigate('/cart');
  }

  const addReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(id, { rating, comment }))
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
          <div className={styles.reviews}>
            <div className={styles.reviewlist}>
              <h1>Reviews</h1>
              {product && product.reviews.length === 0 && <p className='info'>No reviews</p>}
              {product.reviews.map(review => (
                <div key={review._id} className={styles.review}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color='#358bec' />
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
            <div className={styles.reviewwrite}>
              <h1>Write a Customer Review</h1>
              {errorReview && <p className='error'>{errorReview}</p>}
              {!user && <p>Please <Link to='/login'>sign in</Link> to write a review.</p>}
              {user && (
                <form onSubmit={addReviewHandler}>
                  <label>Rating:</label>
                  <Select 
                    options={ratingOptions}
                    className={`${styles.select} ${mode === 'dark' ? styles.dark : ''}`}
                    onChange={(option) => setRating(option.value)}
                  />
                  <label>Review:</label>
                  <textarea 
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <button className='secondary-btn'>Submit</button>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductDetails;