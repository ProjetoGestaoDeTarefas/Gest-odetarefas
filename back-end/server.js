// server.js
const express = require('express');
const app = express();
const conn = require('./db/conn');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());

// Rotas de Autenticação
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    conn.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: "User registered successfully!" });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    conn.query(sql, [email], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: "User not found!" });
        
        const user = result[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ message: "Invalid password!" });
        
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    });
});
const mysql = require('mysql2');

app.get('/api/projetos', (req, res) => {
  // Faz a consulta ao banco de dados
  conn.query('SELECT * FROM projetos', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao buscar dados' });
    } else {
      res.status(201).json(results);
    }
  });
});


app.get('/api', (req, res) => {
    res.json({ message: 'Olá do servidor!' });
  });
  app.post('/api', (req, res) => {
    const project = req.body;
    // faça algo com os dados do projeto aqui
    res.json({ message: `Projeto recebido: ${project.name}` });
});
  app.get('/api/users', (req, res) => {
    res.json({ users: ['Ana', 'Carlos', 'Pedro'] });
  });

// Rotas de Gestão de Projetos, Tarefas e Membros
// (A serem desenvolvidas conforme necessário)

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
