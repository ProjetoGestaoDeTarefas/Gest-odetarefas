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
          ? res.status(404).send("Nenhum projeto foi formada ainda!")
          : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }
}
module.exports = new projetoController();
