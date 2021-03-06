function drawChart(chart,data,optionsFunction,config){
    chart.draw(data,optionsFunction(config));
    window.addEventListener("resize",chart.draw(data,optionsFunction(config)));
}

function haxis(){
    return {
        textStyle: {
            fontSize: rubberH(15),
            fontName: "Alef",
            color: "black"
        }
    }
}
function leg(){
    return {
        textStyle: {
            fontSize: rubberH(10),
            fontName: "Alef",
            color: "black"
        }
    }
}
function vaxis(){
    return {
        minValue : 0,
        textStyle: {
            fontSize: rubberH(15),
            fontName: "Alef",
            color: "black"
        }
    }
}
function titleTS(){
    return {
            color: "black",
            fontName: "Alef",
            fontSize: rubberH(20)
    }
}

var chartBack = "white";

function optionsKnesset() {

    var draft = {

        'width': Math.min(rubberW(800), 600),
        'height': rubberH(270),
        reverseCategories: true,
        backgroundColor: chartBack,
        hAxis: haxis(),
        vAxis: vaxis(),
        legend: "none",
        title: 'מנדטים',
        titleTextStyle: titleTS()
    }
    draft.vAxis.gridlines = {color:'transparent'};
    return draft;
}
function optionsKnessetTime() {

     var draft = {
        'width': Math.min(rubberW(1200), 900),
        'height': rubberH(300),
        chartArea: {bottom: rubberH(75)},
        reverseCategories: true,
        backgroundColor: chartBack,
        hAxis: haxis(),
        vAxis: vaxis(),
        legend: "none",
        title: "מנדטים",
        titleTextStyle: titleTS()
    }
    draft.vAxis.format = "##";
    return draft;
}

function optionsUpperTime(title) {
    
    var draft = {

        title : title,
        'width': Math.min(rubberW(800), 600),
        'height': rubberH(245),
        reverseCategories: true,
        backgroundColor: chartBack,
        hAxis: haxis(),
        vAxis: vaxis(),
        legend: leg(),
        series: {
            0: {color: '#ff8888'},
            1: {color: '#88ff88'},
            2: {color: '#8888ff'},
            3: {color: '#ffff88'},
            4: {color: '#ff88ff'},
            5: {color: '#88ffff'},
            6: {color: '#ff0000'}
        },
        titleTextStyle: titleTS()
    }
    draft.vAxis.format = 'percent';
    return draft;
}

function makeOptionsUpperTimeDetails(title,aspect){
    
    var draft = {

        title : title,
        'width': Math.min(rubberW(800), 600),
        'height': rubberH(245),
        reverseCategories: true,
        backgroundColor: chartBack,
        hAxis: haxis(),
        vAxis: vaxis(),
        legend: leg(),
        titleTextStyle: titleTS()
    }
    
    if(aspect) draft.vAxis.format = 'percent';
    return draft;
}


function makeOptions(size,title, legend, numFormat, reverse){

    var draft = {

        title : title,
        chartArea: {'width': '75%', 'height': '65%'},

        reverseCategories: true,
        backgroundColor: chartBack,
        hAxis : haxis(),
        vAxis : vaxis(),
        titleTextStyle: titleTS()
    }

    if(size == 'big'){draft.width = Math.min(rubberW(800),600); draft.height = rubberH(245); draft.chartArea = {'width': '70%', 'height': '65%'}}
    else if(size == 'small'){draft.width = Math.min(rubberW(440),330); draft.height = rubberH(157); 
                             draft.titleTextStyle.fontSize = rubberH(15);draft.hAxis.textStyle.fontSize = rubberH(10);}
    else if(size == 'front'){draft.width = Math.min(rubberW(450),340); draft.height = rubberH(250);
                             draft.chartArea={'width':'95%', 'height':'70%'}; draft.hAxis.textStyle.fontSize = rubberH(12);}

    if (legend){draft.legend = leg();}
    else draft.legend = "none";

    if(!numFormat)draft.vAxis.format = 'percent';
    if (reverse) draft.reverseCategories = false;

    return draft;
}
function makePieOptions(size,title, legend, reverse){

    var draft = {

        title : title,
        chartArea: {'width': '75%', 'height': '75%'},

        reverseCategories: true,
        backgroundColor: chartBack,
        pieSliceTextStyle : {
            fontName : "Alef",
            fontSize: rubberH(15)
        },
        titleTextStyle: titleTS()
    }

    if(size == 'big'){draft.width = Math.min(rubberW(800),600); draft.height = rubberH(245); draft.chartArea = {'width': '70%', 'height': '65%'}}
    else if(size == 'front'){draft.width = Math.min(rubberW(450),340); draft.height = rubberH(250); draft.chartArea={'width':'95%', 'height':'70%'}}

    if (legend){draft.legend = leg();}
    else draft.legend = "none";
    
    if (reverse) draft.reverseCategories = false;

    return draft;
}
function makeOptionsLowerTime(title, colors, numFormat) {

    draft = {

        title : title,

        'width': Math.min(rubberW(1366),1024),
        'height': rubberH(315),
        chartArea: {
            bottom: rubberH(75)
        },
        reverseCategories: true,
        backgroundColor: chartBack,
        hAxis: haxis(),
        vAxis: vaxis(),
        legend: leg(),
        titleTextStyle: titleTS()
    }

    if (colors){
        draft.series = {
            0: { color: 'red' },
            1: { color: 'green' },
            2: { color: 'yellow' },
            3: { color: 'blue' },
            4: { color: 'pink' },
            5: { color: 'orange' },
            6: { color: 'brown' }
        }
    }

    if(!numFormat)draft.vAxis.format = 'percent';

    return draft;
}

