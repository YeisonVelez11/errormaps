
tinApp.controller('productosController', function($scope/*,$cordovaOauth*/,$state, $q, UserService, $ionicLoading,ionicpopup,$ionicSideMenuDelegate) {
/*/*/
  angular.element( document.querySelector('#sidemenu')).removeClass('fix_ion_side_left');


 /* setTimeout(function(){
       document.querySelector("#sidemenu").style.width="auto";
  },5000)*/
	$scope.productos = [
	    { title: 'Zapatos', id: 1 },
	    { title: 'Chanclas', id: 2 },
	    { title: 'Medias', id: 3 },
	    { title: 'Camisas', id: 4 },
	    { title: 'Tenis', id: 5 },
	    { title: 'Chaquetas', id: 6 }
	  ];
		
/*
	$scope.fn_loginFacebook=function(){
		$cordovaOauth.facebook("2250732508484195", ["email"]).then(function(result) {
		    console.log("Response Object -> " + JSON.stringify(result));
		}, function(error) {
		    console.log("Error -> " + error);
		});		
	}*/





 // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {

      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
        		picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });
      $scope.imagen="http://graph.facebook.com/" + authResponse.userID + "/picture?type=large";
      $ionicLoading.hide();
      $state.go('app.productos');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    alert("no se pudo conectar")
    ionicpopup.generate("Error",error)
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name,picture&access_token=' + authResponse.accessToken, null,
      function (response) {
        info.resolve(response);
      },
      function (response) {
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
  	console.log("click")
    facebookConnectPlugin.getLoginStatus(function(success){
    	console.log(success)
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

    		// Check if we have our user saved
    		var user = UserService.getUser();
    		console.log(user)
    		if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						console.log(profileInfo)
						// For the purpose of this example I will store user data on local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});

						$state.go('app.productos');
					}, function(fail){
						ionicpopup.generate("Error",error)
						    alert("no se pudo conectar2")

						console.log('profile info fail', fail);
					});
				}else{
					$state.go('app.productos');
				}
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.


				$ionicLoading.show({
		          template: 'Espere por favor'
		        });

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };




});