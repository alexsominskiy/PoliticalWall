
/*var url = "http://127.0.0.1:8080";*/
var url ="https://politicalwallproject.herokuapp.com";

var app = angular.module("politicsMain",[]);
app.controller("politicsMainCntr",['betweenFilter',function($scope,$window,$http){
    
    $scope.hebVocab = vocab;

    $scope.model = {};
    $scope.model.showUpload = false;

    $scope.page = "";
    $scope.main = true;

    var news;
    $http.get(url+"/getNews").then(function(res){
        var newsArray = res.data.reverse();
        news = [];
        for (var i in newsArray){
            var n = {};
            n.date = moment(newsArray[i].date_time,"YYYY-MM-DD_HH-mm-ss").format("DD-MM-YYYY")+'  ';
            n.header = newsArray[i].header;
            n.author = newsArray[i].author;
            n.page = newsArray[i].url;
            news.push(n);
        }
        $scope.news = news;
        $scope.model.newspage = $scope.news[0].page;
        $scope.model.newspage1 = $scope.news[1].page;
        $scope.model.newspage2 = $scope.news[2].page;
    })
    
    $scope.details = function(p){$scope.model.newspage = p;}

    var recordsArray = [];
    var record;
    $scope.model.recordsSight={records : recordsArray, pos : 0}
    $scope.model.sight = true;
    $http.get(url+"/getRecords").then(function(res){
        var sheetsArray = res.data;
        for (var i in sheetsArray){
            recordsArray.unshift(sheetToRecord(sheetsArray[i]));
        }
        record = recordsArray[0];
        
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawLeadersFront);
        google.charts.setOnLoadCallback(drawImportantThingsFront);
    }, function(err){console.log(err)});
    
    function drawLeadersFront() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', '');
        data.addColumn('number','');
        data.addColumn({type:'string', role:'style'});

        var chData = [];
        var colorCounter = 0;
        for (var key in record.leaders){
            if (key != nobodyOfThem) {
                var pair = [key, parseFloat(record.leaders[key].total.all),leaderColor[colorCounter++]];
                chData.push(pair);
            }
        }
        data.addRows(chData);

        var formatter = new google.visualization.NumberFormat({pattern : "#%"});
        for(var i=1; i<data.getNumberOfColumns(); i++)formatter.format(data,i);

        var chart = new google.visualization.ColumnChart(document.getElementById('upper'));
        titleRight(chart,"upper");
        chart.draw(data, makeOptions("front",leaderTitles['total']));
        
        window.addEventListener("resize", function(){chart.draw(data, makeOptions("front",leaderTitles['total']));});
        
    }

    function drawImportantThingsFront(){

        var rows = [];
        rows.push(["",""]);
        for (var key in record.importantThings){
            rows.push([key, parseFloat(record.importantThings[key].all)]);
        }
        var data = new google.visualization.arrayToDataTable(rows);

        var chart = new google.visualization.PieChart(document.getElementById('lower'));

        titleRight(chart,"lower");
        chart.draw(data, makePieOptions("front",importantThings,true,true));

        window.addEventListener("resize", function(){chart.draw(data, makeOptions("front",importantThings,true,true));});

    }

    moment.locale();

    $scope.month = moment().format("MMM");
    $scope.year = moment().format("YYYY");
    $scope.days = [];


    setCalendar(moment());
    
    $scope.scrollCalendar = function(){
        var cont = document.getElementById("cont");
        cont.scrollTop = (cont.firstElementChild.offsetHeight) * (moment().date() - 1)+2;
    }

    $scope.currMoment = moment();

    function setCalendar(mom) {

        $scope.month = mom.format("MMM");
        $scope.year = mom.format("YYYY");

        var begin = mom.clone().startOf('month').subtract(3, 'day');
        var memory = begin.clone();
        var end = mom.clone().endOf('month').add(3, 'day');

        var differ = end.diff(begin, 'days');

        $scope.days = [];
        for (var i = 0; i <= differ; i++) {
            var d = {};
            d.day = begin.clone();
            d.event = "";
            $scope.days.push(d);
            begin.add(1, 'day');
        }
        begin = memory.clone();

        $http.get(url+"/events/getdays?from="+begin.format("YYYY-MM-DD")+"&to="+end.format("YYYY-MM-DD")).then(function(res){
            for (var i in res.data){
                var eventDate = res.data[i].date;
                for (var j in $scope.days){
                    if (eventDate == $scope.days[j].day.format("YYYY-MM-DD")){
                        $scope.days[j].event = res.data[i].event;
                    }
                }
            }
        })
    }



    $scope.yearMinus = function(){
        $scope.currMoment.subtract(1,"year");
        setCalendar($scope.currMoment);
    }
    $scope.yearPlus = function(){
        $scope.currMoment.add(1,"year");
        setCalendar($scope.currMoment);
    }
    $scope.monthMinus = function(){
        $scope.currMoment.subtract(1,"month");
        setCalendar($scope.currMoment);
    }
    $scope.monthPlus = function(){
        $scope.currMoment.add(1,"month");
        setCalendar($scope.currMoment);
    }


    $scope.dayFormat = function(date){return date.format("dd DD MMM");}
    $scope.isToday = function(mom){return moment().isSame(mom,'day')};
    $scope.isShabat = function(mom){return mom.weekday() == 6;}
    
    $scope.openMain = function(){$scope.main = true;}

    $scope.openCalendar = function(){
        $scope.main = false;
        $scope.page = "sight/SightCalendar/calendar1.html";
    }
    $scope.openNews = function(){
        $scope.main = false;
        $scope.page = "sight/SightNews/uploadedNews.html";
    }

    $scope.openCharts = function(){
        $scope.main = false;
        $scope.page = "sight/SightCharts/charts.html";
    }
}])
    .directive("skewlabelright", function(){
        return {
            template: '<div class="wrap pointer">'+
                            '<div class="lab"></div>'+
                            '<div class="diag">'+
                                '<div class="diag1"></div>'+
                            '</div>'+
                       '</div>',
            link : function(scope,element,attr){
                var txt = '<span class="glyphicon glyphicon-resize-full"></span>';
                element.find(".lab").html(scope.$eval(attr.header)+" "+txt)
            }
        }
    })
    .filter("between",function($scope){return function(arr){
        console.log(moment($scope.dateBefore,"DD/MM/YYYY"));
        return arr;
    }})
