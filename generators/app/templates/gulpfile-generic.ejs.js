/* eslint-env node */

"use strict";

var gulp = require( "gulp" );
var eslint = require( "gulp-eslint" );

var name = "<%= projectName %>";

var paths = {
	scripts: [ "**/*.js", "!node_modules", "!gulpfile.js" ],
}

gulp.task( "lint", function() {

	return gulp.src( paths.scripts )
		.pipe( eslint() )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() );
} );

