// backend/controllers/teamController.js
const teamModel = require("../models/teamModel.js");

class teamController{


addTeam = (req, res) => {
        const reqBody = req.body; 
        const retorno = teamModel.apiCreate(reqBody);
        return retorno
          .then((result) =>
            res.status(201).json("Equipe criada com sucesso!")
          )
          .catch((error) => res.status(400).json(error.message));
      };
}
  module.exports = new teamController();