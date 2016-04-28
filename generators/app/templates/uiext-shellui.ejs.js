/**
 * @filedescription Entry point for the ShellUI module.
 */

var OnNewShellUI = function( shellUi ) {

    // This is the start point of the ShellUI module.

    shellUI.Events.Register(
        Event_Started,
        onShellUiStarted.bind( null, shellUi ) );

    shellUI.Events.Register(
        Event_NewShellFrame,
        function( shellFrame ) {

            shellFrame.Events.Register(
                Event_Started,
                onShellFrameStarted.bind( null, shellUi, shellFrame ) );
        } );
};

var onShellUiStarted = function( shellUi ) {

    // Module has finished initialization.

};

var onShellFrameStarted = function( shellUi, shellFrame ) {

    // New shell frame (window) has finished initialization.
};

