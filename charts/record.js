/**
 * Created by User on 28/03/2017.
 */
function Record(lines){
    
    this.date = lines[1][0];

    // leaders

    var leaders = {};
    var line=1;
    while(lines[line][1] == "מדד המנהיגים"){

        var lName = lines[line][3];
        leaders[lName] = {};

        leaders[lName].name = lName;                                           // leader's name
        leaders[lName].total = new Opignions(lines[line].slice(5));                  //leader's total
        leaders[lName].aspects = {};
        leaders[lName].characteristics = {};

        line = line+3;
    }
    leaders["אף אחד מהם"] = {};
    leaders["אף אחד מהם"].name = "אף אחד מהם";

    //leaders' by aspects

    while(lines[line][1] == "הסכמה עם התנהלות בנושאים"){
        leaders[lines[line][2]].aspects[lines[line][3]] = new Opignions(lines[line].slice(5));
        line = line+3;
    }

    //leaders' by characteristics

    while(lines[line][1] == "תכונות"){
        leaders[lines[line][3]].characteristics[lines[line][2]] = new Opignions(lines[line].slice(5));
        line = line+1;
    }

    //leaders' prime minister chances

   while(lines[line][1] == "מדד רוהמ"){
        leaders[lines[line][3]].primeMinister = new Opignions(lines[line].slice(5));
        line++
    }

    this.leaders = leaders;

    // important things

    var importantThings = {};
    while(lines[line][1] == "הנושאים החשובים"){
        importantThings[lines[line][3]] = new Opignions(lines[line].slice(5));
        line++;
    }

    this.importantThings = importantThings;

    // government survival

    this.governmentSurvival = new Opignions(lines[line].slice(5));
    line++;

    var knesset={};
    while(line<lines.length && lines[line][1] == "מנדטים להיום"){
        knesset[lines[line][3]] = lines[line][5];
        line++;
    }
    this.knesset = knesset;
    
}

function Opignions(array){
    this.all = array[0];
    this.gender = array.slice(1,3);
    this.age = array.slice(3,7);
    this.region = array.slice(7,12);
    this.religion = array.slice(12,16);
    this.income = array.slice(16,19);
    this.education = array.slice(19,22);
}

function sheetToRecord(res){
    var lines = res.split("\n");
    for(var key in lines){
        lines[key] = lines[key].split("\t");
    }
    return new Record(lines);
}

