// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.articles', {
    url: '/articles',
    views: {
      'menuContent': {
        templateUrl: 'templates/articles/list.html'
      }
    }
  })

  .state('app.articlesnew', {
      url: '/article/new',
      views: {
        'menuContent': {
          templateUrl: 'templates/articles/edit.html'
        }
      }
    })
    .state('app.articlesedite', {
      url: '/article/:articleId/edit',
      views: {
        'menuContent': {
          templateUrl: 'templates/articles/edit.html',
          //controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.article', {
    url: '/article/:articleId',
    views: {
      'menuContent': {
        templateUrl: 'templates/articles/show.html',
        //controller: 'PlaylistCtrl'
      }
    }
  })
    .state('app.profile', {
      url: '/profile/:userId',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile/show.html',
         // controller: 'PlaylistCtrl'
        }
      }
    })
    .state('app.profileEdit', {
      url: '/profile/:userId/edit',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile/edit.html',
         // controller: 'PlaylistCtrl'
        }
      }
    })
    .state('app.categories', {
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories/List.html',
          // controller: 'PlaylistCtrl'
        }
      }
    })
    .state('app.category', {
      url: '/category/:categoryId',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories/category.html',
          // controller: 'PlaylistCtrl'
        }
      }
    })
    .state('app.topic', {
      url: '/categories/:categoryId/topics/:topicId',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories/topic.html',
          // controller: 'PlaylistCtrl'
        }
      }
    })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/articles');
});
