angular.module('manshar')

.controller('MainCtrl', function($scope,Article,User) {
    $scope.order = 'popular';
    //TODO loading style
    $scope.articles = [{loading:true},{loading:true}];
    $scope.activeTab = $scope.order;
    Article.query({'order': $scope.order}, function(articles) {
      $scope.articles = articles;
      $scope.hasNext = true;
      $scope.publishers = User.query();
    });

    var page = 1;
    $scope.hasNext = false;
    $scope.loadMoreArticles = function() {

    };
    $scope.orderArticles = function (order) {
      page = 1;
      $scope.activeTab = order;
      $scope.articles = [{ loading: true }, { loading: true },
        { loading: true }];
      $scope.order = order;
      Article.query({'order': order}, function(articles) {
        $scope.articles = articles;
        $scope.hasNext = true;
      });
    };

    $scope.showCategoriesPicker = function(){
      $scope.$emit('openCategoryMenuSide', {pickOnlyCategory: true});
    }
});
