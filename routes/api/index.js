const express = require('express');

const router = express.Router();

const authRouter = require('./auth.route');
const userRouter = require('./users.route');
const contactRouter = require('./contact.route');

router.use(`/auth`, authRouter);
router.use('/user', userRouter);
router.use('/contact', contactRouter);

module.exports = router;
