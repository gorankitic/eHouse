// styles
import styles from './ProductDetails.module.css'
// components and hooks
import Rating from '../../components/Rating'
import Select from 'react-select'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'

const ProductDetails = () => {
  const { mode } = useTheme()
  const [ option, setOption ] = useState(null)
  const { id } = useParams()
  const url = `/api/products/${id}`
  const { data: product, isPending, error } = useFetch(url)

  const qOptions = []
  if(product) {
    for(let i=1; i<=product.countInStock; i++) {
      qOptions.push({value: i, label: i})
    }
  }
  
  const handleClick = (e) => {
    e.preventDefault()
    console.log(option.value)
  }

  return (
    <div className={`${styles.page} ${mode === 'dark' ? styles.dark : ''}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p>Loading...</p>}
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
                <button className='secondary-btn' disabled={product.countInStock === 0 || !option} onClick={handleClick}>Add To Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductDetails