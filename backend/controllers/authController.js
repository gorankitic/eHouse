const { promisify } = require('util');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    
    res.status(statusCode).json({
        token,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    });
};

const signup = catchAsync( async(req, res, next) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    
    if(existUser) {
        return next(new AppError('Email already in use.', 400));
    }

    const newUser = await User.create({ name, email, password });
    createSendToken(newUser, 201, res);
});

const login = catchAsync( async(req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exists
    if(!email || !password) {
        return next(new AppError('Please provide email and password.', 400));
    }
    // 2) Check if user exist and password is correct
    const user = await User.findOne({ email }).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password.',401));
    }
    // 3) Send token to client
    createSendToken(user, 200, res);
});

const protect = catchAsync( async(req, res, next) => {
    // 1) Get token
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new AppError('Please log in to get access.', 401));
    }
    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id).select('-password');
    if(!currentUser) {
        return next(new AppError('The user belonging to this token does not longer exist.', 401));
    }
    // 4) Check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password. Please log in again.', 401));
    }

    // Granted access to protected route
    req.user = currentUser;
    next();
});

const restrictToAdmin = catchAsync(async(req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        return next(new AppError('You have not permission to do this.', 401));
    }
});

module.exports = { createSendToken, signup, login, protect, restrictToAdmin }