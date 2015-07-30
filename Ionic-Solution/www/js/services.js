angular.module('herd.services', [])
    .constant('stateManager', {})
.service('meetupSessionDataService', function($q, $http){
        this.getMeetupSessionList = function(){
            var deferred = $q.defer();
            $http.get('https://api.meetup.com/2/events?&sign=true&photo-host=public&text_format=plain&group_urlname=ngHyderabad&status=proposed&page=20&key=32c1922324d801c264c29715164859#results/0/description')
                .success(function(data){
                    deferred.resolve(data.results);
                })
                .error(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        this.getFeedbackQuestions =function(sessionId){
            var deferred = $q.defer();
            $http.get('https://herd-hyd.azurewebsites.net/meetupSession/' + sessionId + '/feedbackQuestions')
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    })

.service('oAuthService', function($q, $http, $window){

        var getTokenFromStorage = function(){
            return $window.localStorage.getItem("accessToken");
        };

        var saveTokenToStorage = function(tokenValue){
            $window.localStorage.setItem("accessToken", tokenValue);
        };

        var authenticateWithMeetup = function(){
            var deferred = q.defer();
            var ref = $window.open('https://secure.meetup.com/oauth2/authorize?client_id=t72ikt2o1g0t032nr8ee7hcam9&response_type=code&redirect_uri=http://localhost/herd', '_blank', 'location=yes')
                .addEventListener("loadstart",function(event){
                    if(event && event.url){
                        console.log("url returned back is " + event.url);
                        if(event.url.indexOf("http://localhost/herd") == 0){//Oauth redirected to callback url
                            var token = event.url.split("code=")[1];
                            deferred.resolve(token);
                        }
                        ref.close();
                    }
                });
            return deferred.promise;
        };

    });