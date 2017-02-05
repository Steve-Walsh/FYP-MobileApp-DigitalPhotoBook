angular.module('starter.controllers', [])

.controller('AllEventsCtrl', function ($scope) { })

.controller('MyEventsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

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


//.controller('PictureDetailCtrl', function ($scope, $stateParams, Pictures) {
//    console.log("in pic details")
//    $scope.picture = Pictures.get($stateParams.pictureId);
//})



.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});




