# TOC
   - [node-helpers](#node-helpers)
<a name=""></a>
 
<a name="node-helpers"></a>
# node-helpers
has a function to require submodules relative to the current module by name.

```js
h.sub('fixtures').test.should.equal('test-value');
```

has a function to export a submodule namespace by name.

```js
h.exp('fixtures');
        exports.fixtures.test.should.equal('test-value');
        delete exports.fixtures;
```

has a function to export submodule methods with current module methods and as a namespace.

```js
h.mixin('fixtures');
        exports.test.should.equal('test-value');
        exports.fixtures.test.should.equal('test-value');
        exports.test.should.equal(exports.fixtures.test);
        delete exports.fixtures;
        delete exports.test;
```

has a function to export submodule methods with current module methods but not as a namespace.

```js
h.mixin('fixtures', true);
        exports.test.should.equal('test-value');
        expect(exports.fixtures).to.be.undefined;
```

