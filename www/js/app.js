angular.module('tinApp', ['ionic','tinApp.controllers','tinApp.services','tinApp.constantes','ngCordova','ngStorage'/*,  'ngCordovaOauth'*/])


.run(function($ionicPlatform,$rootScope,$ionicSideMenuDelegate,$localStorage) {
  $ionicPlatform.registerBackButtonAction(function (event) {
      event.preventDefault();
  }, 100);



  $ionicPlatform.ready().then(function (){
      if (window.cordova && window.cordova.plugins) {
        Keyboard.hideFormAccessoryBar(false);
        Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
  })
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.backButton.text('').previousTitleText(false);
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.scrolling.jsScrolling(true);
  $stateProvider

  .state('ubicaciones', {
    url: '/ubicaciones',
    cache:false,
    templateUrl: 'home.html',
    controller: 'ubicacionesController'
    
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/ubicaciones');

});
