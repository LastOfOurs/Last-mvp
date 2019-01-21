# Node Module Resolver #

Asynchronous implementation of the [node `require.resolve()`
algorithm](http://nodejs.org/docs/v0.4.8/api/all.html#all_Together...)
except you can pass in the file to compute paths relatively to along with your
own `require.paths` without updating the global copy (which doesn't even work in
node `>=0.5`).

# methods #

var resolve = require('node-module-resolver');

## resolve.async(pkg, opts, callback) ##

Asynchronously search for the package/filename string `pkg`
according to the [`require.resolve()`
algorithm](http://nodejs.org/docs/v0.4.8/api/all.html#all_Together...)
for `X=pkg` and `Y=opts.basedir`. Callback is fired with the located module or
without arguments if nothing is found.

### Default values for `opts` ###

````javascript
{
    paths : [],
    basedir : __dirname,
    extensions : [ '.js' ],
    readFileSync : fs.readFileSync,
    isFile : function (file) {
        return path.existSync(file) && fs.statSync(file).isFile()
    }
}
````

Optionally you can specify a `opts.packageFilter` function to map the contents
of `JSON.parse()`'d package.json files.

If nothing is found, all of the directories in `opts.paths` are searched.

## resolve.isCore(pkg) ##

Return whether a package is in core.

# Thanks #

To the Node team for documenting what their mad-cap system is, and James Halliday
for the synchronous implementation Node-Module-Resolver is forked from.
