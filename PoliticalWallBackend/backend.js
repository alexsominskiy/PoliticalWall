/**
 * Created by User on 20.03.2017.
 */
var http = require('http');
var express = require('express');
var app = express();
var headers = require('./headers');
var connection = require('./connectionDB');
var mysql = require('mysql');
var fs = require('fs');
var mam = require('mammoth');
var df = require('dateformat');
var parseHTML = require('./parseHtml');


app.use(function(req,res,next){
    headers.setHeaders(res);
    next();
});

app.use("/",express.static(__dirname));

http.createServer(app).listen(8081);
console.log("Server at 8081 is ON");

app.post("/auth",function(req,res){
    var post=[];
    req.on("data", function(chunk){post.push(chunk)});
    req.on("end", function(){
        var signIn = JSON.parse(Buffer.concat(post).toString());
        connection.query("SELECT * FROM auth WHERE login='"+signIn.login+"'", function(err,fields){
            if (fields.length != 1) res.end("-1");
            else if (fields[0].psw != signIn.psw) res.end("-1");
            else res.end(randomToken());
        })
    })
})

function randomToken(){return Math.random().toString(36).substr(2)};

app.get("/events/getdays",function(req,res){
    var from = req.query.from;
    var to = req.query.to;
    connection.query("SELECT * FROM events WHERE date BETWEEN '"+from+"' AND '"+to+"'", function(err, rows){
        res.end(JSON.stringify(rows));
    })
})

app.get("/events/upload", function(req,res){
    connection.query("SELECT * FROM events WHERE date='"+req.query.date+"'", function(err,rows){
        if(rows.length == 0){
            if(req.query.event != "")
                connection.query("INSERT INTO events VALUES('"+req.query.date+"','"+req.query.event+"')", function(){
                    res.end("OK");
                })
        }else{
            if(req.query.event == ""){
                connection.query("DELETE FROM events WHERE date='"+req.query.date+"'",function(){
                    res.end("OK");
                })
            }
            else{
                connection.query("UPDATE events SET event='"+req.query.event+"' WHERE date = '"+req.query.date+"'", function(){
                    res.end("OK");
                })
            }
        }
    })
})

app.post("/seeWord", function(req,res){
    var post = [];
    req.on("data", function (chunk) {
        post.push(chunk);
    });
    req.on("end", function () {
        var data = Buffer.concat(post);
        fs.writeFile("../news/Tmp/"+req.query.fname, data, function () {
            mam.convertToHtml({path: "../news/Tmp/"+req.query.fname})
                .then(function (result) {
                    var pHTML = parseHTML(result.value);
                    var destName =  "../news/Tmp/"+df(new Date(),"yyyy-mm-dd_HH-MM-ss")+".html";
                    var fileInfo = {
                        destName : destName.substring(3),
                        author : pHTML.author,
                        header : pHTML.header
                    }
                    fs.writeFile(destName, pHTML.file, function (err) {
                        res.end(JSON.stringify(fileInfo));
                    });
                })
        });
    })
})

app.post("/uploadNews", function(req,res) {
    var post = [];
    req.on("data", function (chunk) {
        post.push(chunk);
    });
    req.on("end", function () {
        var data = JSON.parse(Buffer.concat(post).toString());
        var urlOrig = "../"+data.destName;
        var urlDest = "UploadedNews/"+data.destName.substring(9);
        var fdate = df(new Date(),"yyyy-mm-dd_HH-MM-ss");
        var dbRec = "INSERT INTO news VALUES('"+fdate+"','"+urlDest+"','"+data.header+"','"+data.author+"')";
        fs.createReadStream(urlOrig).pipe(fs.createWriteStream(urlDest));
        connection.query(dbRec, function(err){
            console.log(err);
            res.end(data.destName);
        })
    })
})





    /*var str = req.query.fname.substring(9);
    var header = str.substring(0,str.length-24);
    console.log(header);
    /*var fdate = df(new Date(),"yyyy-mm-dd_HH-MM-ss");
    var url = "../UploadedNews/"+fdate+"_"+header+".html";
    var dbRec = "INSERT INTO news VALUES('"+fdate+"','"+url+"','"+url+"',false)";
    fs.createReadStream("../"+req.query.fname).pipe(fs.createWriteStream(url));
    connection.query(dbRec, function(err){
        res.end(header);
    })
})*/

app.get("/getNews", function(req,res){
    var dbRec = "SELECT * FROM news";
    connection.query(dbRec, function(err,fields){
        res.write(JSON.stringify(fields));
        res.end();
    })
})

app.get("/setHot", function(req,res){
    var h = req.query.action == 'on' ? "1" : "0";
    var dt = req.query.id;
    var dbRec = "UPDATE news SET hot='"+h+"' WHERE date_time='"+dt+"'";
    connection.query(dbRec, function(err){
        res.end();
    })
})

app.get("/removeNews", function(req,res){
    dbRec = "DELETE FROM news WHERE date_time='"+req.query.id+"'";
    connection.query(dbRec,function(err){
        res.end();
    })
})

app.get("/getRecords", function(req,res){
    dbRec = "SELECT * FROM charts";
    connection.query(dbRec, function(err, fields){
        var records = [];
        for(var i in fields){
           records.push(fs.readFileSync("../UploadedCharts/"+fields[i].filename+".txt").toString())
        }
        res.write(JSON.stringify(records));
        res.end();
    })
})

app.post("/uploadChart", function(req,res){
    var fDate = req.query.fdate;
    var arr = fDate.split("-");
    var id = arr[2]+"-"+arr[1]+"-"+arr[0];
    var fname = "record_"+fDate;
    var post = [];
    req.on("data", function(chunk){post.push(chunk);})
    req.on("end", function(){
        fs.writeFile("../UploadedCharts/"+fname+".txt", post.join().toString(), function(er){
            dbRec="INSERT INTO charts VALUES('"+id+"','"+fname+"')";
            connection.query(dbRec, function(err){
                res.end("OK");
            })
        })

    })
})
