var timeout=15000;

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var h = this.getHours() + "_";
    var m = this.getMinutes() + "_";
    var s= this.getSeconds();
    return [this.getFullYear() + "-",
        (mm > 9 ? '' : '0') + mm + "-",
        (dd > 9 ? '' : '0') + dd
    ].join('') + "_" + h + m+s;
};
	
angular.module('tinApp.services', [])




.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})


.factory('ionicpopup', function($ionicPopup) {
    var popup = {};
    popup.generate = function(titulo, subtitulo) {
      $ionicPopup.show({
            type: 'button-positive',
            subTitle: subtitulo,
            buttons: [
                {
                    text: 'Aceptar',
                    type: 'button-positive'
                }]
          });
    };

    return popup;
})


.service('GooglePlacesService', function($q){
  this.getPlacePredictions = function(query){
    var dfd = $q.defer(),
        service = new google.maps.places.AutocompleteService();

    service.getPlacePredictions({ input: query }, function(predictions, status){
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        dfd.resolve([]);
      }
      else
      {
        dfd.resolve(predictions);
      }
    });

    return dfd.promise;
  };

  this.getLatLng = function(placeId){
    var dfd = $q.defer(),
        geocoder = new google.maps.Geocoder;

    geocoder.geocode({'placeId': placeId}, function(results, status) {
      if(status === 'OK'){
        if(results[0]){
          dfd.resolve(results[0].geometry.location);
        }
        else {
          dfd.reject("no results");
        }
      }
      else {
        dfd.reject("error");
      }
    });

    return dfd.promise;
  };

  this.getPlacesNearby = function(location){
    // As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
    var dfd = $q.defer(),
        elem = document.createElement("div"),
        service = new google.maps.places.PlacesService(elem);

    service.nearbySearch({
      location: location,
      radius: '1000',
      types: ['restaurant']
    }, function(results, status){
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        dfd.resolve([]);
      }
      else {
        dfd.resolve(results);
      }
    });

    return dfd.promise;
  };

  this.getPlaceDetails = function(placeId){
    // As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
    var dfd = $q.defer(),
        elem = document.createElement("div"),
        service = new google.maps.places.PlacesService(elem);

    service.getDetails({
      placeId: placeId
    }, function(place, status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dfd.resolve(place);
      }
      else {
        dfd.resolve(null);
      }
    });

    return dfd.promise;
  };
})

/*
.factory('popup', function($ionicPopup, $state) {
    var popup = {};

    popup.generarPopup = function(titulo,subtitulo,clase) {

/*
	    var alertPopup = $ionicPopup.alert({
	        title: 'Alerta',
	        subTitle: "prueba",
	        buttons: [{
	            text: 'OK',
	            type: 'button-positive'
	        }]
	    });*/
		/*var popup = $ionicPopup.show({
		    title: titulo,
		    subTitle: subtitulo,
		    buttons: [
		              { 
		              	text: 'Aceptar', 
		              	type: 'button-positive', 
		              	 onTap: function(e) {
		                  return true; 
		              	} 

		           	   }
		             ]
		  }).then(function(result){
		    //console.log('Tapped', result);
		  }, function(error){
		    //console.log('error', error);
		  }, function(popup){
		    popup.close();
		  })

    }
    return popup;
})

*/