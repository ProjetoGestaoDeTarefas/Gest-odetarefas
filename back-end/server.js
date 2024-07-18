// server.js
const express = require('express');
const app = express();
const router = require("./routes/index.js");
const conn = require('./db/conn.js');
const db = require('./db/index.js');
db();


//Porta em que o servidor Back-end vai rodar.
const port = 3000; //altere caso a porta padrão já esteja em uso.



app.use(express.json());


router(app, express);
app.listen(
    port,
    function (error) {
        if (error) {
            console.log("Ocorreu um erro ao rodar o servidor!");
            return;
        } else {
            console.log("O servidor está rodando com sucesso!");
        }
    }
);