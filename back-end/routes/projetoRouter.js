// backend/routes/projeto.js
const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projectController');

router.post('/api/projeto', projetoController.addProject);

module.exports = router;
