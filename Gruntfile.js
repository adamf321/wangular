module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    style: 'nested',
                    noCache: true,
                    lineNumbers: true
                },
                files: [{
                    expand: true,
                    src: ['styles/ngpress.scss'],
                    ext: '.css'
                }]
            }
        },
        watch: {
            sass: {
                files: [
                    '**/*.scss'
                ],
                tasks: [
                    'sass:dev'
                ]
            },
            browserifydist: {
                files: [
                    'app/**/*.*', '!app/bundle.js'
                ],
                tasks: [
                    'browserify:dist'
                ]
            },
            browserifylib: {
                files: [
                    'bower_components/**/*.*', '!bower_components/bundle.js'
                ],
                tasks: [
                    'browserify:lib'
                ]
            }
        },
        browserify: {
            dist: {
                files: {
                    'app/bundle.js': ['app/main.js']
                }
            },
            lib: {
                files: {
                    'bower_components/bundle.js': ['bower_components/main.js']
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-wp-i18n');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task
    grunt.registerTask('default', []);

    // Dev task
    grunt.registerTask('dev', [
        'sass:dev',
        'browserify',
        'watch'
    ]);
};