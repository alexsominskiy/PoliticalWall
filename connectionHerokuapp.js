/**
 * Created by User on 17/06/2017.
 */
var mysql = require('mysql');
module.exports = mysql.createConnection({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b1deaaa3aa770b',
    password: '29c63657',
    database: 'heroku_0bb447de5526496'
});