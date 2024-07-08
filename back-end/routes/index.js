const routertarefa = require("./tarefaRouter.js");
const routerprojeto = require("./projetoRouter.js");
const routeruser = require("./userRouters.js");
const routerauth = require("./authRouters.js");

module.exports = function (app, express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(routertarefa);
    app.use(routerprojeto);
    app.use(routeruser);
    app.use(routerauth);
}
