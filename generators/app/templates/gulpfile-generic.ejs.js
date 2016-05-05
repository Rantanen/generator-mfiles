/* eslint-env node */

"use strict";

var gulp = require( "gulp" );
var eslint = require( "gulp-eslint" );

var name = "<%= projectName %>";

// Specify the script file paths.
var paths = {
	scripts: [

		// By default use all js-files.
		"**/*.js",

		// Excluding the files under node_modules and this gulpfile.js
		"!node_modules",
		"!gulpfile.js"
	],
};

gulp.task( "lint", function() {

	return gulp.src( paths.scripts )
		.pipe( eslint() )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() );
} );

