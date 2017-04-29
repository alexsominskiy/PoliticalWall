/**
 * Created by User on 20.03.2017.
 */
var mysql = require('mysql');
module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "aelita",
    database: "political_wall"
});