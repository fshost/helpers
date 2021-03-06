﻿var path = require('path');
var defaultLibDir = 'lib';

/**
 * Helper functions for requiring Node.js modules.
 * @param {String} dirname directory of the calling script.
 * @param Object _exports exports object of the calling script.
 * @param {String} [libDir] relative path to a library subdir.
 * @returns {Object} Helper-methods object.
 */
module.exports = function(dirname, _exports, libDir) {

    libDir = libDir || defaultLibDir;

    function getRelativePath() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(dirname);
        return path.join.apply(path, args);
    }
    /**
     * Require a local Node.js module file relative to dirname
     * @returns {Object} The module.
     */
    function requireSubModule() {
        var subpath = getRelativePath.apply(null, arguments);
        return require(subpath);
    }

    /*
     * Require a relative path module and export it as a property.
     */
    function exportSubModule() {
        var args = Array.prototype.slice.call(arguments);
        var name = camelCase(args.join('-').replace(/\.| /));
        _exports[name] = requireSubModule.apply(null, args);
    }

    /**
     * adds a relative module's properties to a module's exports
     */
    function imports() {
        var args = Array.prototype.slice.call(arguments);
        var subModule = requireSubModule.apply(null, args);
        _exports = extend(_exports, subModule);
        return _exports;
    }

    /*
     * Export a local module file from 'lib' subdir as a property.
     */
    function exportLibSubModule() {
        var args = Array.prototype.slice.call(arguments);
        var name = args.length ? camelCase(args.join('-')
            .replace(/\.| /)) : 'lib';
        args.unshift(dirname, libDir);
        var subpath = path.join.apply(path, args);
        _exports[name] = require(subpath);
    }

    /**
     * adds a relative module's properties to a module's exports
     */
    function importsFromLib() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(libDir);
        var subModule = requireSubModule.apply(null, args);
        _exports = extend(_exports, subModule);
        return _exports;
    }


    var helpers = {
        relpath: getRelativePath,
        libpath: getRelativePath.bind(null, libDir),
        require: requireSubModule,
        exports: exportSubModule,
        imports: imports,
        lib: {
            require: requireSubModule.bind(null, libDir),
            exports: exportLibSubModule,
            imports: importsFromLib
        }
    };

    return helpers;

};


/**
 * Convert string with dashes to camelCase string
 * @param str {String} A string that may contain dashes
 * @returns {String} A camelCase string
 */
function camelCase(str) {
    var result = str.replace(/-([a-z])/ig, function(word, letter) {
        return letter.toUpperCase();
    });
    return result;
}

/**
 * Extends target object with source object
 * @param target {Object} target object to extend
 * @param target {Object} source object
 * @returns {Object} extended target object
 */
function extend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}