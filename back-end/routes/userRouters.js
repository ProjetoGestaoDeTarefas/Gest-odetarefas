const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/api/user', UserController.register);
router.get('/api/users', UserController.list);
router.put('/api/user', UserController.edit);
router.delete('/api/user/:id', UserController.destroy);

module.exports = router;