### node-helpers

<<<<<<< HEAD
Node.js methods to help in getting paths relative to current script and in requiring relative modules

#### why

When using relative paths that use '.' the paths are sometimes not resolved correctly if the current working directory is not the same as the script that requires the relative path.  The solution is to use __dirname.  This is not really an issue when requiring modules, as require is very robust in Node.js, however functionality for requiring relative paths and from a 'lib' subdir are included to help reduce boilerplate code and generally speed up development time for my projects.  This is mostly seen when working with many and/or deeply nested paths in a module.  For just a few require statements this module isn't really helpful as it will not save that much in terms of repetitive coding.  However, to keep the examples succint, they are of course contrived and as such may not be very illustrative of if and when the usefulness of this module becomes more apparent.
=======
Some simple methods to require and export Node.js modules from a 'lib' subdirectory.

#### why

Using '.' when requiring relative paths does not always work correctly when running a node.js script from a cwd other than the one the original script is in, e.g. if running
    npm test
in the project root, require statements with '.' in the paths will fail in Windows.  This being the case, I wrote my code to require modules something like
>>>>>>> b3b6d9bcebd0e7d6755b00ed998270531e6fa2ba

    var path = require('path');
    var lib1 = require(path.join(__dirname, 'lib', 'lib1');

<<<<<<< HEAD
    npm install helpers
=======
As I began to use a standard structure for Node.js projects that had the main entrypoint consisting only of lines of code to require and exporting library modules, where the real code resides, e.g. suppose you have a directory structure like
>>>>>>> b3b6d9bcebd0e7d6755b00ed998270531e6fa2ba

    index.js
    /lib
        - lib1.js
        - lib2.js
        - lib3.js

<<<<<<< HEAD
suppose you have a directory structure like
<pre>
/lib
  - index.js
  - foo.js
  - bar.js
</pre>

and assuming this module is required like so

    var h = require('helpers')(__dirname, exports);

then the following method examples would apply

##### require
require relative modules

    var lib = h.require('lib'),
        foo = h.require('lib/foo'),
        bar = h.require('lib/bar');


##### exports
export a module by name relative to the current module's directory

normally the code for this might be something like

    exports.lib = require(__dirname + '/lib');
    exports.libFoo = require(__dirname + '/lib/foo');
    exports.libBar = require(__dirname + '/lib/bar');
    // etc ad nauseum...

using the helpers exports method reduces this to

    h.exports('lib')
    h.exports('lib/lib1')
    h.exports('lib/lib2')

The above examples are equivalent.  Dash, slash, space, and '.' separated file-names will be converted to camelCase, e.g.

    h.exports('foo/bar/buz')

will result in the buz module being exported as a property with identifier 'fooBarBuz' from the current module


##### imports
extends the properties of a module's exports object with the exported properties of a module at a relative path to the current script

    h.imports('lib')

if the **lib** module had two exported properties 'foo' & 'bar', the current module will now be exporting those properties in addition to any existing and later exports, if any.

####tests
More detailed examples can be seen in the test/test.js file.  If you wish to actually run the tests, cd into the dir node-helpers is installed in.  If you do not already have mocha, chai, and should.js installed globally, you can install them by typing

    npm install

although for mocha, at least, it is recommended that it be installed globally, so you can simply type

    mocha

to run the tests.
=======

my index.js file began to always look something like

    var path = require('path');
    exports.lib1 = require(path.join(__dirname, 'lib', 'lib1');
    exports.lib2 = require(path.join(__dirname, 'lib', 'lib2');
    exports.lib3 = require(path.join(__dirname, 'lib', 'lib3');
    // etc. ad nauseum
    
In my continuing effort to speed up coding I wrote this little module so that my index.js files now look like

    var h = require('helpers')(__dirname, exports);
    h.exp('lib1');
    h.exp('lib2');
    h.exp('lib3');
    
Its faster for me to type, quicker for me to scan, and works (even on Windows).  There are two other usage methods as well - **sub** and **mixin**, which can be used as follows

    // to simply require a module in relative 'lib' subdir
    var lib1 = h.sub('lib1');

    // to add every exported member of a submodule in lib to the current script's export object
    h.mixin('lib1');

The above, or various combinations thereof, gives me enough flexibility to very quickly write my index.js entry-point for a Node.js code library in every scenario I've run into so far.

**tl;dr** - it saves typing and just works

#### installation

npm install helpers
>>>>>>> b3b6d9bcebd0e7d6755b00ed998270531e6fa2ba

#### license: MIT
see LICENSE.txt for more info
