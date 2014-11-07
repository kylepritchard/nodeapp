module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concurrent: {
            serve: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ignore: ['node_modules', 'public/uploads', 'data', 'views'],
                    ext: 'js'
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    linenos: true,
                    compress: false
                },
                files: {
                    'public/css/style.css': 'src/css/*.styl'
                }
            },
            autocompress: {
                files: {
                    'public/css/style.min.css': 'src/css/*.styl'
                }
            },
        },
        concat_css: {
            all: {
                src: ["public/css/*.css"],
                dest: "public/css/compiled.css"
            },
        },
        watch: {
            stylus: {
                files: ['**/*.styl'],
                tasks: ['stylus', 'concat_css'],
                options: {
                    spawn: false,
                },
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');


    // Default task(s).
    grunt.registerTask('default', ['concurrent:serve']);

};