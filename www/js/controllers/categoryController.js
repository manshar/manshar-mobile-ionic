'use strict';

angular.module('manshar')
  .controller('CategoryCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$filter', '$anchorScroll', 'Category', 'Topic', 'CategoryArticle','$ionicSideMenuDelegate',
      function ($scope, $rootScope, $stateParams, $location, $filter, $anchorScroll, Category, Topic, CategoryArticle,$ionicSideMenuDelegate) {
    //$anchorScroll();
        $scope.showCategoriesPicker = function(){
          alert()
          $scope.$emit('openCategoryMenuSide', {pickOnlyCategory: true});
        }
    Category.get({'categoryId': $stateParams.categoryId},
        function(resource) {
      /* jshint camelcase: false */
      $rootScope.page.title = resource.title;
      $rootScope.page.image = resource.original_image_url;
      $rootScope.page.publishedTime = resource.created_at;
      $rootScope.page.description = resource.description;

      $scope.category = resource;
    });

    $rootScope.forceBar = true;

    // Get all topics in this category.
    $scope.topics = Topic.query({'categoryId': $stateParams.categoryId});

    // Get all articles in this category.
    $scope.articles = [{ loading: true }, { loading: true },
        { loading: true }];
    CategoryArticle.query({'categoryId': $stateParams.categoryId},
        function(articles) {
      $scope.articles = articles;
      $scope.hasNext = true;
    });

    var page = 1;
    $scope.hasNext = false;
    $scope.loadMoreArticles = function() {
      $scope.inProgress = 'load-more';
      Article.query({
        'order': $scope.order,
        'page': ++page
      }, function(articles) {
        if (!articles || !articles.length) {
          $scope.hasNext = false;
        }
        Array.prototype.push.apply($scope.articles, articles);
        $scope.inProgress = null;
      });
    };
    $scope.showCategoriesPicker = function() {

      //$rootScope.$emit('openTopicPicker', {pickOnlyCategory: true});
      $scope.categories = Category.query();
      $ionicSideMenuDelegate.toggleLeft();
      //$rootScope.$emit('openCategoryMenuSide', {pickOnlyCategory: true});
    };

    var categorySelectedUnbind = $rootScope.$on('categorySelected',
        function(event, data) {
      $location.path('/categories/' + data.category.id);
    });

    $scope.getCardColor = function(color) {
      return $filter('darker')(color, -0.4);
    };

    /**
     * Make sure to cleanup the binded events and intervals when the user
     * leaves to another controller.
     */
    var onDestroy = function () {
      categorySelectedUnbind();
    };
    $scope.$on('$destroy', onDestroy);

  }]);
