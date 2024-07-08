// backend/routes/projeto.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/api/team', teamController.addTeam);

module.exports = router;
