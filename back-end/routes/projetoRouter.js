// backend/routes/projeto.js
const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projectController');

router.post('/api/projeto', projetoController.addProject);
router.get('/api/projeto', projetoController.listProject);
//router.get("/api/projeto/:id",projetoController.readPoject);
router.put("/api/projeto/:id",projetoController.updateProject);
router.delete('/api/projeto/:id', projetoController.deleteProject);

module.exports = router;
