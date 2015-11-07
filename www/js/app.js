// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('manshar',
  ['ionic',
    'ngResource',
    'manshar.controllers',
    'manshar.services',
    'manshar.filters',
    'AppConfig',
    'ng-token-auth'])

.run(function($ionicPlatform,LoginService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

/**
 * Sets up authentication for ng-token-auth.
 */

.config(['$authProvider', 'API_HOST', function($authProvider, API_HOST) {
  $authProvider.configure({
    apiUrl: 'http://' + API_HOST,
    //confirmationSuccessUrl:  'http://' + window.location.host + '/login',
    //passwordResetSuccessUrl: ('http://' + window.location.host +'/accounts/update_password'),
    //authProviderPaths: {
    //  facebook: '/auth/facebook',
    //  gplus:   '/auth/gplus'
    //},
  });
}])
;
