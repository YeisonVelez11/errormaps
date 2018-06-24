// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('tinApp', ['ionic','tinApp.controllers','tinApp.services','tinApp.constantes','ngCordova','ngStorage'/*,  'ngCordovaOauth'*/])


.run(function($ionicPlatform,$rootScope,$ionicSideMenuDelegate,$localStorage) {

  $ionicPlatform.registerBackButtonAction(function (event) {
      event.preventDefault();
  }, 100);


      //$rootScope.menuHidden = false;

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
     $rootScope.menuOpen= toState.name != 'app.ubicaciones';
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
   if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
   cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
    // org.apache.cordova.statusbar required
    StatusBar.styleDefault();
  }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('').previousTitleText(false);
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.scrolling.jsScrolling(true);
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('login', {
    url: '/login',
      templateUrl: 'templates/login/login.html',
      controller: 'loginController'
  })

  .state('app.ubicaciones', {
    url: '/ubicaciones?nombre&id&lat&lng',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/ubicaciones/ubicaciones.html',
        controller: 'ubicacionesController'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
