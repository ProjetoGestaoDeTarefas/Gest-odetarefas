const Router = require("express").Router;
const router = Router();
const projetoController = require("../controller/projetoController.js");
const tarefaController = require("../controller/tarefaController.js");



// ----------------------------------------------------------------------------------------------
// Integração API
// ----------------------------------------------------------------------------------------------

router.get("/api/projeto",projetoController.apiReadList);
router.get("/api/projeto/:id",projetoController.apiRead);
router.post("/api/projeto", projetoController.apiCreate);
router.put("/api/projeto/:id",projetoController.apiUpdate);
router.delete("/api/projeto/:id",projetoController.apiDelete);

router.get("/api/tarefa",tarefaController.apiReadList);
router.get("/api/tarefa/:id",tarefaController.apiRead);
router.post("/api/tarefa", tarefaController.apiCreate);
router.put("/api/tarefa/:id",tarefaController.apiUpdate);
router.delete("/api/tarefa/:id",tarefaController.apiDelete);

// ----------------------------------------------------------------------------------------------
// Integração Front End x Back End
// ----------------------------------------------------------------------------------------------
router.get("/projeto/create", projetoController.viewCreate);
router.get("/projeto", projetoController.viewReadList);
router.get("/projeto/update/:id", projetoController.viewUpdate);
router.get("/", projetoController.viewHomePage);
router.post("/projeto", projetoController.create);
router.post("/projeto/:id", projetoController.update);
router.get("/projeto/delete/:id", projetoController.delete);
router.post("/projeto.search", projetoController.search);

router.get("/tarefa/create", tarefaController.viewCreate);
router.get("/tarefa", tarefaController.viewReadList);
router.get("/tarefa/update/:id", tarefaController.viewUpdate);
router.post("/tarefa", tarefaController.create);
router.post("/tarefa/:id", tarefaController.update);
router.get("/tarefa/delete/:id", tarefaController.delete);
router.post("/tarefa.search", tarefaController.search);

module.exports = router;