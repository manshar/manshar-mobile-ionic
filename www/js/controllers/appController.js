angular.module('manshar')

.controller('AppCtrl', function($scope, $ionicModal, $timeout,LoginService,Category,$ionicSideMenuDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/partials/_login_form.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.ShowloginModal = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    LoginService.login({"email":"ali@soufnet.com","password":"198328inf"}, success, error);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
  };
    $scope.$on('auth:login-success', function(event, response) {
      alert('auth:login-success')
      console.log('response.data', response );
      $scope.me=response;
      $scope.modal.hide();
    });
    var success = function(user) {

     alert('success')
    /*  $analytics.eventTrack('Login Success', {
        category: 'User'
      });
      if ($scope.isLoginPage) {
        $location.path($routeParams.prev || '/profiles/' + user.id)
          // Remove the prev param when redirecting.
          .search('prev', null);
      }*/
    };

    var error = function(response) {
      console.log('response', response);
      alert(response.reason)
   /*
      $analytics.eventTrack('Login Error', {
        category: 'User',
        label: angular.toJson(response.errors)
      });

      // TODO(mkhatib): This is pretty ugly. Clean it up and move strings into
      // a constant file definition.
      var confirmationMessage = 'A confirmation email was sent to your account';
      var invalidMessage = 'credentials';
      var message = response.errors && response.errors[0] || '';
      if (message.indexOf(confirmationMessage) !== -1) {
        $scope.error = 'يجب عليك تفعيل حسابك. تم إرسال رسالة لبريدك الإلكتروني. تأكد من فحص مجلد السبام.';
        $scope.nonConfirmed = true;
      } else if (message.indexOf(invalidMessage) !== -1) {
        $scope.error = 'خطأ في البريد الالكتروني أو كلمة المرور';
      } else {
        $scope.error = response.errors[0] || 'حدث خطأ ما. الرجاء المحاولة مرة أخرى';
      }
      $scope.flash = null;*/
    };

    $scope.$on('openCategoryMenuSide',function(){
      $scope.categories = Category.query();
      $ionicSideMenuDelegate.toggleLeft();
    })
})
