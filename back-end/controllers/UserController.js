
const UserModel = require("../models/UserModel");

module.exports = class UserController {

    //Listar todos os usuários
    static async list(req, res) {
        try {
            const users = await UserModel.getAll();
            // console.log("list => ", users);

             if(users.length > 0) {
                 res.status(200).json({message: users});
             }else{
                 res.status(404).json({message: "Ainda não há usuários cadastrado no sistema!"});
             }

        } catch (error) {
            res.status(400).json({ message: "Houve erro ao buscar usuários", error });
        }

    }

    //Excluir um determinado usuário
    static async destroy(req, res) {

        const id = req.params.id;

        try {
            //Verifica se usuário existe
            const user = await UserModel.getFindId(id);

            if (!user) {
                res.status(404).json({ message: "Usuário não está cadastrado!" });
                return;
            }

            await UserModel.destroy(id);
            res.status(200).json({ message: `Usuário com id ${id} excluído com sucesso` });

        } catch (error) {
            res.status(400).json({ message: `Erro ao excluir usuário!`, error });
        }

    }

    //Editar um determinado usuário
    static async edit(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        console.log(name, email);

        try {
            //Verifica se usuário existe
            const user = await UserModel.getFindId(id);
            if (!user) {
                res.status(404).json({ message: "O Usuário que você está tentando editar não está cadastrado!" });
                return;
            }

            const userNovo = { name, email };
            await UserModel.update(userNovo, id);
            res.status(200).json({ message: "Dados do Usuário editados com sucesso!", userNovo });

        } catch (error) {
            res.status(400).json({ message: `Erro ao editar usuário!`, error });
            return;
        }

    }
    
    //Tornar um determinado usuário ADMIN
    static async admin(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        // console.log(name, email);

        try {
            //Verifica se usuário existe
            const user = await UserModel.getFindId(id);
            if (!user) {
                res.status(404).json({ message: "O Usuário que você está tentando editar não está cadastrado!" });
                return;
            }

            await UserModel.updateAdm(id);
            res.status(200).json({ message: `Agora o Usuário ${name} é um Administrador`});

        } catch (error) {
            res.status(400).json({ message: `Erro ao alterar Permissões!`, error });
            return;
        }

    }
}