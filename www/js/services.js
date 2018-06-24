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


.factory('ionicpopup', function($ionicPopup,$state) {
    var popup = {};
    popup.generate = function(titulo, subtitulo,estado,funcion,scope) {
      $ionicPopup.show({
            title:titulo,
            type: 'button-positive',
            subTitle: subtitulo,
            buttons: [
                {
                    text: 'Aceptar',
                    type: 'button-positive',
                    onTap: function(e) {
                      if(estado!=undefined && estado!=null ){
                          $state.go(estado);
                      }
                      if(funcion!=undefined){
                        scope[funcion]();
                      }
                    }
                }]
          });
    };
    //text_boton es el texto del primer boton
    //nombre_funcion es el nombre de la funcion sin ()
    popup.generate_doble = function(titulo, subtitulo,text_boton,funcion,text_boton2,funcion_boton2,scope) {
      $ionicPopup.show({
            title:titulo,
            type: 'button-positive',
            subTitle: subtitulo,
            buttons: [
                {
                    text: text_boton,
                    type: 'button-positive',
                    onTap: function(e) {
                      scope[funcion]();
                    }
                },
                {
                    text: text_boton2,
                    type: 'button-positive',
                    onTap: function(e) {
                      if(funcion_boton2!=null && funcion_boton2!=undefined){
                        scope[funcion_boton2]();
                      }
                    }
                }
                ]
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
.factory("http", function($http, ErrorPeticion) {
    var oHttp = {}

    /**
     * @ngdoc method
     * @module Utilidades
     * @name http#getAll
     * @description
     * Servicio para consumir un servicio web.
     * @param {string} url url del servicio web.
     * @param {string} metodo metodo usado para el servicio web. posible valores: <pre>GET, POST</pre>.
     **/
    oHttp.getAll = function(url, metodo, parametros) {
 
        var config = {
            method: metodo,
            url: url,
            timeout:timeout,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        }

        if (metodo == "POST") {
            config.data = parametros;
        }
        if (metodo == "GET") {
            config.params = parametros == undefined ? undefined : parametros;
        }
        if (metodo == "DELETE") {
            config.params = parametros == undefined ? undefined : parametros;
        }


        return $http(config).then(function(data) {
            return  data.data;
        }, function(response) {
            ErrorPeticion.mostrarError(response.status);
        });
    }
    return oHttp;
})


.factory('ErrorPeticion', function($ionicPopup,$state, $ionicLoading,$localStorage,$window) {
    var error = {};
    var alertPopup =null;
    var oTipoErrores = {
      "-1" : 'Problemas de conexión, revisa tu conexión a Internet o intentalo más tarde. Gracias',
        0: 'Problemas de conexión, revisa tu conexión a Internet o intentalo más tarde. Gracias',
        403: 'Lo sentimos, no estas autorizado para ejecutar esta acción.',
        404: 'Hubo algunos inconvenientes completando tu solicitud, intentalo nuevamente o más tarde. Gracias',
        408: 'Se agotó el tiempo de espera para completar tu solicitud, intentalo nuevamente o más tarde. Gracias',
        500: 'El servicio no está disponible en este momento, intentalo más tarde. Gracias',
        503: 'En este momento no podemos completar la petición en el servidor, intentalo más tarde. Gracias',
        504: 'Se agotó el tiempo de espera para completar la petición en el servidor, intentalo más tarde. Gracias'
    };
    error.mostrarError = function(status) {
        if (status != undefined && oTipoErrores[status]) { // Sin conexión a internet
            if(!alertPopup){
              alertPopup = $ionicPopup.alert({
                  subTitle: oTipoErrores[status],
                  buttons: [{
                      text: 'OK',
                      type: 'button-positive',
                      onTap: function() {

                        if($localStorage.token==undefined){
                          console.log($state.current)
                          if($state.current.name=="login"){
                            $window.location.reload();
                          }
                          else{
                            $state.go("app.ofertas", {}, {reload: true});
                          }
                        }
                        else{
                          if($state.current.name=="ofertas"){
                            $window.location.reload();
                          }
                          else{
                            $state.go("app.ofertas", {}, {reload: true});
                          }
                        }
                      }
                  }]
              });              
            }

        }
        $ionicLoading.hide();
    }
    return error;
})


    .factory('utilidades', function() 
  {

      var oUtilidades = {};

      //quita acentos a una palabra
      oUtilidades.quitaacentos= function(s) {
        var r=s.toLowerCase();
              r = r.replace(new RegExp(/\s/g),"");
              r = r.replace(new RegExp(/[àáâãäå]/g),"a");
              r = r.replace(new RegExp(/[èéêë]/g),"e");
              r = r.replace(new RegExp(/[ìíîï]/g),"i");
              r = r.replace(new RegExp(/ñ/g),"n");                
              r = r.replace(new RegExp(/[òóôõö]/g),"o");
              r = r.replace(new RegExp(/[ùúûü]/g),"u");
        return r;
      }


      return oUtilidades;
  })
