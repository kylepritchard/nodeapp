angular.module('AdminCtrl', []).controller('AdminController', function($scope, $http, $routeParams, $location, growl) {

    // Ensure any forms are empty of data
    $scope.formData = {};

    // Give options to any redactor instances
    $scope.redactorOptions = {
        imageUpload: '/upload',
        imageManagerJson: '/uploads/imagelist.json',
        fileUpload: '/upload',
        fileManagerJson: '/uploads/filelist.json',
        plugins: ['table', 'video', 'imagemanager', 'filemanager', 'fontsize', 'fontfamily', 'fontcolor']
    };


    // if ($location.path() == '/admin') {
    $http.get('/api/dashboard')
        .success(function(data) {
            $scope.count = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    // };

    // Posts section of admin
    if ($location.path() == '/admin/posts') {
        $http.get('/api/posts')
            .success(function(data) {
                $scope.posts = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Get the individual post
    if ($routeParams.post_title != null) {

        var post_title = $routeParams.post_title;
        $http.get('/api/posts/' + post_title)
            .success(function(data) {
                $scope.post = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    };

    // FUNCTIONS

    // Add a post
    $scope.addPost = function() {
        $http.post('/api/posts', $scope.post)
            .success(function(data) {
                $scope.post = {}; // clear the form so our user is ready to enter another
                $scope.post = data;
                $location.path('/admin/posts');
                // Add a growl type message
                growl.addSuccessMessage("Post Added", {
                    ttl: 5000
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Update a post
    $scope.updatePost = function(post_title) {
        $http.put('/api/posts/' + post_title, $scope.post)
            .success(function(data) {
                $scope.post = data;
                console.log(data);
                // Add a growl type message
                growl.addSuccessMessage("Post Updated", {
                    ttl: 5000
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete a post
    $scope.deletePost = function(post_title) {
        $http.delete('/api/posts/' + post_title)
            .success(function(data) {
                $scope.posts = data;
                // Add a growl type message
                growl.addSuccessMessage("Post Deleted", {
                    ttl: 5000
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Delete a post (from edit post page)
    $scope.deleteEditPost = function(post_title) {
        $http.delete('/api/posts/' + post_title)
            .success(function(data) {
                $location.path('/admin/posts');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});