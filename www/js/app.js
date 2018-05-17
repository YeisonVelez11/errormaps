// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('tinApp', ['ionic','tinApp.controllers','tinApp.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideFormAccessoryBar(true);
      //window.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.buscar', {
    url: '/buscar',
    views: {
      'menuContent': {
        templateUrl: 'templates/buscar/buscar.html'
      }
    }
  })

  .state('app.productos', {
    url: '/productos',
    views: {
      'menuContent': {
        templateUrl: 'templates/productos/productos.html',
        controller: 'ProductosController'
      }
    }
  })

  .state('app.single', {
    url: '/productos/:productoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/productos/producto.html',
        controller: 'ProductoController'
      }
    }
  })

  .state('app.ubicaciones', {
    url: '/ubicaciones',
    views: {
      
      'menuContent': {
        templateUrl: 'templates/ubicaciones/ubicaciones.html',
        controller: 'UbicacionesController'
      }
    }
  })


  .state('app.place', {
    url: '/place/:placeId',
    templateUrl: "templates/ubicaciones/place.html",
    controller: 'PlaceController.js',
    resolve: {
      place: function($stateParams, GooglePlacesService) {
        return GooglePlacesService.getPlaceDetails($stateParams.placeId);
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/productos');

});
