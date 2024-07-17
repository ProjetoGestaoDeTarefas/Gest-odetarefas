// backend/controllers/teamController.js
const teamModel = require("../models/teamModel.js");

class teamController {
  addTeam = (req, res) => {
    const reqBody = req.body;
    const retorno = teamModel.apiCreate(reqBody);
    return retorno
      .then((result) => res.status(201).json("Equipe criada com sucesso!"))
      .catch((error) => res.status(400).json(error.message));
  };
  
  addUser = (req, res) => {
    const id = req.params.id;
    const reqBody = req.body;
    const retorno = teamModel.apiAdd(reqBody, id);
    return retorno
      .then((result) => res.status(201).json("Equipe editada com sucesso!"))
      .catch((error) => res.status(400).json(error.message));
  };

  listTeam(req, res) {
    const retorno = teamModel.apiList();
    return retorno
      .then((result) =>
        result.length == 0
          ? res.status(404).send("Nenhuma equipe foi formada ainda!")
          : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

}
module.exports = new teamController();
