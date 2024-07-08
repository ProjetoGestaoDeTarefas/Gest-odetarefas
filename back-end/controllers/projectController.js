// backend/controllers/projetoController.js
const projetoModel = require("../models/projetoModel.js");

class projetoController{


addProject = (req, res) => {
        const reqBody = req.body; 
        const retorno = projetoModel.apiCreate(reqBody);
        return retorno
          .then((result) =>
            res.status(201).json("Projeto criado com sucesso!")
          )
          .catch((error) => res.status(400).json(error.message));
      };
}
  module.exports = new projetoController();