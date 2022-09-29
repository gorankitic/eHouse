const connectDatabase = require('./database')
require('dotenv').config({path: '../.env'})
const chalk = require('chalk')
const { products } = require('./products')
const Product = require('./models/productModel')

connectDatabase()

const importData = async () => {
    try {
        await Product.deleteMany()
        await Product.insertMany(products) 
        console.log(chalk.bgGreen('Data successfully loaded into database.'))
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

const deleteData = async () => {
    try {
        await Product.deleteMany()
        console.log(chalk.bgRed('Data successfully deleted from database.'))
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

if(process.argv[2] === '--import') {
    importData()
} else if(process.argv[2] === '--delete') {
    deleteData()
}

// console.log(process.argv)