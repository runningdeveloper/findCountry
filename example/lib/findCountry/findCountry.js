angular.module("findCountry", [])
.factory("findCountry", function($http, $q){

  var processLocation = function(lat, long, locationFile){
    console.log(lat + ' lon: ' +long);
    return $q(function(resolve, reject){
      $http.get(locationFile).then(function(list){
        var pt = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [long, lat]
          }
        };

        var result = _.find(list.data.features, function(country){
          if(turf.inside(pt, country) === true){
            return country;
          }
        });

        if(result === undefined){
          console.log('Error, no country found here');
          reject({error:'No country found'});
        }else{
          console.log('Name', result.properties.name);
          console.log('Region', result.properties.region_un);
          resolve({
            error: '',
            country: result.properties.name,
            region: result.properties.region_un
          });
        }
      }, function(error){
        console.log('list error', error);
        reject({error:'Cannot get countries.geojson file'});
      });
    });
  };

  var getIpLocation = function(){
    return $q(function(resolve, reject){
      $http.get('https://freegeoip.net/json/').then(function(result){
        console.log('ip', result.data);
        processLocation(result.data.latitude, result.data.longitude, locationFile).then(function(result){
          resolve(result);
        }, function(error){
          reject(error);
        });
      }, function(error){
        console.log('ip error', error);
        reject(error);
      });
    });
  };
  return {
    getLocation: function (locationFile) {
      return $q(function(resolve, reject){
        if(locationFile === undefined){
          locationFile = 'bower_components/findCountry/countries.geojson';
        }
        var browserLocation = function(position){
          processLocation(position.coords.latitude, position.coords.longitude, locationFile).then(function(result){
            resolve(result);
          }, function(error){
            reject(error);
          });
        };

        var browserLocationError = function(){
          //error user disabled or something else went wrong
          getIpLocation().then(function(result){
            resolve(result);
          }, function(error){
            reject(error);
          });
        };

        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(browserLocation, browserLocationError);
        } else {
          //browser does not support geolocation
          browserLocationError();
        }
      });
    }
  };
});
