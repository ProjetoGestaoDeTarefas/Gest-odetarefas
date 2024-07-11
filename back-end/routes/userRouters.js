const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/api/user', UserController.register);
router.get('/api/users', UserController.list);
router.put('/api/user/:id', UserController.edit);
router.put('/api/user/adm/:id', UserController.admin);
router.delete('/api/user/:id', UserController.destroy);
router.put('/api/reset-password', UserController.resetPassword);
module.exports = router;