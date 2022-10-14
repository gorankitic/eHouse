const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { createSendToken } = require('./authController');

exports.getUserProfile = catchAsync( async(req, res, next) => {
    const user = await User.findById(req.user._id);

    if(!user) {
        return next(new AppError('No user found.', 401));
    }

    res.status(200).json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
});

exports.updateUserProfile = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
    }

    const updatedUser = await user.save();
    createSendToken(updatedUser, 200, res);
});