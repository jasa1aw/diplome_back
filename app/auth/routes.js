const express = require('express');
const {signUp, signIn} = require('./controller');
const router = express.Router();

router.post('/api/auth/registration', signUp);
router.post('/api/auth/login', signIn);

module.exports = router;