function rubberW(w){
    return $(window).width()/1366*w;
};
function rubberH(h){
    return $(window).height()/662*h;
};

var keyWordChart;
var keyWordLeaders;
var keyWordLeadersName;
var keyWordDetails;
var groupCharts;

var leaderColor = ["red","green","yellow","blue","pink","orange","brown"];
var knessetColor = ["red","lightblue","green","yellow","blue","pink","navy","orange","brown","lightgreen"]

function drawLeaders(keyWord) {

    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number','');
    data.addColumn({type:'string', role:'style'});

    var chData = [];
    var colorCounter = 0;
    for (var key in record.leaders){
        if (keyWord == 'primeMinister' || !(key == nobodyOfThem)) {
            var pair = [key, parseFloat(record.leaders[key][keyWord].all), leaderColor[colorCounter++]];
            chData.push(pair);
        }
    }
    data.addRows(chData);

    var formatter = new google.visualization.NumberFormat({pattern : "#%"});
    formatter.format(data, 1);

    var chart = new google.visualization.ColumnChart(document.getElementById('chart'));

    // small charts
    var smallCharts = [];
    google.visualization.events.addListener(chart, 'select', function(){

        if(chart.getSelection()[0] == undefined)return;

        var leaderName = chart.J.kc[chart.getSelection()[0].row][0].Cf;

        document.getElementById("smalls").style.display = "block";
        for (var group in groups) {
            
            var gr = new google.visualization.ColumnChart(document.getElementById(group));

            var tbl = new google.visualization.DataTable();
            tbl.addColumn('string', '');
            tbl.addColumn('number', '');
            tbl.addColumn({type:'string', role:'style'});

            var tData = []
            for (var key in record.leaders[leaderName][keyWord][group]) {
                var tPair = [categories[group][key],
                    parseFloat(record.leaders[leaderName][keyWord][group][key]), leaderColor[chart.getSelection()[0].row]];
                tData.push(tPair);
            }
            tbl.addRows(tData);

            var formatter = new google.visualization.NumberFormat({pattern : "#%"});
            formatter.format(tbl, 1);

            keyWordLeadersName = leaderName;

            titleRight(gr,group);
            gr.draw(tbl, makeOptions("small",leaderName + ", " + groups[group],false));
            smallCharts.push({
                ch : gr,
                tbl : tbl,
                title : leaderName + ", " + groups[group]
            })

        }
    });

    clearSmallTime();
    document.getElementById("smalls").style.display = "none";
    bigTFree();
    titleRight(chart,"chart");
    keyWordChart = 'leaders';
    keyWordLeaders = keyWord;
    chart.draw(data, makeOptions("big",leaderTitles[keyWord]+" "+ moment(record.date,"DD-MM-YYYY").format("DD MMM YYYY"),false));
    
    window.addEventListener("resize",function(){
        chart.draw(data, makeOptions("big",leaderTitles[keyWord]+" "+ moment(record.date,"DD-MM-YYYY").format("DD MMM YYYY"),false));
        for (var i in smallCharts){
            var sc = smallCharts[i];
            sc.ch.draw(sc.tbl, makeOptions("small",sc.title,false));
        }
    });

}
function drawLeadersDetails(keyWord) {

    var data = graphData();
    for (var i in categories[keyWord]) data.addColumn('number',categories[keyWord][i]);

    var chData = []
    for (var key in record.leaders){
        if (key != nobodyOfThem) {
            var pair = [];
            pair.push(key);
            for (var i in categories[keyWord]) pair.push(parseFloat(record.leaders[key][keyWord][categories[keyWord][i]].all));
            chData.push(pair);
        }
    }
    data.addRows(chData);

    if(keyWord == 'aspects') {
        var formatter = new google.visualization.NumberFormat({pattern: "#%"});
        for (var i = 1; i < data.getNumberOfColumns(); i++) formatter.format(data, i);
    }

    var chart = new google.visualization.ColumnChart(document.getElementById('chart'));

    // subCharts
    var smallCharts = [];
    keyWordDetails = keyWord;
    google.visualization.events.addListener(chart, 'select', function(){

        if(chart.getSelection()[0] == undefined || chart.getSelection()[0].row == null){
            keyWordLeadersName = undefined;
            return;
        }
        var leaderName = chart.J.kc[chart.getSelection()[0].row][0].Cf;
        keyWordLeadersName = leaderName;


        document.getElementById("smalls").style.display = "block";
        groupCharts = {};
        for (var group in groups) {

            var gr = new google.visualization.ColumnChart(document.getElementById(group));

            var tbl = new google.visualization.DataTable();
            tbl.addColumn('string', '');
            for (var i in categories[keyWordDetails]) tbl.addColumn('number',categories[keyWordDetails][i]);

            for (var i in categories[group]){
                var tData = [];
                tData.push(categories[group][i]);
                for (var j in categories[keyWordDetails]){;
                    tData.push(parseFloat(record.leaders[leaderName][keyWordDetails][categories[keyWordDetails][j]][group][i]));
                }
                tbl.addRow(tData);
            }
            if(keyWord == 'aspects') {
                var formatter = new google.visualization.NumberFormat({pattern: "#%"});
                for (var i = 0; i < tbl.getNumberOfColumns(); i++)formatter.format(tbl, i);
            }
            
            groupCharts[group] = gr;

            keyWordLeadersName = leaderName;

            titleRight(gr,group);
            gr.draw(tbl, makeOptions("small",leaderName + ", " + groups[group],false, keyWord != 'aspects'))
            smallCharts.push({
                gr : gr,
                tbl : tbl,
                title : leaderName + ", " + groups[group],
                nf : keyWord != 'aspects'
            })

        }
    });

    clearSmallTime();
    document.getElementById("smalls").style.display = "none";
    bigTFree();
    keyWordChart = 'leadersDetails';
    keyWordLeaders = keyWord;
    keyWordLeadersName = undefined;
    titleRight(chart, "chart");
    chart.draw(data, makeOptions("big",leaderTitles[keyWord]+" "+ moment(record.date,"DD-MM-YYYY").format("DD MMM YYYY"),true, keyWord != 'aspects'))

    window.addEventListener("resize",function(){
        chart.draw(data, makeOptions("big",leaderTitles[keyWord]+" "+ moment(record.date,"DD-MM-YYYY").format("DD MMM YYYY"),true, keyWord != 'aspects'));
        for (var i in smallCharts){
            var sc = smallCharts[i];
            sc.gr.draw(sc.tbl, makeOptions("small",sc.title,false,sc.nf));
        }
    });

}
function drawGovernment() {

    var data = new google.visualization.arrayToDataTable([
        ["", ""],
        ["כן", parseFloat(record.governmentSurvival.all) / 100],
        ["לא", 1 - parseFloat(record.governmentSurvival.all) / 100],

    ]);

    var formatter = new google.visualization.NumberFormat({pattern: "#%"});
    for (var i = 1; i < data.getNumberOfColumns(); i++)formatter.format(data, i);

    var chart = new google.visualization.PieChart(document.getElementById('chart'));

    // subCharts

    var smallCharts = [];

    document.getElementById("smalls").style.display = "block";
    for (var group in groups) {

        var gr = new google.visualization.ColumnChart(document.getElementById(group));

        var tbl = graphData();
        tbl.addColumn('number', '');

        for (var key in record.governmentSurvival[group]) {
            tbl.addRow([categories[group][key], parseFloat(record.governmentSurvival[group][key]) / 100]);
        }

        var formatter = new google.visualization.NumberFormat({pattern: "#%"});
        for (var i = 1; i < tbl.getNumberOfColumns(); i++)formatter.format(tbl, i);

        titleRight(gr, group);
        gr.draw(tbl, makeOptions("small", groups[group]));

        smallCharts.push({
            gr: gr,
            tbl: tbl,
            title: groups[group]
        })

    }

    keyWordChart = 'government';

    clearSmallTime();
    bigTFree();
    titleRight(chart, "chart");
    chart.draw(data, makePieOptions("big", gSurvival + " " + moment(record.date, "DD-MM-YYYY").format("DD MMM YYYY"), true,true));

    window.addEventListener("resize", function () {
        chart.draw(data, makePieOptions("big", gSurvival + " " + moment(record.date, "DD-MM-YYYY").format("DD MMM YYYY"), true,true));
        for (var i in smallCharts) {
            var sc = smallCharts[i];
            sc.gr.draw(sc.tbl, makeOptions("small", sc.title));
        }
    })
}

