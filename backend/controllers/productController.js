const Product = require('../models/productModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');

const getProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json(products)
});

const getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        return next(new AppError('No product found with that ID.', 404))
    }
    res.status(200).json(product)
});

const createProduct = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json(product)
});

module.exports = { getProducts, getProduct, createProduct }