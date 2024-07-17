const tarefaRouters = require("./tarefaRouter.js");
const projetoRouters = require("./projetoRouter.js");
const userRouters = require("./userRouters");
const authRouters = require("./authRouters.js");
const teamRouters = require("./teamRouter.js");

module.exports = function (app, express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(tarefaRouters);
    app.use(projetoRouters);
    app.use(authRouters);
    app.use(userRouters);
    app.use(teamRouters);
}
