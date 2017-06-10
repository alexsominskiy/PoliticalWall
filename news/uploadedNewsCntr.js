/**
 * Created by User on 23.03.2017.
 */
app.controller("uploadedNewsCntr", function($scope,$http) {
    $scope.back = function () {
        $scope.model.page = "news/news.html";
        $scope.model.headers = headers.news;
    }

    var fileToRemove;
    $scope.shieldMessage1 = "news"
    $scope.setShield = function(ind){
        $scope.shieldMessage2 = $scope.newsList[ind].date_time+"_"+$scope.newsList[ind].header
        $scope.shieldMessage3 = "will be removed";
        $scope.model.shieldOK = shieldOK.ok;
        fileToRemove = ind;
        $scope.model.showShield();
    }

    $scope.previewFile = "UploadedNews/empty.html";
    $scope.sightPreviewFile = function(){
        return $scope.model.newspage;}
    $scope.newsList = [];
    
    $http.get(url+"/getNews").then(function(res){
        $scope.newsList = res.data.reverse();
        if ($scope.newsList.length != 0)$scope.previewFile=$scope.newsList[0].url;
    })

   $scope.setShowIndex = function(ind){
        $scope.previewFile=$scope.newsList[ind].url;
        $scope.model.newspage=$scope.newsList[ind].url;
    }

    $scope.date = function(date){return date.substring(0,10)}
    $scope.time = function(date){return date.substring(11)}
    $scope.shortDate = function(date) {return moment(date,"YYYY-MM-DD_HH-mm-ss").format("DD/MM/YYYY")};
    $scope.cut5 = function(str){return str.substring(0,str.length-5)};

    $scope.newsAuthor = "";
    $scope.newsSubject="";
    $scope.newsSearchObject= function(){
        return {
            author : $scope.newsAuthor,
            header : $scope.newsSubject
        }
    }
    
    $scope.dateBefore = "";
    $scope.dateAfter = "";
    
})
app.filter('dateRange', function() {
        return function(items, startDate, endDate) {
            
            var sDate = moment(startDate).format("DD/MM/YYYY") || moment("01/01/1900").format("DD/MM/YYYY");
            var eDate = moment(endDate).format("DD/MM/YYYY") || moment("01/01/2100").format("DD/MM/YYYY");
            
            console.log(startDate);

            //you need support for array.prototype.filter and arrow functions; i.e. IE sucks/needs a polyfill   
            return items.filter(function(item){return moment(item.date_time).isBetween(sDate, eDate)});
        }
    })
