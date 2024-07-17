const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/api/login', authController.login);
router.post('/api/register', authController.register);
router.put('/api/reset-password', authController.resetPassword);


module.exports = router;