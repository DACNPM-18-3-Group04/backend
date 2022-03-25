const express = require('express');
const router = express.Router();

const { auth } = require('../../components/auth/auth.middleware');

const {
  handleSignIn,
  handleSignOut,
} = require('../../components/auth/auth.controller');

router.post('/sign-in', handleSignIn);

router.post('/sign-out', auth, handleSignOut);

module.exports = router;
