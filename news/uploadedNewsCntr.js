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
    
    var hotIndex = -1;
    $http.get(url+"/getNews").then(function(res){
        $scope.newsList = res.data.reverse();
        if ($scope.newsList.length != 0)$scope.previewFile=$scope.newsList[0].url;

    })
    
    
    
    // $scope.removeFile = function(){
    //     $http.get(url+"/removeNews?id="+$scope.newsList[fileToRemove].date_time).then(function(res){
    //         $scope.newsList.splice(fileToRemove,1);
    //         if($scope.newsList.length != 0){
    //             $scope.previewFile=$scope.newsList[0].url.substring(3);
    //         }
    //         else $scope.previewFile="../UploadedNews/empty.html";
    //         $scope.model.removeShield();
    //     })
    // }


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
.filter("datebetween",function($scope){return function(arr){
    console.log(moment($scope.dateBefore,"DD/MM/YYYY"));
    return arr;
}})