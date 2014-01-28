'use strict';

module.exports = function ( grunt ) {

	// load all grunt tasks
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// configurable paths
	var playerConfig = {
		'libs' : 'libs',
		'src'  : 'src',
		'dist' : 'dist'
	};

	grunt.initConfig( {
		'player' : playerConfig,

		'clean' : {
			'dist' : {
				'files' : [ {
					'dot' : true,
					'src' : [
						'.tmp',
						'<%= player.dist %>/*',
						'!<%= player.dist %>/.git*'
					]
				} ]
			}
		},

		'requirejs' : {
			'dist' : {
				'options' : {
					'baseUrl'                 : playerConfig.src + '/scripts',
					'optimize'                : 'none',
					'preserveLicenseComments' : false,
					'useStrict'               : true,
					'wrap'                    : true,
					'name'                    : 'main',
					'out'                     : playerConfig.dist + '/scripts/main.js',
					'mainConfigFile'          : playerConfig.src + '/scripts/main.js'
				}
			}
		},

		'usemin' : {
			'options' : {
				'dirs' : [ '<%= player.dist %>' ]
			},
			'html' : [ '<%= player.dist %>/{,*/}*.html' ],
			'css'  : [ '<%= player.dist %>/styles/{,*/}*.css' ]
		},

		'cssmin' : {
			'dist' : {
				'files' : {
					'<%= player.dist %>/styles/main.css' : [
						'.tmp/styles/{,*/}*.css',
						'<%= player.src >/styles/{,*/}*.css'
					]
				}
			},
			'dist/styles/video-js.css' : 'bower_components/videojs/video-js.css'
		},

		'concat' : {
			'dist/styles/video-js.css' : [ 'dist/styles/video-js.css' ]
		},

		'uglify' : {
			'dist/scripts/main.js' : 'dist/scripts/main.js',
			'dist/bower_components/videojs/videojs.js' : 'bower_components/videojs/video.js'
		},

		'copy' : {
			'dist' : {
				'files' : [ {
					'expand' : true,
					'dot'  : true,
					'cwd'  : '<%= player.src %>',
					'dest' : '<%= player.dist %>',
					'src'  : [
						'*.{ico, png, txt}',
						'.htaccess',
						'images/{,*/}*.{webp, gif}',
						'styles/fonts/*'
					]
				}, {
					'expand' : true,
					'cwd' : '.tmp/images',
					'dest' : '<%= player.dist >/images',
					'src' : [
						'generated/*'
					]
				} ]
			}
		},

		'less' : {
			'dist' : {
				'options' : {
					'ieCompat' : true
				},
				'files' : {
					'.tmp/styles/main.css' : [ '<%= player.src %>/styles/main.less' ]
				}
			}
		},
	} );

	grunt.registerTask( 'toless', [ 'less' ] );

	grunt.registerTask( 'test', [] );

	grunt.registerTask( 'build', [] );

	grunt.registerTask( 'default', [
		'clean:dist',
		'less:dist',
		'requirejs',
		'cssmin',
		'concat',
		'uglify',
		'copy',
		'usemin'
	] );
}