const express = require('express');
require('dotenv').config({path: '../.env'});
const chalk = require('chalk');
const connectDatabase = require('./database');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.json());

connectDatabase();

// Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// Handling unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404))
});

// Global error handling middleware
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(chalk.bgGreen(`Server is up in ${process.env.NODE_ENV} mode on port ${process.env.PORT}.`))
});