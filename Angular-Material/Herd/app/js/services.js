app.service('meetupServices', ['networkApiAccess', function(networkApiAccess){
	this.getUpcomingEvents = function(accessToken){
		var url = 'https://api.meetup.com/2/events?access_token=' + accessToken + '&sign=true&photo-host=public&group_urlname=ngHyderabad&status=past&page=20&key=32c1922324d801c264c29715164859#results/8' ;
		return networkApiAccess.getData(url);
	};

	this.getSelfUserData = function(accessToken){
		var url = "https://api.meetup.com/2/member/self?access_token=" + accessToken;
		return networkApiAccess.getData(url);
	};

}])
.service('networkApiAccess', ['$q', '$http', function($q, $http){
	this.getData = function(url){
		var deferred = $q.defer();
		$http.get(url).success(function(result){
			deferred.resolve(result);
		}).error(function(error){
			deferred.reject(error);
		});
		return deferred.promise;
	};
}])

;
