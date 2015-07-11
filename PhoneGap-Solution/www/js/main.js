angular.module("feedbackMain", ['ngMaterial', 'ui.router', 'angular-carousel', 'ngSanitize', 'ngCordovaOauth'])
	.config(['$mdThemingProvider',
		'$stateProvider',
		'$urlRouterProvider',
		function($mdThemingProvider,
		$stateProvider,
		$urlRouterProvider ) {

            var background = $mdThemingProvider.extendPalette('cyan', {
                '900': '006064'
            });
            $mdThemingProvider.definePalette('background', background);

            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('orange');

            $mdThemingProvider.theme('alternate')
                .primaryPalette('cyan',{
                    'default': '900'
                })
                .backgroundPalette('yellow',{
                    'default': '900' +
                    ''
                });

            $mdThemingProvider.theme('side-nav')
                .backgroundPalette('background');

            $stateProvider
                .state("main",{
                    url:"/main",
                    controller: "mainContainerController",
                    templateUrl: "views/mainContainer.html"
                })
                .state("main.sessionList",{
                    url:"/sessionList",
                    controller: "sessionsListController",
                    templateUrl: "views/sessionList.html"
                })
                .state("findSession",{
                    url: "/findSession",
                    controller: "sessionController",
                    templateUrl: "views/findSession.html"
                })
                .state("sessionDetails",{
                    url: "/sessionDetails/:sessionId",
                    controller: "sessionDetailsController",
                    templateUrl: "views/sessionDetails.html"
                })
                .state("main.userProfile", {
                    url:"/userProfile",
                    controller: "userProfileController",
                    templateUrl: "views/userProfile.html"
                })
                .state("herdCallback", {
                    url:"/herd",
                    templateUrl: "view/herdCallbackTemplate"
                })
                ;

            $urlRouterProvider.otherwise('/main/sessionList');

	}])
    .service("alertService", alertService)
    .service("eventsProxy", eventsProxy)
    .service("userProfileProxy", userProfileProxy)
	.controller("sessionController", sessionController)
	.controller("sessionsListController", sessionsListController)
    .controller("sessionDetailsController", sessionDetailsController)
    .controller("userProfileController", userProfileController)
    .controller("mainContainerController", mainContainerController)
	;