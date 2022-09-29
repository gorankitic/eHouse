const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
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
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product