// backend/controllers/projetoController.js
const projetoModel = require("../models/projetoModel.js");

class projetoController {
  addProject = (req, res) => {
    const reqBody = req.body;
    const retorno = projetoModel.apiCreate(reqBody);
    return retorno
      .then((result) => res.status(201).json("Projeto criado com sucesso!"))
      .catch((error) => res.status(400).json(error.message));
  };

  listProject(req, res){
    const retorno = projetoModel.apiList();
    return retorno
      .then((result) =>
        result.length == 0
          ? res.status(500).send("Nenhum projeto no Banco de Dados!")
          : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  deleteProject(req, res) {
    const { id } = req.params;
    const retorno = projetoModel.apiDelete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Projeto deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  updateProject(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = projetoModel.apiUpdate(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Projeto atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }


}
module.exports = new projetoController();
