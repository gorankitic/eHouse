const Order = require('../models/OrderModel');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createOrder = catchAsync(async(req, res, next) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    let itemsPrice = 0;
    for(let i=0; i<orderItems.length; i++) {
        const { price } = await Product.findById(orderItems[i].id);
        itemsPrice += price * orderItems[i].qty;   
    }    
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const totalPrice = (itemsPrice + shippingPrice).toFixed(2); 

    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
    })

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
});

const getOrder = catchAsync(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order) {
        return next(new AppError('No order with that id.', 404));
    }
    
    res.status(200).json(order);
});

const updateOrderToPaid = catchAsync(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new AppError('No order with that id.', 404));
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        // email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
});

const updateOrderToDelivered = catchAsync(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new AppError('No order with that id.', 404));
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
});

const getMyOrders = catchAsync(async(req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

const getAllOrders = catchAsync(async(req, res, next) => {
    const orders = await Order.find().populate({ path: 'user', select: '-__v -_id -isAdmin' });
    res.status(200).json(orders);
});

module.exports = { createOrder, getOrder, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getAllOrders };