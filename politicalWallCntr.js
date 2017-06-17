/**
 * Created by User on 20.03.2017.
 */
/*var url="http://127.0.0.1:8080";*/
var url ="https://politicalwallproject.herokuapp.com";

var headers = {
    authentication : "authentication",
    main : "data loader",
    charts : "charts loader",
    calendar : "events loader",
    news : "news loader",
    uploadedCharts : "uploaded charts",
    uploadedNews : "uploaded news"
}

var shieldOK = {
    ok : "OK",
    uploadanyway : "Upload anyway"
}
var shieldCancel = {
    cancel : "Cancel"
}

var uploadButton = "upload";

var uploadedCharts = {};
var uploadedNews = {};

var app = angular.module("politicalWall",[])
    .controller("politicalWallCntr",function($scope,$filter,$sce){

        $scope.model = {};
        $scope.model.showUpload = true;

        $scope.model.page = "authentication/auth.html";
        $scope.model.token;
        $scope.model.header = headers.authentication;
        $scope.model.uploadButton = uploadButton;
        
        $scope.model.shield = false;
        $scope.model.shieldOK = shieldOK.ok;
        $scope.model.shieldCancel = shieldCancel.cancel;

        $scope.model.showShield = function(){$scope.model.shield = true;}
        $scope.model.removeShield = function(){
            $scope.model.shieldOK = shieldOK.ok;
            $scope.model.shield = false;
        }

        $scope.model.back = function(){
            $scope.model.page = "main/main.html";
            $scope.model.header = headers['main'];
        }
        $scope.model.toolsPanel = true;
        $scope.model.newsTools = true;
        
        
        $scope.model.currentNewsFile = "empty.docx";
        $scope.model.currentPreviewFile = $sce.trustAsHtml("");

        $scope.model.currentChartFile = "empty.txt";
        
        $scope.model.chartBlob = null;
        $scope.model.fileBlob = null;
        
    })
    .directive('customOnChange', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    })
   
    


