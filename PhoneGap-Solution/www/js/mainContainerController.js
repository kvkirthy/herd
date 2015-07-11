
var mainContainerController = function(scope, mdSidenav, state){

    console.log("window url: " + window.location.href);
    scope.toggleSideMenu = function(){
        mdSidenav("left").toggle();
    };

    scope.navigateToUserProfile = function(){
        state.go('main.userProfile');
        mdSidenav("left").toggle();

    };

    scope.navigateToSessions = function(){
        state.go('main.sessionList');
        mdSidenav("left").toggle();

    };
};

mainContainerController.$inject = ["$scope", "$mdSidenav", "$state"];