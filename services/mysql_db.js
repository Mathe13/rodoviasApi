const mysql = require("mysql")
const config = require("../config")

var con = mysql.createPool(
    'mysql://nynyxn7w891pahsa:zij7zp7igsbaxtil@edo4plet5mhv93s3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/c8ng80padace9x3w'

    // {
    //     // host: "149.56.100.42",
    //     // user: "root",
    //     // password: "xy_a7mpJkCj_",
    //     // database: "app_instalador",
    //     connectionLimit: 20,
    //     host: config.bd.host,
    //     user: config.bd.user,
    //     password: config.bd.user,
    //     database: config.bd.database
    // }
);
// con.connect();
module.exports = con