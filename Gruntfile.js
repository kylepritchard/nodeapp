module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        shell: {
            mongo: {
                command: 'sh mongorunning.sh',
                options: {
                    async: true,
                    stdout: false,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        detached: false
                    }
                }
            }
        },
        concurrent: {
            serve: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            run: {
                script: 'server.js',
                options: {
                    args: ['--exitcrash'],
                    ignore: ['node_modules', 'public/uploads', 'data'],
                    ext: 'js,handlebars'

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
                    'public/css/stylus.css': 'src/css/*.styl'
                }
            }
        },
        concat_css: {
            all: {
                src: ['src/css/*.css', 'src/css/build/stylus.css'],
                dest: "public/css/style.comb.min.css"
            },
        },
        cssmin: {
            combine: {
                files: {
                    'public/css/style.comb.min.css': ['src/css/*.css', 'src/css/build/stylus.css']
                }
            }
        },
        uncss: {
            dist: {
                options: {
                    urls: ['http://localhost:3000/posts'],
                    stylesheets: [
                        'public/css/bootstrap.min.css',
                        'sb-admin.css',
                    ]
                },
                files: {
                    'public/css/comb.min.css': ['*.*']
                }
            }
        },
        watch: {
            stylus: {
                files: ['**/*.styl', '**/*.css'],
                tasks: ['stylus', 'concat_css'],
                options: {
                    spawn: false,
                },
            },
        }

    });

    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-uncss');

    // Default task(s).
    grunt.registerTask('default', ['shell', 'concurrent:serve']);
    grunt.registerTask('dist', ['shell', 'uncss']);


};