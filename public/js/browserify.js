'use strict';
// Get Angular
require('angular');

// Get extra dependencies
require('../libs/angular-growl/angular-growl.min.js');
require('../libs/angular-route/angular-route.min.js');
require('../libs/angular-sanitize/angular-sanitize.min.js');
require('../libs/angular-redactor/angular-redactor.js');
require('../libs/angular-bootstrap/ui-bootstrap.min.js');
require('../libs/angular-bootstrap/ui-bootstrap-tpls.js');
require('../libs/moment/min/moment.min.js');
require('../libs/angular-moment/angular-moment.js');

// Get Controllers
require('./controllers/Admin');
require('./controllers/Carousel');
require('./controllers/Home');
require('./controllers/Posts');

// Setup App
angular.module('blogApp', [
    'ngRoute',
    'ngSanitize',
    'HomeCtrl',
    'PostsCtrl',
    'CarouselCtrl',
    'AdminCtrl',
    'angular-growl',
    'ui.bootstrap',
    'angular-redactor',
    'angularMoment'

]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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