// backend/routes/projeto.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/api/equipe', teamController.addTeam);
router.get('/api/equipes', teamController.listTeam);
router.post('/api/addequipe/:id', teamController.addUser);

module.exports = router;
