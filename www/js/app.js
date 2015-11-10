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
    'ng-token-auth'])

.run(function($ionicPlatform,LoginService,$rootScope,$auth,$location,$q) {


    var checkAccess = function(event, next, current) {

      /**
       * First load to the AngularJS the user might have not been loaded
       * so need to call the callback after validateUser promise is resolved.
       */
      var firstLoadCallback = function() {
        if (!LoginService.isAuthorized(next.isPublic, next.isAdmin)) {
          $location.path('/login').search('prev', $location.path());
        }
      };

      // If this is the first load of the site.
      if(!current) {
        $auth.validateUser().then(firstLoadCallback, firstLoadCallback);
      }
      else if(!LoginService.isAuthorized(next.isPublic, next.isAdmin)) {
        event.preventDefault();
        // Show the dialog instead of redirecting for all navigations.
        // Except first time landing on the site on protected page.
        if (current) {
          $rootScope.$broadcast('showLoginDialog', {
            'prev': $location.path()
          });
        }
      }
    };

    /**
     * If the route to be accessed is private make sure the user is authenticated
     * otherwise, broadcast 'showLoginDialog' to show login modal.
     */
    $rootScope.$on('$stateChangeStart11', function(event, next, current) {
      checkAccess(event, next, current);
    });



    $rootScope.checkAccess = $q.defer();
    $rootScope.checkAccess.promise.then(function(){

    },function(){

    })

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        var isPublic = toState.data.isPublic;
        var isAdmin = toState.data.isAdmin;
        var callback = function() {

          if(LoginService.isAuthorized(isPublic, isAdmin)) {
            console.log('$rootScope.user', $rootScope.user);
            $rootScope.checkAccess.resolve();
          } else {

            $rootScope.$broadcast('showLoginDialog', {
              'prev': $location.path()
            });
          }
        };
        $auth.validateUser().then(callback, callback);
      })
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
