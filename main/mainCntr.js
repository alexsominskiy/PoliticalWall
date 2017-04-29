/**
 * Created by User on 20.03.2017.
 */
app.controller("mainCntr",function($scope,$http){
    $scope.loader = function(dir){
        $scope.model.page = dir+"/"+dir+".html";
        $scope.model.header = headers[dir];
    }
    
    
})