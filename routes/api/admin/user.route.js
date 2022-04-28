const express = require('express');
const { auth } = require('../../../components/auth/auth.middleware');
const router = express.Router();
const UserController = require('../../../components/user/user.controller');

router.get('/', auth, UserController.handleListUser);

router.get('/:id', auth, UserController.handleAdminGetUserInfo);

router.put('/:id', auth, UserController.handleAdminUpdateUser);

module.exports = router;
