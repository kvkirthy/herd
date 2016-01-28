app
.controller("meetupListController", ["$scope", 
	"meetupServices", 
	"$window",
	"$cookies" , function($scope, meetupServices, $window, $cookies){
	var accessToken = $cookies.get("accessToken");
	if(accessToken){
		meetupServices.getUpcomingEvents(accessToken).then(function(result){
			$scope.sessions = result.results;
			console.log(result);
		});
	}
}])
.controller("toolbarController", ['$scope', 
	'globalState', 
	'meetupServices',
	'$cookies',
	function($scope, globalState, meetupServices, $cookies){

		$scope.loginLabel = "Login";
		function getSelfProfileData(){
			var accessToken = $cookies.get("accessToken");
			if(accessToken){
				meetupServices.getSelfUserData(accessToken).then(function(results){
					console.log(results);
					$scope.isLoggedIn=true;
					$scope.userName = results.name;
				});
			}else{
				// show login button
			}
		}

		getSelfProfileData();

	    $scope.login = function(){
	    	window.open('https://secure.meetup.com/oauth2/authorize?client_id=681n6adv95v841q9cl26s0oe6k&response_type=token&redirect_uri=http://127.0.0.1:8080/', 'meetupLogin', 'location=yes');
	    };
}])
;