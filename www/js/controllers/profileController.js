/**
 * Created by NABIL on 10-11-2015.
 */
angular.module('manshar.controllers', [])

  .controller('ProfileCtrl', function($scope,User,UserArticle,UserRecommendation,UserComment,UserDraft,$stateParams,$rootScope,$filter,$location) {
    User.get({'userId': $stateParams.userId}, function(resource) {
      /* jshint camelcase: false */
      console.log('resourceresource', resource);
      $rootScope.page.title = resource.name;
      $rootScope.page.image = resource.cover_url;
      $rootScope.page.avatar = resource.avatar_url;

      $rootScope.page.publishedTime = resource.created_at;
      $rootScope.page.description = resource.bio;
      $scope.profile = resource;
    });
    $scope.editProfile = function () {

     /* $location.path('/profiles/' + $rootScope.user.id + '/edit');*/
    };
    $scope.activeTab = 'published';
    $scope.loadRecommendations = function() {
      $scope.activeTab = 'recommendations';
      $scope.articles = [{ loading: true }, { loading: true },
        { loading: true }];
      var articles = [];
      UserRecommendation.query({'userId': $stateParams.userId}, function(recommendations) {
        angular.forEach(recommendations, function (recommendation) {
          articles.push(recommendation.article);
        });
        $scope.articles = articles;
      });
    };

    $scope.loadDiscussions = function() {
      $scope.activeTab = 'discussions';
      $scope.articles = [{ loading: true }, { loading: true },
        { loading: true }];
      var articles = [];
      UserComment.query({'userId': $stateParams.userId}, function(comments) {
        angular.forEach(comments, function (comment) {
          var alreadyExist = false;
          for (var i = 0; i < articles.length; i++) {
            if (angular.equals(articles[i], comment.article)) {
              alreadyExist = true;
            }
          }
          if (!alreadyExist) {
            articles.push(comment.article);
          }
        });
        $scope.articles = articles;
      });
    };

    $scope.loadArticles = function() {
      $scope.articles = [{ loading: true }, { loading: true },
        { loading: true }];
      $scope.activeTab = 'published';
      // Only get drafts if the current profile being viewed and the logged in user
      // are the same person.
      if (($rootScope.user &&
        $rootScope.user.id === parseInt($stateParams.userId))) {
        $scope.drafts = UserDraft.query({});
      }

      UserArticle.query({'userId': $stateParams.userId}, function (articles) {
        $scope.articles = articles;
      });
    };


    $scope.loadArticles();
  });
