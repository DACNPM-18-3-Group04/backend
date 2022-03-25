const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route');
const userRouter = require('./users.route');

router.use(`/auth`, authRouter);
router.use('/user', userRouter);

module.exports = router;
