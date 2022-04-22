const express = require('express');
const router = express.Router();

const AdminUserRouter = require('./user.route');

router.use('/user', AdminUserRouter);

module.exports = router;
