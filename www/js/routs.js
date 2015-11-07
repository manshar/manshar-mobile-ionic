angular.module('manshar')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      //controller: 'AppCtrl'
    })

    .state('app.articles', {
      url: '/main',

      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller:'MainCtrl'
        },
        'fabContent': {
          templateUrl: 'templates/articles/listtools.html',

          controller: function ($timeout) {
            /*$timeout(function () {
             document.getElementById('fab-profile').classList.toggle('on');
             }, 800);*/
          }
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
  $urlRouterProvider.otherwise('/app/main');
});
