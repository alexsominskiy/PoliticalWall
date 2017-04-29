/**
 * Created by User on 21.03.2017.
 */
var recordsArray = [];
var record;
var textFile;

app.controller("chartsCntr",function($scope,$http){

    if(!$scope.model.sight)google.charts.load('current', {'packages':['corechart']});
    if($scope.model.sight){
        recordsArray = $scope.model.recordsSight.records;
        record = $scope.model.recordsSight.records[$scope.model.recordsSight.pos];
        google.charts.setOnLoadCallback(drawLeaders('total'));
    }

    if(!$scope.model.sight)$http.get(url+"/getRecords").then(function(res){
        var sheetsArray = res.data;
        for (var i in sheetsArray){
            recordsArray.push(sheetToRecord(sheetsArray[i]));
        }
    }, function(err){console.log(err)});

    $scope.shieldMessage1 = "sheet";
    $scope.showShield = function(){
        $scope.shieldMessage2 = $scope.model.currentChartFile;
        if(!uploadedCharts[$scope.model.currentChartFile]){
            $scope.shieldMessage3 = "will be uploaded";
            $scope.model.shieldOK = shieldOK.ok;
        }
        else{
            $scope.shieldMessage3 = "seems to be uploaded already "+uploadedCharts[$scope.model.currentChartFile]+" time(s)";
            $scope.model.shieldOK = shieldOK.uploadanyway;
        }
        $scope.model.showShield();
    }

    $scope.changeRecord= function(i){
        record = $scope.model.recordsSight.records[i];
        $scope.model.recordsSight.pos = i;
        google.charts.setOnLoadCallback(drawLeaders('total'));
    }

    $scope.readChart = function(){

        var blob = event.target.files[0];
        $scope.model.currentChartFile = blob.name;
        $scope.$apply();

        var fr = new FileReader(blob);
        fr.onload = function(){
            textFile = fr.result.toString();
            record = sheetToRecord(textFile);
            recordsArray.push(record);
        }
        fr.readAsText(blob);
    };

    $scope.uploadChart = function(){

        $http.post(url+"/uploadChart?fdate="+moment(record.date,"DD/MM/YYYY").format("DD-MM-YYYY"), textFile).then(function(res){
            var rec = $scope.model.currentChartFile;
            if (uploadedCharts[rec]){
                uploadedCharts[rec] = uploadedCharts[rec]+1;
            }else{
                uploadedCharts[rec] = 1;
            }
            $scope.model.shield = false;
        });
    }

    $scope.recordHeader = function(rec){return "record_"+moment(rec.date,"DD/MM/YYYY").format("DD-MM-YYYY");}

    setSmalls();
    
})