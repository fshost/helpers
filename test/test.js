﻿var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var assert = require('should');

var nodeHelpers = require(path.join(__dirname, '..'));

describe('node-helpers', function() {

    var h = nodeHelpers(__dirname, exports);
    var lib = h.lib;

    describe('methods for resolving relative filepaths', function() {

        it('can resolve a filepath relative to the calling scripts path', function() {
            h.relpath('lib').should.equal(path.join(__dirname, 'lib'));
            h.relpath('lib', 'sub').should.equal(path.join(__dirname, 'lib', 'sub'));
            h.relpath('lib/sub').should.equal(path.join(__dirname, 'lib/sub'));
        });

        it('can resolve a filepath relative to a library subdir', function() {
            h.libpath().should.equal(path.join(__dirname, 'lib'));
            h.libpath('sub').should.equal(path.join(__dirname, 'lib', 'sub'));
            h.libpath('sub/lib2.js').should.equal(path.join(__dirname, 'lib/sub/lib2.js'));

        });

        it('can resolve a filepath relative to a specified library subdir', function() {
            // default is 'dir', give it a relative path of ..
            var rel2 = nodeHelpers(__dirname, exports, '..');
            rel2.libpath().should.equal(path.join(__dirname, '..'));
            rel2.libpath('sub').should.equal(path.join(__dirname, '..', 'sub'));
            rel2.libpath('sub/lib2.js').should.equal(path.join(__dirname, '../sub/lib2.js'));
        });

    });

    describe('methods for relative modules', function() {

        it('has a method to require submodules relative to the current module', function() {
            h.require('lib').sub.should.equal('index.js');
            h.require('lib', 'lib1').sub1.should.equal('lib1.js');
            h.require('/lib/lib1').sub1.should.equal('lib1.js');
            h.require('lib', 'sub', 'lib2').sub2.should.equal('lib2.js');
            h.require('/lib/sub/lib2').sub2.should.equal('lib2.js');
            h.require('..').should.equal(nodeHelpers);
        });

        it('has a method to export a submodule relative to the current module', function() {

            h.exports('lib');
            exports.lib.sub.should.equal('index.js');
            delete exports.lib;

            h.exports('lib', 'lib1');
            exports.libLib1.sub1.should.equal('lib1.js');
            delete exports.libLib1;

            h.exports('lib', 'sub', 'lib2');
            exports.libSubLib2.sub2.should.equal('lib2.js');
            delete exports.libSubLib2;

        });

        it('has a method to extend exports with relative submodule methods', function() {

            h.imports('lib');
            h.imports('lib', 'lib1');
            h.imports('lib', 'sub', 'lib2');
            exports.sub.should.equal('index.js');
            exports.sub1.should.equal('lib1.js');
            exports.sub2.should.equal('lib2.js');
            delete exports.sub;
            delete exports.sub1;
            delete exports.sub2;

        });

    });

    describe('has methods for modules in a lib subdirectory', function() {

        it('has a method to require a module from a lib subdirectory', function() {
            lib.require().sub.should.equal('index.js');
            lib.require('lib1').sub1.should.equal('lib1.js');
            lib.require('sub', 'lib2').sub2.should.equal('lib2.js');
            lib.require('sub/lib2').sub2.should.equal('lib2.js');
        });

        it('has a method to export a module from a lib subdirectory', function() {

            lib.exports();
            lib.exports('lib1');
            lib.exports('sub', 'lib2');
            exports.lib.sub.should.equal('index.js');
            exports.lib1.sub1.should.equal('lib1.js');
            exports.subLib2.sub2.should.equal('lib2.js');
            delete exports.lib;
            delete exports.lib1;
            delete exports.subLib2;

        });

        it('has a method to extend exports with module in lib subdirectory', function() {

            lib.imports();
            lib.imports('lib1');
            lib.imports('sub', 'lib2');
            exports.sub.should.equal('index.js');
            exports.sub1.should.equal('lib1.js');
            exports.sub2.should.equal('lib2.js');
            delete exports.lib;
            delete exports.sub1;
            delete exports.sub2;

        });

    });

});