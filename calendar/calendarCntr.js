/**
 * Created by User on 20.03.2017.
 */
app.controller("calendarCntr",function($scope, $http){
    $scope.showDate = "";
    $scope.showSubj = "";

    var cDate;
    $scope.currDate = function(d){
        cDate = d.day;
        $scope.showDate = d.day.format("dd DD MMM");
        $scope.showSubj = d.event;
    }

    moment.locale();
    
    var currMoment = moment();
    setCalendar(currMoment);

    $scope.month = moment().format("MMM");
    $scope.year = moment().format("YYYY");
    
    var headDays; 

    function setCalendar(mom) {

        $scope.month = mom.format("MMM");
        $scope.year = mom.format("YYYY");

        var begin = mom.clone().startOf('month');
        headDays = begin.weekday();
        begin.subtract(headDays,"day");
        var end = mom.clone().endOf('month');
        end.add((6 - end.weekday()), "day");
        var differ = end.diff(begin, 'days');

        $http.get(url+"/events/getdays?from="+begin.format("YYYY-MM-DD")+"&to="+end.format("YYYY-MM-DD")).then(function(res) {

            var ev = [];
            for (var key in res.data) {
                ev.push({
                    date: moment(res.data[key].date),
                    event: res.data[key].event
                })
            }

            $scope.weeks = [];
            for (var w = 0; w < differ / 7; w++) {
                var week = [];

                for (var i = 0; i < 7; i++) {
                    var d = {};
                    d.day = begin.clone();
                    var index = contains(ev, d.day);
                    if (index >= 0) {
                        d.event = ev[index].event;
                        d.fill = true;
                    }
                    else {
                        d.event = "";
                        d.fill = false;
                    }
                    begin.add(1, 'day');
                    week.push(d);
                }
                $scope.weeks.push(week);
            }
        })
    }

    function contains(events, mom){
        for (var i=0; i<events.length; i++){
            if (events[i].date.diff(mom,'days') == 0) return i;
        }
        return -1;
    }

    $scope.upload = function(){
        if(cDate == undefined) return;
        if($scope.showDate == "") return;

        $http.get(url+"/events/upload?date="+cDate.format("YYYY-MM-DD")+"&event="+$scope.showSubj).then(function() {
            setCalendar(currMoment);});
    }

    $scope.yearMinus = function () {
        currMoment.subtract(1, "year");
        setCalendar(currMoment);
    }
    $scope.yearPlus = function () {
        currMoment.add(1, "year");
        setCalendar(currMoment);
    }
    $scope.monthMinus = function () {
        currMoment.subtract(1, "month");
        setCalendar(currMoment);
    }
    $scope.monthPlus = function () {
        currMoment.add(1, "month");
        setCalendar(currMoment);
    }

    $scope.dayFormat = function (date) {
        return date.format("dd DD MMM");
    }
    $scope.isToday = function (mom) {
        return moment().isSame(mom, 'day')
    };
    $scope.isShabat = function(mom){
        return mom.weekday() == 6;
    }
    
    $scope.viewPages = ['sight/SightCalendar/month.html','sight/SightCalendar/week.html','sight/SightCalendar/day.html'];
    $scope.viewCode = 0;
    $scope.changeView = function(code,pIndex, index){
        console.log(pIndex+";"+index);
        $scope.viewCode = code;
    }
    
    var hcode = [0, 10.5, 73];
    var listener = [true,true,true];
    $scope.scrollContainer = function(code){
        setTimeout(function() {
            var cont = document.getElementById("daysContainer");
            if(code == 1)cont.scrollTop = $(window).height() * hcode[code] / 100 * (currMoment.date() + headDays - 4);
            if(code == 2)cont.scrollTop = $(window).height() * hcode[code] / 100 * (currMoment.date() + headDays - 1);
            window.addEventListener("resize", function(){
                if(code == 0 && listener[0]) listener[0] = false;
                if(code == 1 && listener[1]){
                    cont.scrollTop = $(window).height() * hcode[code] / 100 * (currMoment.date() + headDays - 4);
                    listener[1] = false;
                }
                if(code == 2 && listener[2]){
                    cont.scrollTop = $(window).height() * hcode[code] / 100 * (currMoment.date() + headDays - 1);
                    listener[2] = false;
                }
            })
        },100);
    }
    
    
})