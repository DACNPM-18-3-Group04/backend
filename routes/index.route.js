const express = require('express');
const router = express.Router();
const apiConfig = require('../configs/default.config').api;

const ErrorController = require('../components/errors/error.controller');
const apiRouter = require('./api');
const uploadfileRouter = require('./api/uploadfile');

router.use(`/api/${apiConfig.version}`, apiRouter);
router.use(`/api/${apiConfig.version}`, uploadfileRouter);

router.use(ErrorController.handleNotFoundError);

module.exports = router;
