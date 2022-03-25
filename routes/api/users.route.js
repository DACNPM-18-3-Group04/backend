const express = require('express');
const router = express.Router();
const UserController = require('../../components/user/user.controller');

router.post('/register', UserController.handleRegister);

module.exports = router;
