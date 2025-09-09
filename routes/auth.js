const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);

module.exports = router;
