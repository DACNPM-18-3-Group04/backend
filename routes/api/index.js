const express = require('express');

const router = express.Router();

const authRouter = require('./auth.route');
const userRouter = require('./users.route');
const propertyRouter = require('./property.route');
const contactRouter = require('./contact.route');
const uploadfileRouter = require('./uploadfile');
const adminRouter = require('./admin');

router.use(`/auth`, authRouter);
router.use('/user', userRouter);
router.use('/property', propertyRouter);
router.use('/contact', contactRouter);
router.use(`/upload`, uploadfileRouter);
router.use('/admin', adminRouter);

module.exports = router;