function drawImportantThings(){

    var rows = [];
    rows.push(["",""]);
    for (var key in record.importantThings){
        rows.push([key, parseFloat(record.importantThings[key].all)]);
    }
    var data = new google.visualization.arrayToDataTable(rows);

    var formatter = new google.visualization.NumberFormat({pattern : "#%"});
    for(var i=1; i<data.getNumberOfColumns(); i++)formatter.format(data,i);

    var chart = new google.visualization.PieChart(document.getElementById('chart'));

    // subCharts
    var smallCharts = [];
    document.getElementById("smalls").style.display = "block";
    groupCharts = {};
    for (var group in groups) {

        var gr = new google.visualization.ColumnChart(document.getElementById(group));

        var tbl = graphData();
        for (var i in categories.importantThings) tbl.addColumn('number','');

        for (var key in categories[group]) {
            var row = [];
            row.push(categories[group][key]);
            for (var i in categories.importantThings)
                row.push(parseFloat(record.importantThings[categories.importantThings[i]][group][key]));
            tbl.addRow(row);
        }

        var formatter = new google.visualization.NumberFormat({pattern : "#%"});
        for(var i=1; i<tbl.getNumberOfColumns(); i++)formatter.format(tbl,i);

        titleRight(gr,group);
        groupCharts[group] = gr;
        gr.draw(tbl, makeOptions("small",groups[group]));

        smallCharts.push({
            gr : gr,
            tbl: tbl,
            title : groups[group]
        })
    }

    clearSmallTime();
    bigTFree();
    keyWordChart = 'importantThings';
    titleRight(chart,"chart");
    chart.draw(data, makePieOptions("big",importantThings+" "+ moment(record.date,"DD-MM-YYYY").format("DD MMM YYYY"),true));

    window.addEventListener("resize",function(){
        chart.draw(data, makePieOptions("big",importantThings+" "+ moment(record.date,"DD-MM-YYYY").format("DD MMM YYYY"),true));
        for (var i in smallCharts){
            var sc = smallCharts[i];
            sc.gr.draw(sc.tbl, makeOptions("small",sc.title));
        }
    });
}
function drawKnesset(){

    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number','');
    data.addColumn({type:'string', role:'style'});
    data.addColumn({type:'string', role:'annotation'})

    var chData = [];
    var colorCounter = 0;
    for (var key in record.knesset){
        var pair = [key, parseFloat(record.knesset[key]), knessetColor[colorCounter++],record.knesset[key]];
        chData.push(pair);
    }
    data.addRows(chData);

    var chart = new google.visualization.ColumnChart(document.getElementById('chart'));

    document.getElementById("smalls").style.display = "none";

    clearSmallTime();
    titleRight(chart,"chart");
    bigTFree();
    keyWordChart = 'knesset';
    chart.draw(data, optionsKnesset());

    window.addEventListener("resize",function(){chart.draw(data, optionsKnesset());});

}

