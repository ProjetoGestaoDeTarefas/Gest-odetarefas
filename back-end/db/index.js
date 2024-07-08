const dbConnection = require("./conn");

const db = require("./dbCreate");

module.exports = () => {
  db.initConnection(dbConnection);
};
