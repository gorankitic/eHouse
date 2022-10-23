// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// styles
import styles from './ProductsList.module.css';
// components
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
// actions
import { listProducts, createProduct, deleteProduct } from '../../store/actions/productActions';
import { productCreateActions } from '../../store/slices/productSlices';

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, products } = useSelector(state => state.productList);
  // const { user } = useSelector(state => state.login);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector(state => state.productDelete);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = useSelector(state => state.productCreate);


  useEffect(() => {
    dispatch(productCreateActions.productCreateReset());
    if(successCreate && createdProduct) {
      navigate(`/admin/products/${createdProduct._id}`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, navigate, successDelete, successCreate, createdProduct]);

  const removeHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  }

  return (
      <div className={styles.productlist}> 
          <div className={styles.headContainer}>
          <h1>Products:</h1>
          <button className='secondary-btn' onClick={createProductHandler}>Create Product</button>
          </div>
          {loadingCreate && <Loader />}
          {errorCreate && <p className='error'>{errorCreate}</p>}
          {loadingDelete && <Loader />}
          {errorDelete && <p className='error'>{errorDelete}</p>}
          {loading && <Loader />}
          {error && <p className='error'>{error}</p>}
          <table className={styles.container}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody >
              {products && products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>€{product.price}</td>
                  <td>{product.brand}</td>
                  <td><Link to={`/admin/products/${product._id}`}>Edit</Link></td>
                  <td><button className='secondary-btn' onClick={() => removeHandler(product._id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
  )
};

export default ProductsList;