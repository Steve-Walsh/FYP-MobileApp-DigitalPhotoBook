angular.module('starter.controllers', [])

//.constant('apiendpoint', {
//    url: 'http://34.252.51.64:8080/api/'
//})

.controller('AllEventsCtrl', function ($scope, $cordovaCamera, $cordovaFile, $http, ApiEndpoint, $ionicPopup, $state) {

    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url + "api/mobiles/events").then(function (res) {
            //var alertPopup = $ionicPopup.alert({
            $scope.feed = res.data;
        })

    });


})


.controller('MyEventsCtrl', function ($scope, $cordovaCamera, $http, ApiEndpoint, $ionicPopup, $state) {

    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url +"api/mobiles").then(function (res) {
            console.log('data ', res)
            $scope.feed = res.data;
        })

    });
    $scope.feed = null;

}) 

.controller('EventDetailCtrl', function ($scope, $stateParams, Events, $http, ApiEndpoint, $timeout) {


    $http.get(ApiEndpoint.url + 'api/events/event/' + $stateParams.eventId).then(function (res) {
        console.log('data ', res.data.event)
        $scope.event = res.data.event;
    })
})

.controller('PicturesCtrl', function ($scope, $http, ApiEndpoint, $ionicPopup, $state) {
    $scope.settings = {
        enableFriends: true
    };
    

    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url + "api/mobiles/pictures").then(function (res) {
            $scope.feed = res.data;
        })

    });

   
})


.controller('TakePictureCtrl', function ($scope, $stateParams, $cordovaCamera, $state) {

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


.controller('AccountCtrl', function ($scope, $state) {
    $scope.settings = {
        enableFriends: true
    };
})


.controller('loginCtrl', function ($scope, $stateParams, $http, ApiEndpoint, $ionicPopup, $state, AuthService, $state) {
    $scope.data = {};

    $scope.login = function () {

        AuthService.login($scope.data).then(function (msg) {
             $state.go('tabs.allEvents');
        }, function (errMsg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: errMsg
            });
        });

        };


})

 .controller('signupCtrl', function ($scope, AuthService, $ionicPopup, $state) {
     $scope.data = {};

        $scope.signup = function () {
            AuthService.register($scope.data).then(function (msg) {
                $state.go('tab.allEvents');
                var alertPopup = $ionicPopup.alert({
                    title: 'Register success!',
                    template: msg
                });
            }, function (errMsg) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Register failed!',
                    template: errMsg
                });
            });
        };
    })


.controller('DurPicturesCtrl', function ($scope, $cordovaCamera, $cordovaFile, $http, ApiEndpoint, $ionicPopup, $state) {

    $scope.imgURI = null;

    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url + "api/mobiles/pictures").then(function (res) {
            var alertPopup = $ionicPopup.alert({
                title: 'data get success!',
                //template: res.data.object.title
            })
            console.log('data ', res)
            $scope.feed = res.data;
        })
    });

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

    $scope.uploadPicture = function () {


    }
})

.controller('DurEventCtrl', function ($scope, $cordovaCamera, $cordovaFile, $http, ApiEndpoint, $ionicPopup, $state) {

    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url + "api/mobiles/events").then(function (res) {
            var alertPopup = $ionicPopup.alert({
                title: 'data get success!',
                //template: res.data.object.title
            })
            console.log('data ', res)
            $scope.feed = res.data;
        })

    });


})



;







//$scope.takePicture = function () {
//    var options = {
//        quality: 75,
//        destinationType: Camera.DestinationType.DATA_URL,
//        sourceType: Camera.PictureSourceType.CAMERA,
//        allowEdit: true,
//        encodingType: Camera.EncodingType.JPEG,
//        popoverOptions: CameraPopoverOptions,
//        saveToPhotoAlbum: true
//    };

//    $cordovaCamera.getPicture(options).then(function (imageData) {
//        $scope.imgURI = "data:image/jpeg;base64," + imageData;
//    }, function (err) {
//        console.log("error" + err)
//    });
//}