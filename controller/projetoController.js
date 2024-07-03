const projetoModel = require("../models/projetoModel.js");

class projetoController{
   apiReadList(req, res) {
    const retorno = projetoModel.apiReadList();
    return retorno
      .then((result) => result.length == 0
        ? res.status(404).send("Nenhum Projeto foi encontrado!")
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  apiRead(req, res) {
    const { id } = req.params;
    const retorno = projetoModel.apiRead(id);
    return retorno
      .then((result) =>
        result.length == 0 
        ? res.status(404).send("Projeto não encontrado!") 
        : res.status(200).json(result)
      )
      .catch((error) => res.status(400).json(error.message));
  }

  apiCreate(req, res) {
    const reqBody = req.body; 
    const retorno = projetoModel.apiCreate(reqBody);
    return retorno
      .then((result) =>
        res.status(201).send("Projeto criado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  apiUpdate(req, res) {
    const { id } = req.params;
    const reqBody = req.body;
      
    const retorno = projetoModel.apiUpdate(reqBody, id);
    return retorno
      .then((result) =>
        res.status(200).send("Projeto atualizado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));

  }

  apiDelete(req, res) {
    const { id } = req.params;
    const retorno = projetoModel.apiDelete(id);
    return retorno
      .then((result) =>
        res.status(200).send("Projeto deletado com sucesso!")
      )
      .catch((error) => res.status(400).json(error.message));
  }

  
  // ----------------------------------------------------------------------------------------------
  // Integração Front End x Back End
  // ----------------------------------------------------------------------------------------------

  viewCreate(req, res) {
    const ProjetoEquipelist = projetoModel.readEquipes();
    return ProjetoEquipelist
      .then((result) =>
        result.length == 0
        ? res.status(404).render("./Projeto/Projeto_create", { title: "Adicionar um novo Projeto!", result: result})
        : res.status(200).render("./Projeto/Projeto_create", { title: "Adicionar um novo Projeto!", result: result})
        )
        .catch((error) => res.status(400).send(error.message));
  }
  
  viewReadList(req, res) {
    const ProjetoList = projetoModel.readList();
    return ProjetoList
      .then((result) =>
        result.length == 0
          ? res.status(404).render("./Projeto/Projeto_read", { title: "Listar Projeto", Projetos: result, search: '' })
          : res.status(200).render("./Projeto/Projeto_read", { title: "Listar Projeto", Projetos: result , search: '' })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  viewUpdate(req, res) {
    const { id } = req.params;
    const Projeto = projetoModel.read(id);
    return Projeto
      .then((result) =>
        result.length == 0
          ? res.status(404).redirect("/")
          : res.status(200).render("./Projeto/Projeto_update", { title: "Atualizar cadastro de Projeto", Projetos: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }
  
  viewHomePage(req, res) {
    return res.status(200).render("./index", { title: "Página Inicial"});
  }

  create(req, res) {
    const newProjeto = req.body;
    const Projeto = projetoModel.create(newProjeto);
    return Projeto
      .then((result) => {
        res.status(201).render('modal', {
            color: 'text-success',
            background: 'alert-success',
            icone: 'fa-check',
            modalTitle: 'Cadastro Inserido',
            message: `Projeto cadastrado com sucesso!`,
            redirectUrl: '/Projeto/create'
        });
    })
      .catch((error) => res.status(400).send(error.message));    
  }
  update(req, res) {
    const { id } = req.params;
    const updatedProjeto = req.body;
    const Projeto = projetoModel.update(updatedProjeto, id);
    return Projeto
      .then((result) => {
          res.render('modal', {
              color: 'text-primary',
              background: 'alert-primary',
              icone: 'fa-pen',
              modalTitle: 'Cadastro Atualizado',
              message: `Projeto ${id} atualizado com sucesso!`,
              redirectUrl: '../../Projeto'
          });
      })
      .catch((error) => res.status(400).send(error.message));
}
  delete(req, res) {
    const { id } = req.params;
    const Projeto = projetoModel.delete(id);
    return Projeto
      .then((result) => {
        res.status(200).render('modal', {
            color: 'text-danger',
            background: 'alert-danger',
            icone: 'fa-trash',
            modalTitle: 'Cadastro Excluido',
            message: `Projeto ${id} excluída com sucesso!`,
            redirectUrl: '/Projeto'
        });
    })
      .catch((error) => res.status(400).send(error.message));  
  }

    search(req, res) {
      const pesquisa  = '%' + req.body.search + '%';
      const ProjetosList = projetoModel.search(pesquisa);
      return ProjetosList
        .then((result) =>
          result.length == 0
            ? res.status(404).render("./Projeto/Projeto_read", { title: "Projeto", Projetos: result, search: req.body.search })
            : res.status(200).render("./Projeto/Projeto_read", { title: "Projeto", Projetos: result, search: req.body.search })
        )
        .catch((error) => res.status(400).send(error.message));  
    }

}

module.exports = new projetoController();