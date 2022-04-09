const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route');
const userRouter = require('./users.route');
const propertyRouter = require('./property.route');

router.use(`/auth`, authRouter);
router.use('/user', userRouter);
router.use('/property', propertyRouter);

module.exports = router;
