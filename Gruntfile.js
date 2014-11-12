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
                    ignore: ['node_modules', 'public/uploads', 'data', 'src', 'views'],
                    watch: ['routes', 'server', 'public/js'],
                    ext: 'js'
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    compress: false
                },
                files: {
                    'src/css/build/stylus.css': 'src/css/*.styl'
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
        uglify: {
            bundle: {
                files: {
                    'public/js/bundled.min.js': ['public/js/bundle.js']
                }
            }
        },
        browserify: {
            js: {
                src: 'public/js/browserify.js',
                dest: 'public/js/bundle.js',
                tasks: ['uglify']
            }
        },
        watch: {
            stylus: {
                files: ['**/*.styl', '**/*.css'],
                tasks: ['stylus', 'concat_css'],
                options: {
                    spawn: false,
                }
            },
            browserify: {
                files: ['public/js/browserify.js'],
                tasks: ['browserify']
            }
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['shell', 'concurrent:serve']);
    grunt.registerTask('dist', ['shell', 'uncss']);


};