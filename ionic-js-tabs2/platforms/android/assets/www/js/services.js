angular.module('starter.services', [])


.service('AuthService', function ($q, $http, ApiEndpoint, $ionicPush, Options) {
    var LOCAL_TOKEN_KEY = 'photoApp-token';
    var isAuthenticated = false;
    var authToken;


        

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    var getTokenAPI = function () {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        return token;

    }

    var currentUser = function () {
        var getOpts = Options.getOptions();
        var options = JSON.parse(getOpts)
        var res
        if (options.notif == true) {
            $ionicPush.register().then(function (t) {
                console.log($ionicPush.saveToken(t))
                return $ionicPush.saveToken(t);
            }).then(function (t) {
                res = t
                console.log('Token saved:', t.token);
            });
            console.log(res)
        }
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
            $http.post(ApiEndpoint.url + 'api/users/login', user).then(function (result) {
                console.log("result is : ", result);
                if (result.data.success) {

                    storeUserCredentials(result.data.token);
                    resolve(result.data.msg);

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
        },
        getToken: function () {
            return getTokenAPI();
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

.service('Options', function (ApiEndpoint, $http, $q) {
    var LOCAL_EVENT_KEY = "options";


    function setOptionsToken(options) {
        window.localStorage.setItem(LOCAL_EVENT_KEY, options)
    }

    function setOptionsAPI(options) {
        console.log("called set opts")
        var item = JSON.stringify(options)
        window.localStorage.setItem(LOCAL_EVENT_KEY, item)
    }


    var getOptionsAPI = function () {
        var options = window.localStorage.getItem(LOCAL_EVENT_KEY);
        if (options == null) {
            //var option = [{ name: "notif", checked: true }, { name: "chat", checked: true }]
            var option = {notif :true,chat: true }
            setOptionsToken(JSON.stringify(option))
            return option
        }
        return options;
     }

     return {
         changeOptions: function (options) {
             return setOptionsAPI(options)

         },
         getOptions: function () {
             return getOptionsAPI();
         }
     };

})


.service('Events', function (ApiEndpoint, $http, $q, AuthService) {
    var LOCAL_EVENT_KEY = "eventToken";
    addPersonToEvent = function (newAttender, eventId) {
        console.log("add person called")
        var check = false
        $http.get(ApiEndpoint.url + 'api/events/eventDetails/' + eventId, {
            headers: {
                Authorization: 'Bearer ' + AuthService.getToken()
            }
        })
        .success(function (res) {
            if (res.event.adminId == newAttender._id) {
                check = true
            }
            if (res.event.attenders.length > 0) {
                res.event.attenders.forEach(function (p) {
                    if (p.id == newAttender._id) {
                        check = true
                    }
                })
            }
            if (!check) {
                $http.post(ApiEndpoint.url + 'api/events/joinEvent/' + eventId, newAttender, {
                    headers: {
                        Authorization: 'Bearer ' + AuthService.getToken()
                    }
                }).error(function (err) {
                    console.log('error : ' + err)
                })
            }
        })
    }
    leaveAnEvent = function (user) {
        $http.post(ApiEndpoint.url + 'api/events/removeUser', user, {
            headers: {
                Authorization: 'Bearer ' + AuthService.getToken()
            }
        })
        .error(function (err) {
            console.log('error : ' + err)
        })
    }
    
    var myEvents = {
        "data": [{
            image: "/image/picOne"
        },
    {
        image: "image/picTwo"
    }]
    }
    var getEvent = function (id) {
        $http.get(ApiEndpoint.url + 'api/events/event/' + id, {
            headers: {
                Authorization: 'Bearer ' + AuthService.getToken()
            }
        }).then(function (res) {
            console.log('data ', res.data.event)
            return res.data.event;
        })
    };
    var getEventIdAPI = function () {
        var eventId = window.localStorage.getItem(LOCAL_EVENT_KEY);
        console.log("id is ",eventId)
        return eventId;
    }
    var getCurrentEvent = function (loggedInUser) {
        $http.get(ApiEndpoint.url + "api/events/myEvents/" + loggedInUser.id, {
            headers: {
                Authorization: 'Bearer ' + AuthService.getToken()
            }
        }).success(function (res) {
           var check = true
            res.forEach(function(item){
                if (moment(item.startTime) < moment() < moment(item.endTime)) {
                    setEventToken(item._id)
                    check = false
                    console.log("in loop", item)
                    return item
                }
            })
            if (check) {
                delEventToken()
            }
        })
    }
    function setEventToken(id) {
        window.localStorage.setItem(LOCAL_EVENT_KEY, id)
    }
    function delEventToken() {
        window.localStorage.removeItem(LOCAL_EVENT_KEY)
    }
    return {
        get: function (id) {
            return getEvent(id);
        },
        getmyEvent: myEvents,
        currentEvent: function (loggedInUser) {
            return getCurrentEvent(loggedInUser)
            
        },
        getEventId: function () {
            return getEventIdAPI();
       }
    };  
})



.service('chatSocket', function (ApiEndpoint, socketFactory) {

    //Create socket and connect to ApiEndpoint
    var myIoSocket = io.connect("http://34.251.251.67:3000/");
    socket = socketFactory({
        ioSocket: myIoSocket
    });
    return socket;  
});






















