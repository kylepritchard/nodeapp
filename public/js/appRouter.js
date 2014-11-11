angular.module('appRouter', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // HOMEPAGE
        .when('/', {
        templateUrl: '/views/partials/home.html',
        controller: 'HomeController'
    })

    // POSTS
    .when('/posts', {
        templateUrl: '/views/partials/post.html',
        controller: 'PostsController'
    })

    // ADMIN
    .when('/admin', {
        templateUrl: '/views/partials/admin/dashboard.html',
        controller: 'AdminController'
    })

    .when('/admin/posts', {
        templateUrl: '/views/partials/admin/posts.html',
        controller: 'AdminController'
    })

    .when('/admin/posts/addnewpost', {
        templateUrl: '/views/partials/admin/addpost.html',
        controller: 'AdminController'
    })

    .when('/admin/posts/:post_title', {
        templateUrl: '/views/partials/admin/editpost.html',
        controller: 'AdminController'
    })


    ;

    $locationProvider.html5Mode(true);

}]);