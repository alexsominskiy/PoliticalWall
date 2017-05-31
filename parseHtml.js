/**
 * Created by User on 23/04/2017.
 */
var style = 
    "<style>" +
    "*{"+
    "text-align: right;"+
    "}" +

    ".author{" +
    "font-size: 3.3vh;"+
    "color: black;"+
    "}"+

    ".header{" +
    "font-size: 5vh;"+
    "color: blue;"+
    "}"+

    ".SightNews{"+
    "width: 100%;"+
    "}"+

    ".date{"+
    "color: deeppink;"+
    "}"+

    ".img{"+
    "float: left;"+
    "}"+
    "</style>";

module.exports = {}
module.exports = function(html){

    var authorPosBeg = html.indexOf("<p>");
    var authorPosEnd = html.indexOf("</p>");

    var author = html.substring(authorPosBeg+3,authorPosEnd);
    html = html.substr(0,authorPosBeg+2)+ " class='author'"+html.substring(authorPosBeg+2);

    var headerPosBeg = html.indexOf("<p>",authorPosEnd+1);
    var headerPosEnd = html.indexOf("</p>",headerPosBeg);
    
    var header = html.substring(headerPosBeg+3,headerPosEnd).replace("<strong>","").replace("</strong>","");
    html = html.substr(0,headerPosBeg+2)+ " class='header'" + html.substring(headerPosBeg+2);

    var headPosDate = html.indexOf("<p>",headerPosBeg+1);
    html = html.substr(0, headPosDate + 2) + " class='date'" + html.substring(headPosDate + 2);

    var headPosImg = html.indexOf("<p>", headPosDate + 1);
    html = html.substr(0, headPosImg + 2) + " class='img'" + html.substring(headPosImg + 2);

    var headPosNews = html.indexOf("<p>", headPosImg + 1);
    html = html.substr(0, headPosNews + 2) + " class='SightNews'" + html.substr(headPosNews + 2);

    return {
        file: style + html,
        author : author,
        header : header
    };
}