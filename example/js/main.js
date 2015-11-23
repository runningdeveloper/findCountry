var app = angular.module("testApp", ['findCountry']);

app.controller("MainCtrl", function($scope, findCountry) {
  $scope.hello = "hello";
  findCountry.getLocation('lib/findCountry/countries.geojson').then(function(result){
    console.log('worked', result);
    $scope.data = result;
  }, function(error){
    console.log('failed', error);
    $scope.data = error;
  });
});
