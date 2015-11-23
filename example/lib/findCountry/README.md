# Find Country

**Angular factory to get the country and region for a website visitor**

Simple Angular factory that uses built in browser location methods to get the visitors location or reverts to getting the visitors location from their IP address using [https://freegeoip.net/](https://freegeoip.net/). Then it searches a geojson file containing countries boarders to find out which country your visitor is coming from. It uses promises because they are cool right.
I got the geojson country file from [https://github.com/datasets/geo-boundaries-world-110m](https://github.com/datasets/geo-boundaries-world-110m)

## Dependencies

- angularjs
- turf
- lodash

## Install

Install with bower

```
bower install findCountry --save
```

Add the dependencies to your page

```
<script src="bower_components/turf/turf.min.js"></script>
<script src="bower_components/lodash/lodash.min.js"></script>
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/findCountry/findCountry.js"></script>
```

## Example

See the example folder

Install and then use it like so:
NB - you need to provide the location of the counties.geojson file as an argument otherwise it will default to 'bower_components/findCountry/countries.geojson'

```
var app = angular.module("testApp", ['findCountry']);

app.controller("MainCtrl", function($scope, findCountry) {
  $scope.hello = "hello";
  findCountry.getLocation('bower_components/findCountry/countries.geojson').then(function(result){
    console.log('worked', result);
    $scope.data = result;
  }, function(error){
    console.log('failed', error);
    $scope.data = error;
  });
});
```

### Example Response

If it worked:

```
{
  "error": "",
  "country": "South Africa",
  "region": "Africa"
}
```

If it failed, like if you visiting from the ocean:

```
{
  "error": "No country found"
}
```

## TODO

- Tests (find another geojon file with capital cities to make sure it works for all the main areas)
