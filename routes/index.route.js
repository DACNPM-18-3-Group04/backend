const express = require('express');
const router = express.Router();
const apiConfig = require('../configs/default.config').api;

const ErrorController = require('../components/errors/error.controller');
const apiRouter = require('./api');

router.use(`/api/${apiConfig.version}`, apiRouter);

router.use(ErrorController.handleNotFoundError);

module.exports = router;
