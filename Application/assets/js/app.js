// Basic app controller js
var app = angular.module('myapp', []);
var view = document.getElementById('notes_get');
var head_n = document.getElementById('notes_head');
var body_n = document.getElementById('notes_area');
app.controller('Ctrl_form', function($scope) {
    $scope.email="";
    $scope.pswd="";
    $scope.fname = "";
    $scope.email_login= "" ;
    $scope.paswd = "";
    $scope.showfirst = true;
    $scope.loginshow = false;
    $scope.login = function(){
         $scope.showfirst = false;
         $scope.loginshow = true;
        };
    $scope.register = function(){
            $scope.showfirst = true;
            $scope.loginshow = false;
        };

   });
app.controller('Ctrl_retrieve_data', function($scope, $http){
    $http({
      method: "GET",
      url: "/view_data"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        $scope.name = $scope.object.name;
        $scope.emailid = $scope.object.email;
    },function myError(response){
        $scope.title = response.statusText;
    });  
});
app.controller('Ctrl_notes', function($scope, $http){
    $http({
      method: "GET",
      url: "/view_notes"
    }).then(function mySuccess(response){
        $scope.object = response.data;
        var len = $scope.object.length;
        for(var i = 0; i<len; i++){
          $scope.object[i].title = $scope.object[i].title.replace(/\n\r?/g, '<br/>');
          $scope.object[i].notes = $scope.object[i].notes.replace(/\n\r?/g, '<br/>');
          view.innerHTML += "<div class ='col-lg-6 col-md-6 col-sm-10 col-xs-12'><div class = 'w3-card-4 w3-white card'>" + $scope.object[i].title + "</div><div class = 'w3-card-4 w3-white card_notes'>" + $scope.object[i].notes +  "</div><a href = '/delete/:" + $scope.object[i]._id +  "'><button class = 'btn btn-danger btn-md delete' >Delete This Note</button></a><a href = '/update/:" + $scope.object[i]._id +  "'><button class = 'btn btn-info btn-md text-center update'>Update This Note</button></a></div>"; 
        }
    },function myError(response){
        $scope.title = response.statusText;
    });  
});
// For password validation
function passwordValidation(){
var str = document.getElementById("myInput").value;
var y = document.getElementById("write");
 if(str.length < 6){
    y.innerHTML = "too short";
   }
 else if (str.length >50){
    y.innerHTML  = "too long";
    }
 else if (str.search(/\d/) < 0) {
    y.innerHTML = "no number";
    }
 else if (str.search(/[a-z]/) < 0){
    y.innerHTML = "no small letter";
    }
 else if(str.search(/[A-Z]/) < 0 ){
    y.innerHTML = "no capital letter";
    }
 else
    y.innerHTML= " ";
}
$(document).ready(function(){
   $('.colors').click(function(){
      var bgcolor = $(this).css('background-color'); $('#notes_head').css("background-color", bgcolor);    
       $('#notes_area').css("background-color", bgcolor); 
   });
    $('.fontfamily').click(function(){
        var fontfamily = $(this).css('font-family');
        $("#notes_head").css('font-family',fontfamily);
        $("#notes_area").css('font-family',fontfamily);
    });
});
