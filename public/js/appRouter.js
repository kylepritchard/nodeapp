angular.module('appRouter', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
        templateUrl: '/views/partials/home.html',
        controller: 'HomeController'
    })

    // nerds page that will use the NerdController
    .when('/posts', {
        templateUrl: '/views/partials/post.html',
        controller: 'PostsController'
    });

    $locationProvider.html5Mode(true);

}]);