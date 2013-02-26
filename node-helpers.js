/// <reference path="../nodelib/node.js" />
var path = require('path');

module.exports = function (filepath, _exports) {
    /// <summary>Helper functions for requiring Node.js modules.</summary>
    /// <param name="filepath" type="String">The filepath of the current module.</param>
    /// <param name="_exports" type="Object">The _exports property of the current module.</param>
    /// <returns type="Object">Helper-methods object.</returns>

    var dirname = filepath || process.cwd();

    function submodule(name) {
        /// <summary>Require a local Node.js module file.</summary>
        /// <param name="name" type="String">The filename of the module.</param>
        /// <returns type="Object">The Node.js module.</returns>
        return require(path.resolve(dirname + path.sep + name));
    }

    function exp(name) {
        /// <summary>Export a local module file as a property.</summary>
        /// <param name="name" type="String">The filename of the module.</param>
        _exports[name] = submodule(name);
    }

    function mixin(name, excludeNs) {
        /// <summary>Mixin a local module file's methods with root namespace.</summary>
        /// <param name="name" type="String">The filename of the module.</param>
        /// <param name="excludeNs" type="Boolean" optional="true">Whether to export module as a namespace also (default is true).</param>
        var sub = submodule(name);
        for (var key in sub) {
            if (sub.hasOwnProperty(key)) {
                _exports[key] = sub[key];
            }
        }
        if (!excludeNs) {
            // include methods in namespaced module
            exp(name);
        }
    }

    return {
        sub: submodule,
        exp: exp,
        mixin: mixin
    };

};
