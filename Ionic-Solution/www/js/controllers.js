angular.module('herd.controllers', [])

.controller('HomeCtrl', function($scope, meetupSessionDataService) {

      $scope.sessions = [];

      meetupSessionDataService.getMeetupSessionList().then(function(results){
        if(results && _.isArray(results)){
          _.each(results, function(item){
            $scope.sessions.push({
                  title:item.name,
                  description: item.description,
                  imageUrl:'img/users-header.png',
                  rsvpCount: item.yes_rsvp_count,
                  waitListCount: item.waitlist_count
                }
            );
          });

        }
      }, function(error){
        //TODO: Handle error and show alert message
      });

})

.controller('sessionDetailsController', function($scope){

});
