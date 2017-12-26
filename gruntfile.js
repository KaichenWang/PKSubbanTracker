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
			less: {
				files:'app/static/less/*.less',
				tasks:'less'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['less']);
    grunt.loadNpmTasks('grunt-contrib-cssmin');
}