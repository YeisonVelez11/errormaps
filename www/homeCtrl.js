tinApp.controller('ubicacionesController', function($scope,$state,ionicpopup,$ionicHistory,$ionicLoading,$stateParams, $ionicModal ,$timeout,$ionicSideMenuDelegate,$ionicScrollDelegate,http,utilidades,SERVICES_wEB,$localStorage ) {


 


  var myLocation= {"lat": 4.624335, "lng": -74.063644};
  var geolocation=true;
  var temp_myLocation=null;
  var circle=null;
  var markerCluster =null;
  var search_without_geo=false;
  var map =null;

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



  $scope.aCoordenasSW=[
              {
                "position":{
                  "lng":-75.492923,
                  "lat":5.063968
                },
                "icon":"http:\/\/tin.domovida.com\/Tin-Developer\/Images\/Tiendas\/Icon-TiendaVilladelRio2018-07-13.png"
              },
              {
                "position":{
                  "lng":-75.492723,
                  "lat":5.063868
                },
                "icon":"http:\/\/tin.domovida.com\/Tin-Developer\/Images\/Tiendas\/Icon-Tiendalosyarumos2018-07-23.jpg"
              },
              {
                "position":{
                  "lng":-75.492123,
                  "lat":5.063268
                },
                "icon":"http:\/\/tin.domovida.com\/Tin-Developer\/Images\/Tiendas\/Icon-TiendaManizales2018-07-14.png"

              }            
          ]


  //function onDeviceReady(){
      map= plugin.google.maps.Map.getMap(mapDiv, options);
      map.on(plugin.google.maps.event.MAP_READY, function() {
  var map =null;

        $timeout(function(){
              markerCluster= map.addMarkerCluster({
              boundsDraw: false,
              zoomOnClick: false,
              markers:$scope.aCoordenasSW,
              icons: [
                  {min: 2, max: 100, url: "./img/i1.png", anchor: {x: 16, y: 16}},
                  {min: 100, max: 1000, url: "./img/i2.png", anchor: {x: 16, y: 16}},
                  {min: 1000, max: 2000, url: "./img/i3.png", anchor: {x: 24, y: 24}},
                  {min: 2000, url: "./img/i4.png",anchor: {x: 32,y: 32}}
              ]
            },function(){
     
            });
            markerCluster.on(plugin.google.maps.event.MARKER_CLICK, function (position, marker) {
          },1000)
        })
      });
  //}
  
  //document.addEventListener("deviceready", onDeviceReady, false);

 


});