/**
 * Created by User on 22.03.2017.
 */
app.controller("newsCntr",function($scope,$http,$sce){
    
    $scope.vocab = newsVocab;
    
    $scope.shieldMessage1 = "news";
    $scope.showShield = function(){
        if($scope.model.currentPreviewFile == "news/Tmp/empty.html") return;
        $scope.shieldMessage2 = $scope.model.fileBlob.name;
        var rec = $scope.model.wordFileInfo.destName;
        console.log(rec);
        if (!uploadedNews[rec]) {
            $scope.shieldMessage3 = "will be uploaded";
            $scope.model.shieldOK = shieldOK.ok;
        }else{
            $scope.shieldMessage3 = "seems to be uploaded already "+uploadedNews[rec]+" time(s)";
            $scope.model.shieldOK = shieldOK.uploadanyway;
        }

        $scope.model.showShield();
        
        $scope.articleAuthor="Vasia";
        $scope.article.Header;
        $scope.articleDate = moment().now();
        $scope,articleTags;

        $("articleDate").datepicker( $.datepicker.regional["he"]);
    }

    $scope.readNews = function(){

        $scope.model.fileBlob = event.target.files[0];
        if($scope.model.fileBlob == null)return;
        var filename = $scope.model.fileBlob.name;
        $scope.model.currentNewsFile = filename;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState != 4) return;
            /*$scope.model.wordFileInfo = JSON.parse(xhr.response);
            $scope.model.currentPreviewFile = $scope.model.wordFileInfo.destName;*/
            $scope.model.currentPreviewFile =  $sce.trustAsHtml(xhr.response);
            $scope.$apply();
            document.getElementById("fileInput").value = null;
        }
        
        xhr.open("POST",url+"/seeWord?fname="+filename);
        $scope.$apply();
        var fr = new FileReader();
        fr.onload = function(){
            xhr.send(fr.result);
        }
        fr.readAsArrayBuffer($scope.model.fileBlob);
    }


   $scope.uploadNews = function(){
        $http.post(url+"/uploadNews", JSON.stringify($scope.model.wordFileInfo)).then(function(res){
            var rec = res.data;
            console.log(rec);
            if (uploadedNews[rec]){
                uploadedNews[rec] = uploadedNews[rec]+1;
            }else{
                uploadedNews[rec] = 1;
            }
            $scope.model.shield = false;
        });
    }

    $scope.uploaded = function(){

        $scope.model.page = "news/uploadedNewsList.html";
        $scope.model.header = headers.uploadedNews;
    }
    
})
