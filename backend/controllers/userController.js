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

exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
});

exports.updateUserProfile = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user._id);

    if(user) {
        if(req.body.name) {
            user.name = req.body.name || user.name;
        }
        if(req.body.email) {
            user.email = req.body.email || user.email;
        }
        if(req.body.password) {
            user.password = req.body.password;
        }
    }

    const updatedUser = await user.save();
    createSendToken(updatedUser, 200, res);
});

exports.deleteUser = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new AppError('There is no user with that id.', 404));
    }

    await user.remove();
    res.status(200).json({ message: 'User removed.' });
});

exports.getUser = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id).select('-password');

    if(!user) {
        return next(new AppError('There is no user with that id.', 404));
    }

    res.status(200).json(user);
});

exports.updateUser = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(user) {
        if(req.body.name) {
            user.name = req.body.name || user.name;
        }
        if(req.body.email) {
            user.email = req.body.email || user.email;
        }
        if(req.body.isAdmin !== null) {
            user.isAdmin = req.body.isAdmin;
        }
    }

    const updatedUser = await user.save();
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    });
});