const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.save);
router.get('/', UserController.list);
router.put('/', UserController.edit);
router.delete('/:id', UserController.destroy);

module.exports = router;