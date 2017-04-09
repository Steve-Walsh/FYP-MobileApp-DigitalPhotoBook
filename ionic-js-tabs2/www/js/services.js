angular.module('starter.services', [])


.service('AuthService', function ($q, $http, ApiEndpoint, $ionicPush) {
    var LOCAL_TOKEN_KEY = 'photoApp-token';
    var isAuthenticated = false;
    var authToken;




    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    var currentUser = function () {
        if (isAuthenticated) {
            var token = window.localStorage['photoApp-token'];
            var payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email: payload.email,
                name: payload.name,
                id: payload._id
            };
        }
    };

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        isAuthenticated = true;
        authToken = token;

        // Set the token as header for your requests!
        $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var register = function (user) {
        return $q(function (resolve, reject) {
            $http.post(ApiEndpoint.url + 'api/users/registerNewUser', user).then(function (result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    var login = function (user) {
        console.log(user)
        return $q(function (resolve, reject) {
            $http.post(ApiEndpoint.url + 'authenticate', user).then(function (result) {
                console.log("result is : ", result);
                if (result.data.success) {

                    storeUserCredentials(result.data.token);
                    resolve(result.data.msg);

                    $ionicPush.register().then(function (t) {
                        return $ionicPush.saveToken(t);
                    }).then(function (t) {
                        console.log('Token saved:', t.token);
                    });



                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    var logout = function () {
        destroyUserCredentials();
    };

    loadUserCredentials();

    return {
        login: login,
        register: register,
        logout: logout,
        isAuthenticated: function () {
            return isAuthenticated;
        },
        getLoggedInUser: function () {
            return currentUser();
        }
    };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
})




.service('Events', function (ApiEndpoint, $http, $q) {

    var myEvents = {
        "data": [{
            image: "/image/picOne"
        },
    {
        image: "image/picTwo"
    }]
    }

    var getEvent = function (id) {
        $http.get(ApiEndpoint.url + 'api/events/event/' + id).then(function (res) {
            console.log('data ', res.data.event)
            return res.data.event;
        })
    };

    return {
        get: function (id) {
            return getEvent(id);
        },
        getmyEvent: myEvents
    };  
})

.service('chatSocket', function (ApiEndpoint, socketFactory) {

    //Create socket and connect to ApiEndpoint
    var myIoSocket = io.connect("http://34.251.251.67:3000/");
   

    socket = socketFactory({
        ioSocket: myIoSocket
    });



    return socket;  


})






;






















