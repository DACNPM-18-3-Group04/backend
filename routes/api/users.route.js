const express = require('express');
const { auth } = require('../../components/auth/auth.middleware');
const router = express.Router();
const UserController = require('../../components/user/user.controller');

router.post('/register', UserController.handleRegister);

router.post('/activation', UserController.handleActivateAccount);

router.post('/update', auth, UserController.handleUpdateAccount);

router.get('/info', auth, UserController.handleGetInfo);

router.post('/wishlist', auth, UserController.handleAddRemoveUserWishList);

router.get('/wishlist', auth, UserController.handleGetWishlist);

module.exports = router;
