var app = angular.module('blogApp', [
    'ngRoute',
    'appRouter',
    'angular-redactor',
    'ngSanitize',
    'ui.bootstrap',
    'angular-growl',
    'HomeCtrl',
    'PostsCtrl',
    'CarouselCtrl',
    'AdminCtrl',
    'angularMoment'
]);

// Add filters to app

// Filter to allow rendering of html including 'unsafe' elements ie style
// <p ng-bind-html="post.content | unsafe"></p>

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});