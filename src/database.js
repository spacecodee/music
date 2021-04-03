const mysql = require("mysql");
const { promisify } = require("util");

const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    switch (err) {
      case err.code === "PROTOCOL_CONNECTION_LOST":
        console.log("DATABASE CONNECTION WAS CLOSED");
        break;
      case err.code === "ER_CON_COUNT_ERROR":
        console.log("DATABASE HAS TO MANY CONNECTIONS");
        break;
      case err.code === "ECONNREFUSED":
        console.log();
        break;
    }
  }

  if (connection) connection.release();
  console.log("DB Is connect");
  return;
});

pool.query = promisify(pool.query);

module.exports = { pool };
