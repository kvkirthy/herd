angular.module('herd.controllers', [])

.controller('HomeCtrl', function($scope, meetupSessionDataService, $state, stateManager, $ionicLoading) {

        $scope.sessions = [];

        function getMeetupSessionList(){
            $ionicLoading.show({
                noBackdrop: false,
                template: '<p class="text-center"><div><ion-spinner icon="lines"/></div> <span style="font-size:9pt;">Working on it...</span></p>'
            });

            meetupSessionDataService.getMeetupSessionList().then(function(results){
                $ionicLoading.hide();
                if(results && _.isArray(results)){
                    _.each(results, function(item){
                        $scope.sessions.push({
                                id:item.id,
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
                $ionicLoading.hide();
                //TODO: Handle error and show alert message
            });
        }

        getMeetupSessionList();

        $scope.goToDetails = function(item){
            stateManager.selectedMeetupSession = item;
            $state.go('tab.meetupSessionDetails');
        };


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

})

.controller('meetupSessionFeedback', function($scope, meetupSessionDataService, stateManager, $ionicLoading){

        $scope.isPageReady = false;

        function getFeedbackQuestions(){
            $ionicLoading.show({
                noBackdrop: false,
                template: '<p class="text-center"><div><ion-spinner icon="lines"/></div> <span style="font-size:9pt;">Working on it...</span></p>'
            });
            meetupSessionDataService.getFeedbackQuestions((stateManager.selectedMeetupSession || {}).id)
                .then(function(result){
                    $scope.questions = result;
                    $scope.isPageReady =true;
                    $ionicLoading.hide();
                }, function(error){
                    console.error(error);
                    $ionicLoading.hide();
                });
        }

        getFeedbackQuestions();
    })

;
