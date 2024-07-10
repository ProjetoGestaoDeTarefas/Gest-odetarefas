const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");

module.exports = class UserController {

    //Cadastrar usuário
    static async register(req, res) {

        const { name, email, password } = req.body;

        //Verifica se usuário com este e-mail já existe
        const userExist = await UserModel.getFindEmail(email);
        // console.log("userExist ", userExist);
        if (userExist && userExist.length > 0) {
            res.status(400).json({ message: `Usuário com e-mail ${email} já esta cadastrado!` });
            return;
        }

        //Criptografar a senha
        const salt = await bcrypt.genSaltSync(10);
        const senhaCriptografada = await bcrypt.hashSync(password, salt);

        //Criar usuário
        try {
            const usuarioNovo = { name, email, password: senhaCriptografada };
            await UserModel.create(usuarioNovo);
            res.status(201).json({ message: "Usuário criado com sucesso!", usuarioNovo });
            return;
        } catch (error) {
            res.status(400).json({ message: "Ocorreu erro ao cadastrar usuário.", error });
            return;
        }
    }

    static async login(req, res) {

        const { email, password } = req.body;

        // console.log("cheguei aqui 1")
        try {
            // console.log("cheguei aqui 2")
            const userExist = await UserModel.getFindEmail(email);
            // console.log("userExist ", userExist);

            if (!userExist) {
                res.status(400).json({ message: 'Usuário não cadastrado!' });
                return;
            }

            // Verificar se os valores de senha são válidos
            if (!password || !userExist.password) {
                res.status(400).json({ message: 'Dados inválidos fornecidos!' });
                return;
            }

            const passwordIsValid = bcrypt.compareSync(password, userExist.password);
            if (!passwordIsValid) {
                res.status(400).json({ message: 'Senha inválida!' });
                return;
            }

            const token = jwt.sign({ user: userExist }, 'secret', { expiresIn: 86400 });
            res.status(200).json({ message: 'Login bem-sucedido!', user: userExist, auth: true, token });

        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor', error: error.message });
        }
    }

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