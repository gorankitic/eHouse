const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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