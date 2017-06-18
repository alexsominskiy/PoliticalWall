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
        "url TINYTEXT NOT NULL, "+
        "author TINYTEXT NOT NULL, "+
        "title TINYTEXT NOT NULL, "+
        "date VARCHAR(45) NOT NULL, "+
        "subject TEXT NOT NULL, " +
        "PRIMARY KEY (id))",
        function(err){console.log(err);});
