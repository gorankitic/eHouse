const express = require('express');
const { signup, login, protect } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

module.exports = router;