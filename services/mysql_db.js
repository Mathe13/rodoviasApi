const mysql = require("mysql")
const config = require("../config")

var con = mysql.createPool({
    // host: "149.56.100.42",
    // user: "root",
    // password: "xy_a7mpJkCj_",
    // database: "app_instalador",
    connectionLimit: 20,
    host: config.bd.host,
    user: config.bd.user,
    password: config.bd.user,
    database: config.bd.database
});
// con.connect();
module.exports = con