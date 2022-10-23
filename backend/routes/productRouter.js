const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, createReview } = require('../controllers/productController');
const { protect, restrictToAdmin } = require('../controllers/authController');

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, restrictToAdmin, createProduct)
    
router.route('/:id')
    .get(getProduct)
    .put(protect, restrictToAdmin, updateProduct)
    .delete(protect, restrictToAdmin, deleteProduct)

router.route('/:id/reviews')
    .post(protect, createReview)

module.exports = router;