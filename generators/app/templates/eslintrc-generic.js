
module.exports = {
    extends: [ 'mfiles' ],

    env: {
        browser: true,
        jquery: true
    },
    
    rules: {
        
        // "new-cap" rule enforces new-operator when calling Capitalized functions.
        // Uncomment the following line when using M-Files COM interfaces from JS.
        // These interfaces use Capital functions for normal functions.
        // "new-cap": 0,
        
        // "no-mixed-html" rule checks for various XSS issues.
        // The rule is specified here so it's easy to change the parameter naming rules,
        // etc. without having to change the shared M-Files config.
        "xss/no-mixed-html": [ "error", {
            "htmlVariableRules": [ "AsHtml$", "HtmlEncoded$", "^html(A-Z|$)", "innerHTML" ],
            "htmlFunctionRules": [ "\.asHtml", "HtmlEncoded$", "Html$" ],
            "functions": {

                // jQuery
                "$": { "htmlInput": true, "safe": [ "document", "this" ] },
                ".html": { "htmlInput": true, "htmlOutput": true },

                // Passthrough
                ".join": { "passthrough": { "obj": true, "args": true } },

                // Encoding functions
                "he.encode": { "htmlOutput": true },
                "utilities.encodehtml": { "htmlOutput": true },
                "utilities.encodecss": { "htmlOutput": true },
                "Number": { "htmlOutput": true }
            }
        } ]
    }
}
