const express = require('express');
const { signup, login, protect, restrictToAdmin } = require('../controllers/authController');
const { getUserProfile, updateUserProfile, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.route('/')
    .get(protect, restrictToAdmin, getAllUsers)

router.post('/signup', signup);
router.post('/login', login);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .get(protect, restrictToAdmin, getUser)
    .put(protect, restrictToAdmin, updateUser)
    .delete(protect, restrictToAdmin, deleteUser)    

module.exports = router;