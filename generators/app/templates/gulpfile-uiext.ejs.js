/* eslint-env node */

"use strict";

var gulp = require( "gulp" );
var gutil = require( "gulp-util" );
var eslint = require( "gulp-eslint" );
var insert = require( "gulp-insert" );
var rename = require( "gulp-rename" );
var appdef = require( "gulp-mfiles-appdef" );
var zip = require( "gulp-zip" );
var source = require( "vinyl-source-stream" );
var es = require( "event-stream" );
var watchify = require( "watchify" );
var browserify = require( "browserify" );

var name = "<%= projectName %>";

var entryPoints = [
<% for( var i = 0; i < environments.length; i++ ) { %>
	"lib/<%= environments[ i ] %>.js",
<% } %>
];

var paths = {
	scripts: [ "lib/**/*.js" ],
}

var bundle = function( plugins ) {

	return entryPoints.map( function( entry ) {

		return browserify( {
				entries: [ entry ],
				debug: true,
				cache: {},
				packageCache: {},
				plugin: plugins,
                standalone: "onStart",
			} )
			.bundle()
			.on( "error", gutil.log.bind( gutil, "Browserify Error" ) )
			.pipe( source( entry ) )
            .pipe( insert.append( "var OnNewShellUI = function( shellUI ) { this.onStart( shellUI ); }" ) )
			.pipe( rename( { extname: ".bundle.js" } ) )
			.pipe( gulp.dest( "./build" ) );
	} );
};

gulp.task( "lint", function() {

	return gulp.src( paths.scripts )
		.pipe( eslint() )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() );
} );

gulp.task( "dev", function() {

	var tasks = bundle( [ watchify ] );

	return es.merge.apply( null, tasks );
} );

gulp.task( "build", function() {

	var tasks = bundle();
	tasks.push( gulp.src( "appdef.json" )
        .pipe( appdef() )
        .pipe( rename( { extname: ".xml" } ) )
        .pipe( gulp.dest( "./build" ) ) );

	return es.merge.apply( null, tasks );
} );

gulp.task( "dist", [ "build" ], function() {
    gulp.src( "./build/**/*.*" )
        .pipe( zip( name + ".zip" ) )
        .pipe( gulp.dest( "dist" ) );
} );
