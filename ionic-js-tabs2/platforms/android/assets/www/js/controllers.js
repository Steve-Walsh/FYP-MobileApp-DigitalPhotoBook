angular.module('starter.controllers', [])

.constant('ApiEndpoint', {
    url: 'http://34.251.128.133:8080/api/events'
})

.controller('AllEventsCtrl', function ($scope, $cordovaCamera, $cordovaFile) {

    //$scope.base64Image = function ($scope, $cordovaCamera) {
    //    $scope.takePicture = function () {
    //        $cordovaCamera.getPicture(opts).then(function (p) {
    //            // do something with the results
    //            // you will sometimes need to wrap $scope updates in $apply
    //            $scope.$apply(function () {
    //                $scope.results = p;
    //            });
    //        }, function (err) {
    //            // error handling
    //        });
    //    };
    //}


    //$scope.images = [];
    //$scope.addImage = function () {
    //    // 2
    //    var options = {
    //        destinationType: Camera.DestinationType.FILE_URI,
    //        sourceType: Camera.PictureSourceType.PHOTOLIBRARY, //Camera.PictureSourceType.CAMERA,
    //        allowEdit: false,
    //        encodingType: Camera.EncodingType.JPEG,
    //        popoverOptions: CameraPopoverOptions,
    //    };

    //    // 3
    //    $cordovaCamera.getPicture(options).then(function (imageData) {

    //        // 4
    //        onImageSuccess(imageData);

    //        function onImageSuccess(fileURI) {
    //            createFileEntry(fileURI);
    //        }

    //        function createFileEntry(fileURI) {
    //            window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
    //        }

    //        // 5
    //        function copyFile(fileEntry) {
    //            var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
    //            var newName = makeid() + name;

    //            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fileSystem2) {
    //                fileEntry.copyTo(
    //                    fileSystem2,
    //                    newName,
    //                    onCopySuccess,
    //                    fail
    //                );
    //            },
    //            fail);
    //        }

    //        // 6
    //        function onCopySuccess(entry) {
    //            $scope.$apply(function () {
    //                $scope.images.push(entry.nativeURL);
    //            });
    //        }

    //        function fail(error) {
    //            console.log("fail: " + error.code);
    //        }

    //        function makeid() {
    //            var text = "";
    //            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //            for (var i = 0; i < 5; i++) {
    //                text += possible.charAt(Math.floor(Math.random() * possible.length));
    //            }
    //            return text;
    //        }

    //    }, function (err) {
    //        console.log(err);
    //    });
    //}
        
        


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
    

.controller('MyEventsCtrl', function ($scope, Chats, $cordovaCamera, $http, ApiEndpoint) {
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
    
    $scope.feed = null;

    $http.get("http://34.251.128.133:8080/#/events/").then(function(data) {
        console.log('data ' , data)
        $scope.feed = data;
    })
}) 

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PicturesCtrl', function ($scope, Pictures) {
    $scope.settings = {
        enableFriends: true
    };

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
