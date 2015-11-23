angular.module('manshar')

.controller('MainCtrl', function($scope,Article,User,$state) {
    $scope.order = 'popular';
    //TODO loading style
    $scope.articles = [{loading:true},{loading:true}];
    $scope.activeTab = $scope.order;
    Article.query({'order': $scope.order}, function(articles) {
      $scope.articles = articles;
      $scope.hasNext = true;
      $scope.publishers = User.query();
      console.log('$scope.publishers', $scope.publishers);
    },function(error){
      
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
    $scope.Showprofile = function (userId) {
      $state.go('app.profile',{userId:userId})
    };
    $scope.showCategoriesPicker = function(){
      $scope.$emit('openCategoryMenuSide', {pickOnlyCategory: true});
    }
});
