'use strict';

angular.module('workspaceApp')
  .controller('MypollsCtrl', function ($scope, $http, User, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    $http.get('api/polls/all/' + $scope.getCurrentUser()._id).success(function(Polls){
      $scope.polls = Polls;
    });
    
    $scope.deletePoll = function(apoll) {
      $http.delete('/api/polls/' + apoll._id).success(function(){
        $http.get('/api/polls/all/' + $scope.getCurrentUser()._id).success(function(Polls) {
          $scope.polls = Polls;
        });
      });
    };
    
    $scope.spinalCase = function(str) {
       var valid='abcdefghijklmnopqrstuvwxyz1234567890';
       var caps='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
       //var space='_ -';
       var newStr = '';
       for (var i = 0; i< str.length; i++) {
         if (caps.indexOf(str[i]) !== -1) {
           if (i !== 0 && newStr[newStr.length-1] !== '-') {
             newStr+='-';
           }
           newStr+=str[i].toLowerCase();
         } else if (valid.indexOf(str[i])===-1) {
           if (str[i]===' ' || str[i]==='_' || str[i] === '-') {
             newStr+='-';
           }
         } else { newStr+=str[i]; }
       }
       return newStr;
     };
     
  });