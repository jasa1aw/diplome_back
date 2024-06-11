const express = require('express');
const {signIn} = require('./controller');
const router = express.Router();

router.post('/api/auth/login', signIn);

module.exports = router;