var drawTime = {
        leaders : drawLeadersTime,
        leadersDetails : drawLeadersDetailsTime,
        government : drawGovernmentTime,
        importantThings : drawImportantThingsTime,
        knesset : drawKnessetTime
}

function drawLowTime(){
    if (keyWordChart == undefined) return;
    drawTime[keyWordChart]();
}
function drawLeadersTime(){

    var data = new google.visualization.DataTable();
    var leadersArray = [];
    for (var i in recordsArray){
        for (var leader in recordsArray[i].leaders){
            if (!leadersArray.includes(leader))leadersArray.push(leader);
        }
    }

    data.addColumn('string','');
    for (var i in leadersArray){
        if (keyWordLeaders == 'primeMinister' || !(leadersArray[i] == nobodyOfThem)) {
            data.addColumn('number', leadersArray[i]);
        }
    }
    for (var i in recordsArray){
        var row = [];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        for (var l in leadersArray){
            if (keyWordLeaders == 'primeMinister' || !(leadersArray[l] == nobodyOfThem)){
                row.push(parseFloat(recordsArray[i].leaders[leadersArray[l]][keyWordLeaders].all));
            }
        }
        data.addRow(row);
    }
    
    var formatter = new google.visualization.NumberFormat({pattern : "#%"});
    for (var i=1; i< data.getNumberOfColumns(); i++)formatter.format(data, i);

    document.getElementById('time').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('time'));
    titleRight(chart,"time");
    chart.draw(data, makeOptionsLowerTime(leaderTitles[keyWordLeaders],true));
    window.addEventListener("resize", function(){chart.draw(data, makeOptionsLowerTime(leaderTitles[keyWordLeaders],true));});

}
function drawLeadersDetailsTime(){
    if(keyWordLeadersName == undefined) return;

    var data = new google.visualization.DataTable();
    
    var detailsArray = categories[keyWordDetails];
    data.addColumn('string','');
    for(var i in detailsArray)data.addColumn('number', detailsArray[i]);
    for(var i in recordsArray){
        var row = [];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        for (var d in detailsArray){
            row.push(parseFloat(recordsArray[i].leaders[keyWordLeadersName][keyWordDetails][detailsArray[d]].all));
        }
        data.addRow(row);
    }
    
    if(keyWordDetails == 'aspects') {
        var formatter = new google.visualization.NumberFormat({pattern: "#%"});
        for (var i = 1; i < data.getNumberOfColumns(); i++)formatter.format(data, i);
    }
    
    document.getElementById('time').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('time'));
    titleRight(chart,"time");
    chart.draw(data, makeOptionsLowerTime(keyWordLeadersName+", "+leaderTitles[keyWordDetails],true, keyWordDetails != 'aspects'));
    window.addEventListener("resize", function(){chart.draw(data, makeOptionsLowerTime(keyWordLeadersName+", "+leaderTitles[keyWordDetails],true, keyWordDetails != 'aspects'));});
}
function drawGovernmentTime(){

    var data = new google.visualization.DataTable();

    data.addColumn('string','');
    data.addColumn('number','כן');

    for (var i in recordsArray){
        var row = [];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        row[1] = parseFloat(recordsArray[i].governmentSurvival.all)/100;
        data.addRow(row);
    }

    var formatter = new google.visualization.NumberFormat({pattern : "#%"});
    for(var i=1; i<data.getNumberOfColumns(); i++)formatter.format(data,i);

    document.getElementById('time').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('time'));
    titleRight(chart,"time");
    chart.draw(data, makeOptionsLowerTime(gSurvival));
    window.addEventListener("resize", function(){chart.draw(data, makeOptionsLowerTime(gSurvival));});

}
function drawImportantThingsTime(){


    var data = new google.visualization.DataTable();
    var thingsArray = [];
    for (var i in recordsArray){
        for (var thing in recordsArray[i].importantThings){
            if (!thingsArray.includes(thing))thingsArray.push(thing);
        }
    }

    data.addColumn('string','')
    for (var i in thingsArray)data.addColumn('number', thingsArray[i]);

    for (var i in recordsArray){
        var row = [];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        for (var l in thingsArray){
            row.push(parseFloat(recordsArray[i].importantThings[thingsArray[l]].all));
        }
        data.addRow(row);
    }

    document.getElementById('time').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('time'));
    titleRight(chart,"time");
    chart.draw(data, makeOptionsLowerTime(importantThings));
    window.addEventListener("resize", function(){chart.draw(data, makeOptionsLowerTime(importantThings));});

}
function drawKnessetTime(){
    
    var data = new google.visualization.DataTable();
    var partiesArray = [];
    for (var i in recordsArray){
        for (var party in recordsArray[i].knesset){
            if (!partiesArray.includes(party))partiesArray.push(party);
        }
    }

    data.addColumn('string','')
    for (var i in partiesArray)data.addColumn('number', partiesArray[i]);

    for (var i in recordsArray){
        var row = [];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        for (var l in partiesArray){
            row.push(parseFloat(recordsArray[i].knesset[partiesArray[l]]));
        }
        data.addRow(row);
    }

    document.getElementById('time').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('time'));
    titleRight(chart,"time");
    var okT = optionsKnessetTime();
    okT.series = {}
    for (var i in knessetColor)okT.series[i] = {color : knessetColor[i]};
    chart.draw(data, okT);
    window.addEventListener("resize", function(){
        var o = optionsKnessetTime();
        o.series = {}
        for (var i in knessetColor)o.series[i] = {color : knessetColor[i]};
        chart.draw(data, o);});
    
}

