// hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import { Link } from "react-router-dom";
import Loader from '../../components/Loader';
// styles
import styles from './ProductEdit.module.css';
// actins
import { listProductDetails, updateProduct } from '../../store/actions/productActions';
import { productUpdateActions, productDetailsActions } from "../../store/slices/productSlices";

const ProductEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, product } = useSelector(state => state.productDetails);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.productUpdate);

    useEffect(() => {
        if(successUpdate) {
            dispatch(productUpdateActions.productUpdateReset());
            dispatch(productDetailsActions.productDetailsReset());
            navigate('/admin/products');
        } else if(!product.name || product._id !== id) {
                dispatch(listProductDetails(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
    }, [dispatch, navigate, product, id, successUpdate]);

    const handleEditProduct = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ _id: id, name, price, image, brand, category, countInStock, description, rating: product.rating }));
    }

    return (
        <div className={styles.editproduct}>   
            <Link to='/admin/products'>Go Back</Link>
            <div className={styles.container}>
                <h1>Edit product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <p className='error'>{errorUpdate}</p>}
                <form onSubmit={handleEditProduct}>
                    {loading && <Loader />}
                    {error && <p className='error'>{error}</p>}
                    <label>Name:</label>
                    <input 
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <label>Price:</label>
                    <input 
                        type='number' 
                        onChange={(e) => setPrice(e.target.value)}
                        value={price} 
                    />
                    <label>Image:</label>
                    <input 
                        type='text'
                        onChange={(e) => setImage(e.target.value)}
                        value={image} 
                    />
                    <label>Brand:</label>
                    <input 
                        type='text' 
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand} 
                    /><label>Category:</label>
                    <input 
                        type='text' 
                        onChange={(e) => setCategory(e.target.value)}
                        value={category} 
                    />
                    <label>Count In Stock:</label>
                    <input 
                        type='number' 
                        onChange={(e) => setCountInStock(e.target.value)}
                        value={countInStock} 
                    /><label>Description:</label>
                    <input 
                        type='text' 
                        onChange={(e) => setDescription(e.target.value)}
                        value={description} 
                    />
                    <button className='secondary-btn'>Update</button>
                </form>
            </div>
        </div>
    )
};

export default ProductEdit;