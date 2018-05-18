 
tinApp.controller('ubicacionesController', function($scope,$state,  $ionicLoading) {
/*$cordovaGeolocation*/
  //angular.element( document.querySelector('#sidemenu')).addClass('fix_ion_side_left');

  var mapDiv = document.getElementById("map_canvas");
    //var myLocation= {"lat": 5.0648733, "lng": -75.4916295};
    var myLocation={"lat": 3.411333, "lng":-76.523274};
    var options = {

        'camera': {
            'target': myLocation,
            'zoom': 18
        }
    };

  
      var markerCluster =null;
      //agrega al mapa los marcadores
      function fn_addCoordinatesMap(){
       var markers=fn_getCoordinates();
       markerCluster= map.addMarkerCluster({
          boundsDraw: false,
          markers:markers ,
          icons: [
              {min: 2, max: 100, url: "./img/i1.png", anchor: {x: 16, y: 16}},
              {min: 100, max: 1000, url: "./img/i2.png", anchor: {x: 16, y: 16}},
              {min: 1000, max: 2000, url: "./img/i3.png", anchor: {x: 24, y: 24}},
              {min: 2000, url: "./img/i4.png",anchor: {x: 32,y: 32}}
          ]
        });
        markerCluster.on(plugin.google.maps.event.MARKER_CLICK, function (position, marker) {
          alert(marker.get("name"));
        });  
      }


    var map = plugin.google.maps.Map.getMap(mapDiv, options);
    map.on(plugin.google.maps.event.MAP_READY, function() {

      //------------------------------------------------------
      // Create a marker cluster.
      // Providing all locations at the creating is the best.
      //------------------------------------------------------
      //fn_addCoordinatesMap();
        fn_getGPSLocation();

    });

    //obtiene las coordenadas
   function fn_getCoordinates(){
    var aCoordenadas=
    [
      {
        "position": {
          "lat":5.065351, 
          "lng": -75.490091
        },
        "name": "Starbucks - HI - Aiea  03641",
        "address": "Aiea Shopping Center_99-115 Aiea Heights Drive #125_Aiea, Hawaii 96701",
        "phone": "808-484-0000",
        "icon": "./img/starbucks.png"
      },
      {
        "position": {
          "lat": 5.062053,
          "lng": -75.492862
        },
        "name": "Starbucks - HI - Aiea  03642",
        "address": "Pearlridge Center_98-125 Kaonohi Street_Aiea, Hawaii 96701",
        "phone": "808-484-0000",
        "icon": "./img/starbucks.png"
      },
      {
        "position": {
          "lat":  5.054738,
          "lng": -75.500135
        },
        "name": "lejos",
        "address": "Pearlridge Center_98-125 Kaonohi Street_Aiea, Hawaii 96701",
        "phone": "808-484-0000",
        "icon": "./img/starbucks.png"
      }
    ];
    var aCoordenadasCercanas=[];
    var mi_ubicacion=myLocation;
    for(var i in aCoordenadas){
        var otra_ubicacion=aCoordenadas[i].position;
        console.log("distancia",plugin.google.maps.geometry.spherical.computeDistanceBetween(mi_ubicacion, otra_ubicacion));
        if(plugin.google.maps.geometry.spherical.computeDistanceBetween(mi_ubicacion, otra_ubicacion)<=352){
          aCoordenadasCercanas.push(aCoordenadas[i]);
        }
    }
    return aCoordenadasCercanas;
   }


  



/*
  setTimeout(function(){
    markerCluster.remove();
     setTimeout(function(){
          fn_addCoordinatesMap();

     },5000)
  },60000)*/

  function fn_getStreet_citiy(){


   plugin.google.maps.Geocoder.geocode({
      "position":myLocation
    }, function(results) {

      if (results.length === 0) {
        // Not found
        alert("paila")
        return;
      }

      var address = [
        results[0].subThoroughfare || "",
        results[0].thoroughfare || "",
        results[0].locality || "",
        results[0].adminArea || ""
        //results[0].postalCode || "",
        //results[0].country || ""
        ].join(", ");

      console.log(address)
    });
  }

 var onSuccessGPS = function(position) {
      myLocation= {"lat": position.coords.latitude, "lng":position.coords.longitude}; 
      var circle = map.addCircle({
        'center': myLocation,
        'radius': 10,
        'strokeColor' : '#AA00FF',
        'strokeWidth': 5,
        'fillColor' : '#880000'
      });

      map.moveCamera({
        'target':  myLocation,
        'zoom': 18,
        'duration': 5000
      },function(){
        fn_getStreet_citiy();
        setTimeout(function(){
          fn_addCoordinatesMap();
        },5000);
      });
   



    };

    // onError Callback receives a PositionError object
    //
    function onErrorGPS(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    function fn_getGPSLocation(){
      navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS,{timeout: 15000});
    }




});
