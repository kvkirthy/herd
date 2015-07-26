angular.module('herd.controllers', [])

.controller('HomeCtrl', function($scope, meetupSessionDataService, $state, stateManager) {

      $scope.goToDetails = function(item){
        stateManager.selectedMeetupSession = item;
        $state.go('tab.meetupSessionDetails');
      };

      $scope.sessions = [];

      meetupSessionDataService.getMeetupSessionList().then(function(results){
        if(results && _.isArray(results)){
          _.each(results, function(item){
            $scope.sessions.push({
                  title: item.name,
                  description: item.description,
                  imageUrl: 'img/users-header.png',
                  rsvpLimit: item.rsvp_limit,
                  rsvpCount: item.yes_rsvp_count,
                  waitListCount: item.waitlist_count,
                  mode: (item.group)?item.group.join_mode: '',
                  organizerName: (item.group)?item.group.name: ''
                }
            );
          });

        }
      }, function(error){
        //TODO: Handle error and show alert message
      });

})

.controller('meetupSessionDetailsController', function($scope, stateManager, $ionicActionSheet, $state){

    $scope.selectedMeetupSession = stateManager.selectedMeetupSession;

    $scope.getActions = function(){
        $ionicActionSheet.show({
            buttons: [
                { text: 'Feedback' },
                { text: 'Share' }
            ],
            titleText: 'Actions',
            cancelText: 'Cancel',
            cancel: function() {
                return true;
            },
            buttonClicked: function(index) {
                if(index === 0){
                    $state.go('tab.feedback');
                }
                return true;
            }
        });
    };

});
