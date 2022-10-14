const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name.']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please provide your email.'],
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 6,
        select: false
    },
    passwordChangedAt: Date,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// pre save middleware to hash password
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

// instance methods are available on all user documents - user.correctPassword()
userSchema.methods.correctPassword = async function(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
};

// check if password is changed after token was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;