### node-helpers

some simple functions for Node.js to help in normalizing requiring modules across platforms and when run from external scripts such as testing frameworks or npm.

#### why

Running "npm test" does not resolve '.' correctly on my windows x64 pc and I got tired of copying and pasting the boilerplate in this little module just to be able to require my submodules easily.  This module is only (possibly) relevant if you care whether your tests run properly on Windows or not and want to save some minor repetitive effort. 

#### installation

npm install helpers

#### usage

var h = require('helpers')(__dirname, exports);

#### methods

suppose you have a directory structure like
<pre>/lib
  - index.js
  - myLib1.js
  - myLib2.js
</pre>

then the following examples could be taken from index.js:

##### sub
require a module by name relative to the current module's directory
<pre>
var myLib1 = h.sub('myLib1');
// myLib1 = whatever myLib1.js is exporting
</pre>

##### exp
export a module by name relative to the current module's directory
<pre>
h.exp('myLib1');
// exports.myLib1 = whatever myLib1.js is exporting
</pre>


##### mixin
export the properties of a module within the current module
<pre>
h.mixin('myLib1');
// basically the same as if you cut and paste myLib1.js into the current module
</pre>

If the above is not clear take a look at the test.js file.  It is short and easy to understand.

####tests
To run the tests you will need to have mocha installed, then just cd into the dir node-helpers is installed and type:
<pre>mocha</pre>

#### license: MIT
see LICENSE.txt for more info