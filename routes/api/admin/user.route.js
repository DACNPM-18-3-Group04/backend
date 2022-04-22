const express = require('express');
const { auth } = require('../../../components/auth/auth.middleware');
const router = express.Router();
const UserController = require('../../../components/user/user.controller');

router.get('/', auth, UserController.handleListUser);

module.exports = router;
