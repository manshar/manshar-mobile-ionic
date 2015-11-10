angular.module('manshar')

.controller('ArticleCtrl', function($scope,Article,$stateParams) {
    Article.get({'articleId': $stateParams.articleId},
      function(resource) {
        /* jshint camelcase: false */
        //$rootScope.page.title = resource.title;
        //$rootScope.page.image = resource.cover_url;
        //$rootScope.page.publishedTime = resource.created_at;
        //var cleanBody = $filter('nohtml')(resource.body);
        //$rootScope.page.description = $filter('words')(cleanBody, 50);

        $scope.article = resource;
      });
});
