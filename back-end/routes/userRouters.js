const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.get('/api/users', UserController.list);
router.put('/api/user/:id', UserController.edit);
router.put('/api/user/adm/:id', UserController.admin);
router.delete('/api/user/:id', UserController.destroy);
module.exports = router;