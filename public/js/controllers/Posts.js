angular.module('PostsCtrl', []).controller('PostsController', function($scope, $http) {

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

    //GET posts
    $http.get('/api/posts')
        .success(function(data) {
            $scope.posts = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    // when submitting the add form, send the text to the node API
    $scope.createPost = function() {
        $http.post('/api/posts', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.posts = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // when submitting the add form, send the text to the node API
    $scope.deletePost = function(post_title) {
        $http.delete('/api/posts/' + post_title)
            .success(function(data) {
                $scope.posts = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});