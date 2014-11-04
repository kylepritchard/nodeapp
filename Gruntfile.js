module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        stylus: {
            compile: {
                options: {
                    linenos: true,
                    compress: false
                },
                files: {
                    'public/css/comstyle.css': ['src/css/*.styl']
                }
            },
            autocompress: {
                files: {
                    'public/css/comstyle.min.css': 'src/css/*.styl'
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

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};