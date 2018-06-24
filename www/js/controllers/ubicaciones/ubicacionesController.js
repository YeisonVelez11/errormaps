tinApp.controller('ubicacionesController', function($scope,$state,ionicpopup,$ionicHistory,$ionicLoading,$stateParams,$timeout,$ionicSideMenuDelegate,$ionicScrollDelegate,http,utilidades,SERVICES_wEB,$localStorage ) {


  var myLocation= {"lat": 4.624335, "lng": -74.063644};
  var geolocation=true;
 
  var circle=null;
  var markerCluster =null;
  var search_without_geo=false;

  var myLocation= {"lat": 4.624335, "lng": -74.063644};
  var mapDiv = document.getElementById("map_canvas");
  var options = {

      'camera': {
          'target': myLocation,
          'zoom': 18
      },
      'gestures': {
      'tilt': false,
      'rotate': false
      
      }
  };

  var map =null;
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady(){
    map= plugin.google.maps.Map.getMap(mapDiv, options);
    $ionicLoading.show({template : 'Espere por favor.'});  
      map.on(plugin.google.maps.event.MAP_READY, function() {
          $ionicLoading.hide();
          alert("yes!")  
      });
  }





});