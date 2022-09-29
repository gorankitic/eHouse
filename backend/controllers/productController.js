const Product = require('../models/productModel.js')

const getProducts = async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json(products)
}

const getProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
}

const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch(error) {
        console.log(error)
    }
}

module.exports = { getProducts, getProduct, createProduct }