const express = require('express')
require('dotenv').config({path: '../.env'})
const chalk = require('chalk')
const connectDatabase = require('./database.js')
const productRouter = require('./routes/productRouter.js')

const app = express()
app.use(express.json());

connectDatabase()

app.use('/api/products', productRouter)

app.listen(process.env.PORT, () => {
    console.log(chalk.bgGreen(`Server is up in ${process.env.NODE_ENV} mode on port ${process.env.PORT}.`))
})