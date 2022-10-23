const express = require('express');
const { protect, restrictToAdmin } = require('../controllers/authController');
const { createOrder, getOrder, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getAllOrders } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .get(protect, restrictToAdmin, getAllOrders)
    .post(protect, createOrder);

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/:id')
    .get(protect, getOrder);

router.route('/:id/pay')
    .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
    .put(protect, restrictToAdmin, updateOrderToDelivered)

module.exports = router;
