const routertarefa = require("./tarefaRouter.js");
const routerprojeto = require("./projetoRouter.js");

module.exports = function (app, express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(routertarefa);
    app.use(routerprojeto);
}