var drawSmallTime = {
    leaders : drawSmallTimeLeaders,
    leadersDetails : drawSmallTimeLeadersDetails,
    government : drawSmallTimeGovernment,
    importantThings : drawSmallTimeImportantThings,
    
}

function smallTime(group){
    drawSmallTime[keyWordChart](group);
}
function drawSmallTimeLeaders(group){
    var data = new google.visualization.DataTable();
    data.addColumn('string','');
    for (var i in categories[group])data.addColumn('number',categories[group][i]);

    for (var i in recordsArray){
        var row=[];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        for (var j in categories[group]){
            row.push(parseFloat(recordsArray[i].leaders[keyWordLeadersName][keyWordLeaders][group][j]));
        }
        data.addRow(row);
    }

    var formatter = new google.visualization.NumberFormat({pattern : "#%"});
    for(var i=1; i<data.getNumberOfColumns(); i++)formatter.format(data,i);

    document.getElementById('upperTime').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('upperTime'));
    titleRight(chart,"upperTime");
    document.getElementById('bT').style.display = "none";
    chart.draw(data, optionsUpperTime(keyWordLeadersName+", "+leaderTitles[keyWordLeaders]+", "+groups[group]));
    window.addEventListener("resize", function(){
        chart.draw(data, optionsUpperTime(keyWordLeadersName+", "+leaderTitles[keyWordLeaders]+", "+groups[group]));
    })
}
function drawSmallTimeLeadersDetails(group){
    var selection = groupCharts[group].getSelection()[0];
    if (selection == undefined) return;

    var detail = categories[keyWordDetails][selection.column - 1];

    var data = new google.visualization.DataTable();
    data.addColumn('string','');
    for (var i in categories[group])data.addColumn('number',categories[group][i]);

    for (var i in recordsArray){
        var row=[];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        for (var j in categories[group]){
            
            row.push(parseFloat(recordsArray[i].leaders[keyWordLeadersName][keyWordDetails][detail][group][j]));
        }
        data.addRow(row);
    }
    if(keyWordDetails == 'aspects') {
        var formatter = new google.visualization.NumberFormat({pattern: "#%"});
        for (var i = 1; i < data.getNumberOfColumns(); i++)formatter.format(data, i);
    }
    
    document.getElementById('upperTime').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('upperTime'));
    titleRight(chart,"upperTime");
    document.getElementById('bT').style.display = "none";
    chart.draw(data, makeOptionsUpperTimeDetails(keyWordLeadersName+", "+detail+", "+groups[group],keyWordDetails == 'aspects'));

    window.addEventListener("resize", function(){
        chart.draw(data, makeOptionsUpperTimeDetails(keyWordLeadersName+", "+detail+", "+groups[group],keyWordDetails == 'aspects'));
    })
}
function drawSmallTimeGovernment(group){
    var data = new google.visualization.DataTable();
    data.addColumn('string','');
    for (var i in categories[group])data.addColumn('number',categories[group][i]);

    for (var i in recordsArray){
        var row=[];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        for (var j in categories[group]){
            row.push(parseFloat(recordsArray[i].governmentSurvival[group][j])/100);
        }
        data.addRow(row);
    }

    var formatter = new google.visualization.NumberFormat({pattern : "#%"});
    for(var i=1; i<data.getNumberOfColumns(); i++)formatter.format(data,i);

    document.getElementById('upperTime').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('upperTime'));
    
    titleRight(chart,"upperTime");
    document.getElementById('bT').style.display = "none";
    chart.draw(data, optionsUpperTime(gSurvival+", "+groups[group]));
    window.addEventListener("resize", function(){
        chart.draw(data, optionsUpperTime(gSurvival+", "+groups[group]));
    })
}
function drawSmallTimeImportantThings(group){
    var selection = groupCharts[group].getSelection()[0];
    if (selection == undefined) return;
    
    var thing = categories.importantThings[selection.column-1];

    var data = new google.visualization.DataTable();
    data.addColumn('string','');
    for (var i in categories[group])data.addColumn('number',categories[group][i]);

    for (var i in recordsArray){
        var row=[];
        row[0] = moment(recordsArray[i].date,"DD/MM/YYYY").format("DD MMM YYYY");
        for (var j in categories[group]){
            row.push(parseFloat(recordsArray[i].importantThings[thing][group][j]));
        }
        data.addRow(row);
    }

    var formatter = new google.visualization.NumberFormat({pattern : "#%"});
    for(var i=1; i<data.getNumberOfColumns(); i++)formatter.format(data,i);

    document.getElementById('upperTime').style.display = "block";
    var chart = new google.visualization.LineChart(document.getElementById('upperTime'));
    titleRight(chart,"upperTime");
    document.getElementById('bT').style.display = "none";
    chart.draw(data, optionsUpperTime(importantThings+", "+thing+", "+groups[group]));
    window.addEventListener("resize", function(){
        chart.draw(data, optionsUpperTime(importantThings+", "+thing+", "+groups[group]));
    })
}

