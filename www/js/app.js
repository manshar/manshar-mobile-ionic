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
    'manshar.derectivs',
    'AppConfig',
    'ng-token-auth',
    'ngLocale'])

  .config(function($provide) {
  $provide.decorator('$state', function($delegate, $rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, state, params) {
      $delegate.next = state;
      $delegate.toParams = params;
    });
    return $delegate;
  });
})

.run(function($ionicPlatform,LoginService,$rootScope,$auth,$location,$q) {



    $rootScope.page={
      title:'منشر'};








  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.Connection) {

        if(navigator.connection.type == Connection.NONE) {
          $rootScope.Connection='NONE'
         /* console.log('window.Connection222', Connection);
          alert("The internet is disconnected on your device.")*/
     /*   $ionicPopup.confirm({
          title: "Internet Disconnected",
          content: "The internet is disconnected on your device."
        })
          .then(function(result) {
            if(!result) {
              ionic.Platform.exitApp();

            }
          });*/
      }
    }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //TODO get app version
    //cordova.getAppVersion(function(version) {
    //  $rootScope.version = version;
    //});

    //TODO set google analytics ID tracker
    //window.analytics.startTrackerWithId('UA-XXXXXXXX-Y');

  });
})

/**
 * Sets up authentication for ng-token-auth.
 */

.config(function($authProvider, API_HOST,$ionicConfigProvider) {
  $authProvider.configure({
    apiUrl: 'http://'+API_HOST,
    proxyIf:                 function() { return true; },
    proxyUrl:                'http://'+API_HOST,
    storage:'localStorage'
    //confirmationSuccessUrl:  'http://' + window.location.host + '/login',http://api.manshar.com
    //passwordResetSuccessUrl: ('http://' + window.location.host +'/accounts/update_password'),
    //authProviderPaths: {
    //  facebook: '/auth/facebook',
    //  gplus:   '/auth/gplus'
    //},
  });

    //change go back text and icon
    $ionicConfigProvider.backButton.text('رجوع').icon('ion-chevron-right');
})

/**
 * Intercept every http request and check for 401 Unauthorized
 * error. Clear the current user and redirect to /login page.
 */
  .config(['$httpProvider', '$locationProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('unAuthenticatedInterceptor');
    $httpProvider.defaults.headers.common['Accept-Encoding'] = 'gzip';

  }])

.factory('unAuthenticatedInterceptor', ['$location', '$q', '$rootScope',
  function ($location, $q, $rootScope) {
    return {
      'request': function(config) {
        return config;
      },

      'requestError': function(response) {
        console.error(response);
      },

      'response': function(response) {
        return response;
      },

      'responseError': function(response) {
        if (response.status === 401) {
          var previous = $location.path();
          $rootScope.$broadcast('showLoginDialog', {'prev': previous});
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }])

;

