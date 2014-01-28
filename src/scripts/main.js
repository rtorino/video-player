require.config( {
	'paths' : {
		'videojs' : '../bower_components/videojs/video.dev.js'
	},

	'shim' : {
		'videojs' : {
			'exports' : 'videojs'
		}
	}
} );

require( [ app, videojs  ], function ( app, videojs ) {
	console.log( app );
} );