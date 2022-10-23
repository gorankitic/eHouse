const Product = require('../models/productModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');

const getProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json(products);
});

const getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new AppError('No product found with that ID.', 404));
    }
    res.status(200).json(product);
});

const createProduct = catchAsync(async (req, res, next) => {
    const product = new Product({
        user: req.user._id,
        name: 'Sample',
        price: 0,
        image: '/images/sony-a7.jpg',
        brand: 'Sample',
        category: 'Sample',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample'
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

const updateProduct = catchAsync(async (req, res, next) => {
    const { name, image, description, brand, category, price, countInStock, rating } = req.body;
    const product = await Product.findById(req.params.id);
    
    if(!product) {
        return next(new AppError('No product found with that ID.', 404));
    }

    if(product) {
        product.name = name;
        product.image = image;
        product.description = description;
        product.brand = brand;
        product.category = category;
        product.price = price;
        product.countInStock = countInStock;
        product.rating = rating;
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
});

const deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new AppError('No product found with that ID.', 404));
    }
    await product.remove();
    res.status(200).json({ message: 'Product removed.' });
});

const createReview = catchAsync(async (req, res, next) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    
    if(!product) {
        return next(new AppError('No product found with that ID.', 404));
    }

    if(product) {
        const alreadyReviewed = product.reviews.find(review => review.user._id.toString() === req.user._id.toString());
        if(alreadyReviewed) {
            return next(new AppError('Product already reviewed.', 400));
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        
        await product.save();
        res.status(201).json({ message: 'Review added.' });
    }
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct, createReview };