/**
 * Created by User on 13/06/2017.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b1deaaa3aa770b',
    password: '29c63657',
    database: 'heroku_0bb447de5526496'
});
connection.query("DROP TABLE news",function(err){console.log(err)});
connection.query("CREATE TABLE news (" +

        "id VARCHAR(45) NOT NULL, "+
        "url VARCHAR(255) NOT NULL, "+
        "author VARCHAR(255) NOT NULL, "+
        "title VARCHAR(255) NOT NULL, "+
        "date VARCHAR(45) NOT NULL, "+
        "subject VARCHAR(32726) NOT NULL, " +
        "PRIMARY KEY (id))",
        function(err){console.log(err);});
