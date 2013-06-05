### node-helpers

Some simple methods to require and export Node.js modules from a 'lib' subdirectory.

#### why

Using '.' when requiring relative paths does not always work correctly when running a node.js script from a cwd other than the one the original script is in, e.g. if running
    npm test
in the project root, require statements with '.' in the paths will fail in Windows.  This being the case, I wrote my code to require modules something like

    var path = require('path');
    var lib1 = require(path.join(__dirname, 'lib', 'lib1');

As I began to use a standard structure for Node.js projects that had the main entrypoint consisting only of lines of code to require and exporting library modules, where the real code resides, e.g. suppose you have a directory structure like

    index.js
    /lib
        - lib1.js
        - lib2.js
        - lib3.js


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

#### license: MIT
see LICENSE.txt for more info
