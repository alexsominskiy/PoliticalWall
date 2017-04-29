/**
 * Created by User on 20.03.2017.
 */
app.controller("authCntr", function($scope,$http,$timeout){
    $scope.login = "";
    $scope.psw = "";

    $scope.signIn = function(){
        var au = {};
        au.login = $scope.login;
        au.psw = $scope.psw;
        $http.post(url+"/auth",JSON.stringify(au))
            .then(
                function(res) {
                    if (res.data == "-1"){
                        $scope.result = "Wrong login-password pair";
                        $timeout(function() {
                            $scope.login = "";
                            $scope.psw = "";
                            $scope.result = "";
                        }, 3000)
                    }
                    else {
                        $scope.model.token = res.data;
                        $scope.result = "authentication complete";
                        $timeout(function() {
                            $scope.model.page = "main/main.html";
                            $scope.model.header = headers.main;
                        }, 1000)
                    }
                },
                function(err){$scope.result = "Authentification error"})
    }
})