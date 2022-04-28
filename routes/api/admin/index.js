const express = require('express');
const router = express.Router();

const AdminUserRouter = require('./user.route');
const AdminPropertyRouter = require('./property.route');

router.use('/user', AdminUserRouter);
router.use('/property', AdminPropertyRouter);

module.exports = router;
