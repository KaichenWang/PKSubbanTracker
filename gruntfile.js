module.exports = function(grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'app/static/js/scripts.js',
                dest: 'static/scripts.min.js'
            }
        },
		less: {
			compile: {
				files: {
					'app/static/css/styles.css' : 'app/static/less/styles.less'
				}
			}
		},
        cssmin: {
            compress: {
                files: {
                    'static/styles.min.css': ['app/static/css/styles.css']
                }
            }
        },
		watch: {
            scripts: {
                files: ['gruntfile.js','app/static/js/*.js'],
                tasks: ['uglify'],
                options: {
                    debounceDelay: 250
                }
            },
            less: {
                files: ['app/static/less/*.less', 'app/static/css/*.css'],
                tasks: ['less','cssmin'],
                options: {
                    debounceDelay: 250
                }
            }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['less']);
    grunt.loadNpmTasks('grunt-contrib-cssmin');
}