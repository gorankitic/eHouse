const express = require('express');
const { protect } = require('../controllers/authController');
const { createOrder, getOrder, updateOrderToPaid, getMyOrders } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .post(protect, createOrder);

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/:id')
    .get(protect, getOrder);

router.route('/:id/pay')
    .put(protect, updateOrderToPaid);

module.exports = router;
