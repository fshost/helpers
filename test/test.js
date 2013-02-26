var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var assert = require('should');

var nodeHelpers = require(path.join(__dirname, '..'));

describe('node-helpers', function () {

    var h = nodeHelpers(__dirname, exports);

    it('has a function to require submodules relative to the current module by name', function () {
        h.sub('fixtures').test.should.equal('test-value');
    });

    it('has a function to export a submodule namespace by name', function () {
        h.exp('fixtures');
        exports.fixtures.test.should.equal('test-value');
        delete exports.fixtures;
    });

    it('has a function to export submodule methods with current module methods and as a namespace', function () {
        h.mixin('fixtures');
        exports.test.should.equal('test-value');
        exports.fixtures.test.should.equal('test-value');
        exports.test.should.equal(exports.fixtures.test);
        delete exports.fixtures;
        delete exports.test;
    });

    it('has a function to export submodule methods with current module methods but not as a namespace', function () {
        h.mixin('fixtures', true);
        exports.test.should.equal('test-value');
        expect(exports.fixtures).to.be.undefined;
    });

})