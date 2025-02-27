const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");

module.exports = class AuthController{

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


    static async resetPassword(req, res) {
        const { email, newPassword } = req.body;
      
        // Verifica se o usuário com este e-mail existe
        const userExist = await UserModel.getFindEmail(email);
        if (!userExist || userExist.length === 0) {
          res.status(400).json({ message: `Usuário com e-mail ${email} não encontrado!` });
          return;
        }
      
        // Criptografa a nova senha
        const salt = await bcrypt.genSaltSync(10);
        const senhaCriptografada = await bcrypt.hashSync(newPassword, salt);
      
        // Atualiza a senha do usuário
        try {
          await UserModel.updatePassword(email, senhaCriptografada);
          res.status(200).json({ message: "Senha redefinida com sucesso!" });
          return;
        } catch (error) {
          res.status(400).json({ message: "Ocorreu um erro ao redefinir a senha.", error });
          return;
        }
      }
      

}