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


.controller('MyEventsCtrl', function ($scope, $cordovaCamera, $http, ApiEndpoint, $ionicPopup, $state, AuthService) {

    var loggedInUser = AuthService.getLoggedInUser()
    console.log("id is ", loggedInUser.id)

    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url + "api/events/myEvents/" + loggedInUser.id ,{
            headers: {
                Authorization: 'Bearer ' + AuthService.getToken()
            }
        }).then(function (res) {
            $scope.feed = res.data;
        })

    });
    $scope.feed = null;

})

.controller('EventDetailCtrl', function ($scope, $stateParams, Events, $http, ApiEndpoint, $timeout, AuthService) {

    var loggedInUser = AuthService.getLoggedInUser()

    $http.get(ApiEndpoint.url + 'api/events/eventDetails/' + $stateParams.eventId).then(function (res) {
        $scope.event = res.data.event;
        $scope.check = false

        if ($scope.event.adminId == loggedInUser.id) {
            $scope.check = true
        } else if ($scope.event.attenders > 0) {
            $scope.event.attenders.forEach(function (a) {
                if (a._id == loggedInUser.id) {
                    $scope.check = true
                }
            })
        }
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


.controller('AccountCtrl', function ($scope, $state, AuthService, $rootScope, $ionicUser, $ionicPush, Events) {



    $scope.$on('$ionicView.enter', function (e) {
    var loggedInUser = AuthService.getLoggedInUser()

    $scope.event = Events.currentEvent(loggedInUser)
       $scope.test = "new data"

    //    .success(function (res) {
    //    console.log("res is", res)
    //})
    //console.log("even is ", $scope.event)
    });


    $scope.logout = function () {
        console.log("logout called")
        AuthService.logout();
        $state.go('login');

    };
})


.controller('loginCtrl', function ($scope, $stateParams, $http, ApiEndpoint, $ionicPopup, $state, AuthService, $state) {
    $scope.data = {};


    $scope.login = function () {

        AuthService.login($scope.data).then(function (msg) {
            $state.go('tab.allEvents');
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


.controller('DurPicturesCtrl', function ($scope, $cordovaCamera, $cordovaFile, $http, ApiEndpoint, $ionicPopup, $state, $cordovaFileTransfer) {

    $scope.$on('$ionicView.enter', function (e) {
        $scope.imgURI = null;
        $scope.base64Img = null;

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
            $scope.base64Img = imageData;
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log("error" + err)
        });
    }

    $scope.uploadPicture = function () {

        var fileURL = $scope.imgURI;
        var ft = new FileTransfer();

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }
        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
        var uri = encodeURI(ApiEndpoint.url + 'api/photo/');
        var options = new FileUploadOptions();
        options.fileKey = "userPhoto";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1)
        options.mimeType = "image/jpeg";
        console.log(options.fileName)
        var headers = {
            'token': $http.defaults.headers.common.Authorization,
            'event': '58e256504e27e734f671c2b4'
        }
        options.headers = headers

        
        ft.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
                loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
            } else {
                loadingStatus.increment();
            }
        };
        ft.upload(fileURL, uri, win, fail, options);
    }

 
})

.controller('DurEventCtrl', function ($scope, $cordovaCamera, $cordovaFile, $http, ApiEndpoint, $ionicPopup, $state, AuthService, Events) {
    var eventId;
    $scope.$on('$ionicView.enter', function (e) {

        var eventId = Events.getEventId()
      
        

         $http.get(ApiEndpoint.url + 'api/events/eventDetails/' + Events.getEventId()).then(function (res) {
            $scope.event = res.data.event;

            var myEvents = {
                "data": [{
                    image: "/img/picOne.jpeg"
                },
            {
                image: "img/picTwo.jpeg"
            }]
            }

            $scope.event.myPictures = myEvents

        })

    });


})

.controller('DurChatCtrl', function ($scope, ApiEndpoint, chatSocket, AuthService, $ionicScrollDelegate) {

    $scope.data = {};
    var loggedInUser = AuthService.getLoggedInUser()


    $scope.$on('$ionicView.enter', function (e) {
        chatSocket.emit("connect")

        //chatSocket.emit("room", '58e256504e27e734f671c2b4');
        $ionicScrollDelegate.scrollBottom();
    })

    //$scope.sentMsg = function () {
    //    console.log($scope.data)
    //    chatSocket.emit("new message", $scope.data.message)
    //    console.log(chatSocket)
    //    $scope.data.message = "";
    //}

    //extra stuff

    var me = loggedInUser;

    $scope.chatMessages = [];

    $scope.humanize = function (timestamp) {
        return moment(timestamp).fromNow();
    };

    //me.current_room = localStorageService.get('room');

    //var current_user = localStorageService.get('username');

    //$scope.isNotCurrentUser = function (user) {

    //    if (current_user != user) {
    //        return 'not-current-user';
    //    }
    //    return 'current-user';
    //};


    $scope.sendTextMessage = function () {

        var msg = {
            'room': "58e256504e27e734f671c2b4",
            'user': loggedInUser.email,
            'text': $scope.data.message,
            'time': moment()
        };


        $scope.chatMessages.push(msg);
        $ionicScrollDelegate.scrollBottom();

        $scope.message = '';

        chatSocket.emit('new message', msg);
    };


    $scope.leaveRoom = function () {

        chatSocket.emit('disconnect');

    };



    chatSocket.on('new message', function (msg) {
        console.log(msg)
        $scope.chatMessages.push(msg);
        $ionicScrollDelegate.scrollBottom();
        console.log($scope.chatMessages)
    });



});





