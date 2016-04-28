'use strict';
var yeoman = require( 'yeoman-generator' );
var uuid = require( 'node-uuid' );

// var mkdirp = require( 'mkdirp' );

var MFilesGenerator = yeoman.Base.extend(  {

    promptBasics: function() {
        var done = this.async();

        var projectTypes = [
            { value: 'uiext', name: 'M-Files Vault Application' },
            { value: 'generic', name: 'Generic JavaScript project' },
        ];

        var basicPrompts = [
            {
                type: 'input',
                name: 'author',
                message: 'Author name:'
            },
            {
                type: 'input',
                name: 'projectName',
                message: 'Project name:'
            },
            {
                type: 'input',
                name: 'projectDescription',
                message: 'Project description:'
            },
            {
                type: 'list',
                name: 'projectType',
                message: 'Project type:',
                choices: projectTypes,
                default: 0
            }
        ];

        this.prompt( basicPrompts, function( props ) {
            this.props = props;

            console.log( props.projectType );
            if( props.projectType === 'uiext' ) {
                this.promptVaultApp( done );
            } else {
                return done();
            }
        }.bind( this ) );
    },

    promptVaultApp: function( done ) {

        var vaultAppPrompts = [
            {
                type: 'checkbox',
                name: 'environments',
                message: 'Client environments:',
                choices: [
                    { value: 'shellui', name: 'Shell UI' },
                    { value: 'vaultui', name: 'Vault UI' },
                    { value: 'vaultcore', name: 'Vault Core' },
                ]
            }
        ];

        this.prompt( vaultAppPrompts, function( props ) {

            Object.keys( props ).forEach( function( k ) {
                this.props[ k ] = props[ k ];
            }.bind( this ) );

            return done();
        }.bind( this ) );
    },

    writeTemplates: function() {

        this.fs.copyTpl(
            this.templatePath( 'package.ejs.json' ),
            this.destinationPath( 'package.json' ),
            this.props );

        this.fs.copy(
            this.templatePath( 'eslintrc-' + this.props.projectType + '.js' ),
            this.destinationPath( '.eslintrc.js' ) );

        this.fs.copyTpl(
            this.templatePath( 'gulpfile-' + this.props.projectType + '.ejs.js' ),
            this.destinationPath( 'gulpfile.js' ),
            this.props );

        if( this.props.projectType === 'uiext' )
            this.writeAppScaffolding();
    },

    writeAppScaffolding: function() {

        this.props.guid = uuid.v4();

        this.fs.copyTpl(
            this.templatePath( 'appdef.ejs.json' ),
            this.destinationPath( 'appdef.json' ),
            this.props );

        // mkdirp.sync( 'lib' );
        this.props.environments.forEach( function( e ) {
            this.fs.copyTpl(
                this.templatePath( 'uiext-' + e + '.ejs.js' ),
                this.destinationPath( 'lib/' + e + '.js' ),
                { env: e, props: this.props } );
        }.bind( this ) );
    },
} );

module.exports = MFilesGenerator.extend( {

    prompting: function() { this.promptBasics(); },
    writing: function() {
        try {
            this.writeTemplates();
        } catch( ex ) {
            console.log( ex );
            throw ex;
        }
    },

    // install: function() { this.installDependencies(); }
} );
