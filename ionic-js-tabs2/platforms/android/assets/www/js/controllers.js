angular.module('starter.controllers', [])

//.constant('apiendpoint', {
//    url: 'http://34.252.51.64:8080/api/'
//})

.controller('AllEventsCtrl', function ($scope, $cordovaCamera, $cordovaFile, $http, ApiEndpoint, $ionicPopup, $state, AuthService) {



    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url + "api/events/", {
            headers: {
                Authorization: 'Bearer ' + AuthService.getToken()
            }
        }).then(function (res) {
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

.controller('EventDetailCtrl', function ($scope, $stateParams, Events, $http, ApiEndpoint, $timeout, AuthService, Events, $state) {

    var loggedInUser = AuthService.getLoggedInUser()

    $http.get(ApiEndpoint.url + 'api/events/eventDetails/' + $stateParams.eventId, {
        headers: {
            Authorization: 'Bearer ' + AuthService.getToken()
        }
    }).then(function (res) {
        $scope.event = res.data.event;
        $scope.check = false
        console.log("the event is ", res.data.event.attenders)

        if ($scope.event.adminId == loggedInUser.id) {
            $scope.check = true
        } else if (res.data.event.attenders.length > 0) {
            res.data.event.attenders.forEach(function (a) {
                console.log(a.id, " // ",  loggedInUser.id)
                if (a.id == loggedInUser.id) {
                    $scope.check = true
                }
            })
        }
    })

    $scope.joinEvent = function (event) {
        console.log("join event called")
        addPersonToEvent(loggedInUser, event._id)
        $state.go("tab.myEvents")
    }

    $scope.leaveEvent = function (event) {
        var user = loggedInUser
        user.eventId = event._id
        leaveAnEvent(user)
        $state.go("tab.allEvents")
    }


})

.controller('PicturesCtrl', function ($scope, $http, ApiEndpoint, $ionicPopup, $state) {
    $scope.settings = {
        enableFriends: true
    };


    $scope.$on('$ionicView.enter', function (e) {
        $http.get(ApiEndpoint.url + "api/mobiles/pictures", {
            headers: {
                Authorization: 'Bearer ' + AuthService.getToken()
            }
        }).then(function (res) {
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


.controller('AccountCtrl', function ($scope, $state, AuthService, $rootScope, $ionicUser, $ionicPush, Events, Options) {



    $scope.$on('$ionicView.enter', function (e) {
    var loggedInUser = AuthService.getLoggedInUser()

    $scope.eventDetails = Events.currentEvent(loggedInUser)

    $scope.event = Events.getEventId()
    var getOpts = Options.getOptions();
    $scope.options = JSON.parse(getOpts)

    //    .success(function (res) {
    //    console.log("res is", res)
    //})
    //console.log("even is ", $scope.event)
    });

    //$scope.changeOption = function () {
    //    var options
    //    console.log($scope.options.notif)

    //    //options.notif = $scope.options.notif
    //    //options.chat = $scope.options.chat
    //    //Options.setOptions(options)

    //}

    $scope.changeOpts = function () {

        console.log($scope.options.notif + " / " + $scope.options.chat)
        var opts = { notif: $scope.options.notif, chat: $scope.options.chat }
        Options.changeOptions(opts)
    //    if ($scope.notif == false) {
    //        $scope.notif = true;
    //    }
    //    else {
    //        $scope.notif = false;
    //    }
    //    Options.setNotif($scope.notif)
    //};
    //$scope.changeChat = function () {
    //    if ($scope.chat == false) {
    //        $scope.chat = true;
    //    }
    //    else {
    //        $scope.chat = false;
    //    }
        //Options.setNotif($scope.chat)

    };




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


.controller('DurPicturesCtrl', function ($scope, $cordovaCamera, $cordovaFile, $http, ApiEndpoint, $ionicPopup, $state, $cordovaFileTransfer, Events) {
    //TODO remove hard coded event
    $scope.$on('$ionicView.enter', function (e) {
        $scope.imgURI = null;
        $scope.base64Img = null;

    });
    var eventId = Events.getEventId()

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
            'event': eventId
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
        $http.get(ApiEndpoint.url + 'api/events/eventDetails/' + Events.getEventId(), {
            headers: {
                Authorization: 'Bearer ' + AuthService.getToken()
            }
        }).then(function (res) {

            if (res.data.event.endTime < moment()) {
                console.log("event over");
            }

            $scope.event = res.data.event;
        })

    });


})

.controller('DurChatCtrl', function ($scope, ApiEndpoint, chatSocket, AuthService, $ionicScrollDelegate, Events, Options) {

    $scope.data = {};
    $scope.loggedInUser = AuthService.getLoggedInUser()
    var eventId = Events.getEventId()


    $scope.$on('$ionicView.enter', function (e) {

        var getOpts = Options.getOptions();
        $scope.options = JSON.parse(getOpts)

        if ($scope.options.chat == true) {
            chatSocket.emit("connect")
            $ionicScrollDelegate.scrollBottom();
        }
    })



    $scope.chatMessages = [];

    $scope.humanize = function (timestamp) {
        return moment(timestamp).fromNow();
    };


    $scope.sendTextMessage = function () {


        var msg = {
            'room': eventId,
            'user': $scope.loggedInUser.email,
            'text': $scope.data.message,
            'time': moment()
        };
        if ($scope.data.message != null) {
            $scope.chatMessages.push(msg);
            $ionicScrollDelegate.scrollBottom();
        }



        $scope.data.message = '';

        chatSocket.emit('new message', msg);
    };


    $scope.leaveRoom = function () {

        chatSocket.emit('disconnect');

    };



    chatSocket.on('new message', function (msg) {
        console.log(msg)
        if (msg.room == eventId) {
            $scope.chatMessages.push(msg);
            $ionicScrollDelegate.scrollBottom();
            console.log($scope.chatMessages)
        }
  
    });



});





