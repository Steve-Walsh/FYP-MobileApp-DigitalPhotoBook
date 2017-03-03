angular.module('starter.controllers', [])

//.constant('apiendpoint', {
//    url: 'http://34.251.128.133:8080/api/events'
//})

.controller('AllEventsCtrl', function ($scope, $cordovaCamera, $cordovaFile) {

       


    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log("error" + err)
        });
    }



    })
    

.controller('MyEventsCtrl', function ($scope, Chats, $cordovaCamera, $http, ApiEndpoint, $ionicPopup) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url +"mobiles").then(function (res) {
                var alertPopup = $ionicPopup.alert({
                    title: 'data get success!',
                    //template: res.data.object.title
                })
            console.log('data ', res)
            $scope.feed = res.data;
        })

    });

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
    
    $scope.feed = null;

    //$http.get(ApiEndpoint.url).then(function (data) {
    //    var alertPopup = $ionicPopup.alert({
    //        title: 'data get success!',
    //        template: data.data.title
    //    })
    //    console.log('data ' , data)
    //    $scope.feed = data.title;
    //})
}) 

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PicturesCtrl', function ($scope, Pictures, $http, ApiEndpoint, $ionicPopup) {
    $scope.settings = {
        enableFriends: true
    };
    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url + "users").then(function (res) {
            var alertPopup = $ionicPopup.alert({
                
                    title: 'data get success!',
                    //template: res.data.object.title
                    
            })
            console.log('data ', res)
            $scope.feed = res.data;
        })

    });
    //console.log("in pic ctrl")
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


}]);
