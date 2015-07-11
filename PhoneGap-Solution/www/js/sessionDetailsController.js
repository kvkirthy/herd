var sessionDetailsController = function(scope, mdSidenav, window, stateParams, eventsProxy, alert){

    scope.goBack = function(){
        window.history.back();
    };

    eventsProxy.getSessionById(stateParams.sessionId)
        .then(function(result){
            scope.session = result;
        }, function(){
            alert.alertUser("Unable to get Session Information. Try again please!");
        });

    scope.toggleSideMenu = function(){
        mdSidenav("right").toggle();
    };

};

sessionDetailsController.$inject = ["$scope",
    "$mdSidenav",
    "$window",
    "$stateParams" ,
    "eventsProxy", "alertService"];