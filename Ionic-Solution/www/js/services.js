angular.module('herd.services', [])
    .constant('stateManager', {})
.service('meetupSessionDataService', function($q, $http){
        this.getMeetupSessionList = function(isIncludePastSessions){
            var deferred = $q.defer();
            var status = "upcoming";

            if(isIncludePastSessions){
                status = status + ",past";
            }

            $http.get('https://api.meetup.com/2/events?&sign=true&photo-host=public&text_format=plain&group_urlname=ngHyderabad&status=' + status + '&page=20&key=32c1922324d801c264c29715164859#results/0/description')
                .success(function(data){
                    _.sortBy(data.results, function(item){item.time});
                    deferred.resolve(((data.results) || []).reverse());
                })
                .error(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        this.addFeedbackForMeetupSession = function(feedbackData){
            var deferred = $q.defer();
            $http({
                "url":'https://herd-hyd.azurewebsites.net/meetupSession/feedbackResponse',
                "headers":{
                    "Content-Type":"application/json",
                },
                "method": "POST",
                data: feedbackData
            }).success(function(data){
                deferred.resolve(data.results);
            })
            .error(function(error){
                deferred.reject(error);
            });
            return deferred.promise;

        };

        this.getSessionPhoto =function(sessionId){
            var deferred = $q.defer();
            var url="https://api.meetup.com/2/photos?offset=0&format=json&event_id=" + sessionId + "&photo-host=public&page=20&fields=&order=time&desc=True&sig_id=109863862&sig=1f65756819e717059e351048bbb6e7930ca66caf";

            $http.get(url)
                .success(function(data){
                    deferred.resolve(_.find((data.results || []), function(item){
                        return item.caption.toLowerCase() === 'logo';
                    }));
                })
                .error(function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

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
        };
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

    })

.service('announcementService', function($q, $http, $window){
    this.getAnnouncements = function(){
        var deferred = $q.defer();

        $http({
            "url":"https://herd-hyd.azurewebsites.net/announcements",
            "headers":{
                "Content-Type":"application/json",
            },
            "method": "GET"
        }).success(function(data){
            deferred.resolve(data);
        })
        .error(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };
});