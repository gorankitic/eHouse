const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    comment: { type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Product must have a name.']
    },
    image: {
        type: String,
        required: [true, 'Product must have an image.']
    },
    description: {
        type: String,
        required: [true, 'Product must have a description.']
    },
    brand: String,
    category: {
        type: String,
        required: [true, 'Product must have a category.']
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price.']
    },
    countInStock: {
        type: Number,
        required: [true, 'Product must have number in stock.'],
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;