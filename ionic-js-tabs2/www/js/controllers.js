angular.module('starter.controllers', [])

.controller('AllEventsCtrl', function ($scope, $cordovaCamera) {

    $scope.base64Image = function ($scope, $cordovaCamera) {
        $scope.takePicture = function () {
            $cordovaCamera.getPicture(opts).then(function (p) {
                // do something with the results
                // you will sometimes need to wrap $scope updates in $apply
                $scope.$apply(function () {
                    $scope.results = p;
                });
            }, function (err) {
                // error handling
            });
        };
    }

})

.controller('MyEventsCtrl', function ($scope, Chats, $cordovaCamera) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
   $scope.$on('$ionicView.enter', function(e) {
    });

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PicturesCtrl', function ($scope, Pictures) {
        $scope.settings = {
            enableFriends: true
        };

        console.log("in pic ctrl")
        $scope.pictures = Pictures.all();
        $scope.remove = function (picture) {
            Pictures.remove(picture);
        };
})


.controller('TakePictureCtrl', function ($scope, $stateParams, $cordovaCamera) {
  
    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }


})


    



.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
})



.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

;