function clearSmallTime(){
    document.getElementById('upperTime').style.display = "none";
    document.getElementById('bT').style.display = "block";
    clearSmallT();
}
function bigTToggleMouseout(){
    var bt = document.getElementById("bT");
    if (bt.onmouseout != null){
        bt.onmouseover = null;
        bt.onmouseout = null;
    }else{
        bt.onmouseover = drawLowTime;
        bt.onmouseout = closeLowTime;
    }
    bt.classList.toggle("redT")
}
function bigTFree(){
    var bt = document.getElementById("bT");
    bt.onmouseover = drawLowTime;
    bt.onmouseout = closeLowTime;
    bt.classList.remove("redT");
    closeLowTime();
    bt.style.display = "block";
}
function closeLowTime(){
    document.getElementById('time').style.display = "none";
}
function titleRight(chart, id){
    google.visualization.events.addListener(chart, 'ready', function(){
        var txt = $("#"+id+" svg g text").first();
        var rect = $("#"+id+" svg g rect").first();
        txt.attr("x",parseInt(rect.attr("x"))+rect.width());
        txt.attr("text-anchor","end");
    });
}

function clearSmallT(){
    var smalls = $("#smalls").children();
    for (var i=0; i<smalls.length; i++){
        var smt = smalls[i].lastElementChild;
        smt.classList.remove("notSeen");
        smt.classList.remove("redT");
        smt.onmouseover = function(){smallTime(this.data)};
        smt.onmouseout = function(){clearSmallTime()};
    }
}

function setSmalls(){
    
    document.getElementById("smalls").style.display = "none";
    var smalls = $("#smalls").children();
    for (var i=0; i<smalls.length; i++){
        var sm = smalls[i];
        var smt = sm.lastElementChild;
        smt.data = sm.firstElementChild.id;
        smt.onclick = function(){
            for(var j=0; j<smalls.length; j++){
                var s=smalls[j];
                if (s.firstElementChild.id != this.data)s.lastElementChild.classList.toggle("notSeen");
                else {
                    this.classList.toggle("redT");
                    if (this.onmouseover == null){
                        this.onmouseover = function(){smallTime(this.data)};
                        this.onmouseout = function(){clearSmallTime()};
                    }
                    else{
                        this.onmouseover = null;
                        this.onmouseout = null;
                    }
                }
            }
        }
        smt.onmouseover = function(){smallTime(this.data)};
        smt.onmouseout = function(){clearSmallTime()};
    }
}

function graphData(){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    return data;
}


