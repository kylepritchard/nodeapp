// public/js/services/NerdService.js
angular.module('PostsService', []).factory('Posts', ['$http', function($http) {

    return {
        // call to get all nerds
        get: function() {
            return $http.get('/api/posts');
        }
    }

}]);