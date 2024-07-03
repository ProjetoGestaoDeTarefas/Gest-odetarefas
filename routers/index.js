const routerprojeto = require("./taskRouter.js");

module.exports = function (app, express) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(routerprojeto);
}
