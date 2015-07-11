	
	var sessionsListController = function(scope, state, eventsProxy, rootScope, alert){

        rootScope.pageTitle = "Sessions";

        scope.toggleSearchBoxVisibility = function(){
            if(scope.isSearchBoxVisible){
                scope.isSearchBoxVisible = false;
            }else{
                scope.isSearchBoxVisible = true;
            }
        };

        eventsProxy.getNgHyderabadEvents()
            .then(function(response){
                if(response && response.events){
                    scope.sessionsList = response.events;
                    scope.isOldData = response.isCached;
                    scope.dateTimeObtained = response.dateTimeObtained;
                }else{
                    alert.alertUser("Something wrong; Unexpected data returned. Check if there is an updated version of app available.");
                }
            }, function(){
                alert.alertUser("Something wrong; Are you connected to Internet?");
            });

        scope.navigateToSessionDetails = function(id){
            state.go('sessionDetails', {sessionId: id});
        };

	};

	sessionsListController.$inject = ["$scope", "$state", "eventsProxy", "$rootScope", "alertService"];