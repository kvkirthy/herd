var userProfileController  = function(scope, oAuth, window, rootScope, userProfileProxy, q){

    rootScope.pageTitle = "Profile";
    scope.user = userProfileProxy.getUserProfileData();

    var permanentStorage = window.localStorage;
    var accessToken = permanentStorage.getItem("accessToken");
    var getAccessToken = function(){
        oAuth.meetup("t72ikt2o1g0t032nr8ee7hcam9").then(function(result) {
            console.log("Response Object -> " + JSON.stringify(result));
            if(result && result.access_token){
                accessToken = result.access_token;
                permanentStorage.setItem("accessToken", result.access_token);
                scope.statusMessage = "New Access Token Set -> " + accessToken;
            }else{
                // show failure to obtain access Token

                scope.statusMessage = "Unable to authenticate with Meetup. If you have declined access, will not be able to link you on Herd with Meetup.";
            }
        }, function(error) {
            scope.statusMessage = "Error -> " + error;
            console.log("Error -> " + error);
        });

    };
    var authenticateWithMeetup = function(){

        var deferred = q.defer();
        var ref = window.open('https://secure.meetup.com/oauth2/authorize?client_id=t72ikt2o1g0t032nr8ee7hcam9&response_type=code&redirect_uri=http://localhost/herd', '_blank', 'location=yes')
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

    if(accessToken) {
        scope.statusMessage = "access token from permanent storage " + accessToken;
        //now make a call to meetup service to get user information.
    }else{
        //getAccessToken();
        authenticateWithMeetup().then(function(response){
            console.log("token response " + response);
        }, function(error){
            console.log("Error with OAuthentication" + error);
        });
    };

};

userProfileController.$inject = ["$scope", "$cordovaOauth", "$window", "$rootScope", "userProfileProxy", "$q"];