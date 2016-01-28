if(window.name === 'meetupLogin'){
	debugger;
		var queryString = window.location.href.split("#")[1];
		var values = (queryString || "").split("&");
		for(var index in values){
			if(values[index].indexOf("access_token") >= 0){
				var accessToken = values[index].split("=")[1];
				if(accessToken){
					document.cookie = "accessToken=" + accessToken;					
					window.parent.location.reload();
					window.close();
				}
				else{
					document.getElementById("message").innerHtml("<h2>Error getting authorization from Meetup.</h2>")
				}
			}
		}
}

var app = angular.module('herdMain',['ngMaterial', 'ui.router', 'ngCookies'])
.constant('globalState', {

})
.config(['$stateProvider', '$urlRouterProvider', 'globalState', function($stateProvider, $urlRouterProvider, globalState){

	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'app/templates/meetupList.html',
		controller: "meetupListController"
	});

	$urlRouterProvider.otherwise('/home');
}]);

// TODO: move to JSPM
// TODO: Gulp