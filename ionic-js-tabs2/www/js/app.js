// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ui.router', 'ionic.cloud', 'btford.socket-io'])

 //.constant('ApiEndpoint', {
 //    url: 'http://34.253.80.13:8080/'
 //})



.config(function ($stateProvider, $urlRouterProvider, $ionicCloudProvider) {
    var loggined = null

    $ionicCloudProvider.init({
        "core": {
            "app_id": "461d6a75"
        },
        "push": {
            "sender_id": "288476716569",
            "pluginConfig": {
                "ios": {
                    "badge": true,
                    "sound": true
                },
                "android": {
                    "iconColor": "#343434"
                }
            }
        }

    });

    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })

      .state('durTab', {
          url: '/durTab',
          abstract: true,
          templateUrl: 'templates/durTab.html'
      })
    .state('durTab.durEvent', {
        url: '/durEvent',
        views: {
            'durTab-event': {
                templateUrl: 'templates/durTab-event.html',
                controller: 'DurEventCtrl'
            }
        }
    })
     .state('durTab.durChat', {
        url: '/durChat',
        views: {
            'durTab-chat': {
                templateUrl: 'templates/durTab-chat.html',
                controller: 'DurChatCtrl'
            }
        }
     })
     .state('durTab.account', {
        url: '/durAccount',
        views: {
            'durTab-account': {
                templateUrl: 'templates/durTab-account.html',
                controller: 'AccountCtrl'
            }
         }
     })
    .state('durTab.durPictures', {
        url: '/durPictures',
        views: {
            'durTab-pictures': {
                templateUrl: 'templates/durTab-pictures.html',
                controller: 'DurPicturesCtrl'
            }
        }
    })
    .state('tab.allEvents', {
        url: '/allEvents',
        views: {
            'tab-allEvents': {
                templateUrl: 'templates/tab-events.html',
                controller: 'AllEventsCtrl'
            }
        }
    })
    .state('tab.myEvents', {
        url: '/myEvents',
        views: {
            'tab-myEvents': {
                templateUrl: 'templates/tab-myevents.html',
                controller: 'MyEventsCtrl'
            }
        }
    })
      .state('tab.event-details', {
          url: '/eventDetails/:eventId',
          views: {
              'tab-allEvents': {
                  templateUrl: 'templates/event-details.html',
                  controller: 'EventDetailCtrl'
              }
          }
      })
          .state('tab.myevent-details', {
              url: '/myEventDetails/:eventId',
              views: {
                  'tab-myEvents': {
                      templateUrl: 'templates/event-details.html',
                      controller: 'EventDetailCtrl'
                  }
              }
          })

    //.state('tab.pictures', {
    //    url: '/pictures',
    //    views: {
    //        'tab-pictures': {
    //            templateUrl: 'templates/tab-pictures.html',
    //            controller: 'PicturesCtrl'
    //        }
    //    }
    //})

    .state('tab.picture-detail', {
        url: '/pictures/:pictureId',
        views: {
            'tab-pictures': {
                templateUrl: 'templates/picture-detail.html',
                controller: 'PictureDetailCtrl'
            }
        }
    })

    .state('tab.takePicture', {
        url: '/takePicture',
        views: {
            'takePicture': {
                templateUrl: 'templates/takePicture.html',
                controller: 'TakePictureCtrl'
            }
        }
    })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    //if (loggined === null) {
    //    $urlRouterProvider.otherwise('/login');
    //} else {
    $urlRouterProvider.otherwise('/tab/myEvents');
    //}

})
.run(function ($ionicPlatform, $rootScope, $state, AuthService, AUTH_EVENTS) {

    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

        if (!AuthService.isAuthenticated()) {
            if (next.name !== 'login' && next.name !== 'signup') {
                event.preventDefault();
                $state.go('login');
            }
        }
    });
    //notification code
    //$rootScope.$on('cloud:push:notification', function (event, data) {
    //    var msg = data.message;
    //    alert(msg.title + ': ' + msg.text);
    //});
    $ionicPlatform.ready(function () {
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

    });

    $rootScope.$on('cloud:push:notification', function (event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
    });

});