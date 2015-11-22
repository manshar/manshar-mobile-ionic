angular.module('manshar')

.config(function($stateProvider, $urlRouterProvider) {

    /**
     * Checks proper access to the route and reject it if unauthenticated.
     */



  $stateProvider


    .state('app', {
      url: '/app',
      data:{
        isPublic:true,
        isAdmin:false
      },
      /*resolve:checkAccess,*/
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.articles', {
      url: '/main',
      data:{
        isPublic:true,
        isAdmin:false
      },
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
      data:{
        isPublic:true,
        isAdmin:false
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/articles/edit.html'
        }
      }
    })
    .state('app.articlesedite', {
      url: '/article/:articleId/edit',
      data:{
        isPublic:false,
        isAdmin:false
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/articles/edit.html',
          //controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.article', {
      url: '/article/:articleId',
      data:{
        isPublic:true,
        isAdmin:false
      },
    /*  resolve:checkAccess,*/
      views: {
        'menuContent': {
          templateUrl: 'templates/articles/show.html',
          controller: 'ArticleCtrl'
        }
      }
    })
    .state('app.profile', {
      url: '/profile/:userId',
      data:{
        isPublic:false,
        isAdmin:false
      },
      resolve:{
        load: ['$q', '$location', '$rootScope', '$auth', '$state','LoginService',
          function($q, $location, $rootScope, $auth, $state, LoginService) {
            var isPublic =false;// $state.current.data.isPublic;
            var isAdmin =false;// $state.current.data.isAdmin;
            var deferred = $q.defer();
            var callback = function() {

              if(LoginService.isAuthorized(isPublic, isAdmin)) {
                console.log('$rootScope.user', $rootScope.user);
                deferred.resolve();
              } else {
               // deferred.reject();
                /*$rootScope.$broadcast('showLoginDialog', {
                  'prev': $location.path()
                });*/
                $rootScope.$broadcast('showLoginDialog',deferred);
              }
            };
            $auth.validateUser().then(callback, callback);
            return deferred.promise;
          }]
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/profile/show.html',
           controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.profileEdit', {
      url: '/profile/:userId/edit',
      data:{
        isPublic:false,
        isAdmin:false
      },
      resolve:{
        load:checkAccess.load
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/profile/edit.html',
           controller: 'EditProfileCtrl'
        }
      }
    })
    .state('app.categories', {
      url: '/categories',
      data:{
        isPublic:true,
        isAdmin:false
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/categories/List.html',
          // controller: 'PlaylistCtrl'
        }
      }
    })
    .state('app.category', {
      url: '/category/:categoryId',
      data:{
        isPublic:true,
        isAdmin:false
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/categories/category.html',
           controller: 'CategoryCtrl'
        }
      }
    })
    .state('app.topic', {
      url: '/categories/:categoryId/topics/:topicId',
      data:{
        isPublic:true,
        isAdmin:false
      },
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
