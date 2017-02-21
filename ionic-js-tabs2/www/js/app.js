// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
    var loggined = null

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

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
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.pictures', {
            url: '/pictures',
            views: {
                'tab-pictures': {
                    templateUrl: 'templates/tab-pictures.html',
                    controller: 'PicturesCtrl'
                }
            }
  })

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
  if (loggined === null) {
      $urlRouterProvider.otherwise('/login');
  } else {
      $urlRouterProvider.otherwise('/tab/pictures');
  }

});
