var fs = require('fs'),
  path = require('path')

// taken from `ls -1 lib` in node 0.6.11
var core = exports.core = [
	'assert', 'buffer_ieee754', 'buffer', 'child_process', 'cluster', 'console',
	'constants', 'crypto', '_debugger', 'dgram', 'dns', 'events', 'freelist',
	'fs', 'http', 'https', '_linklist', 'module', 'net', 'os', 'path',
	'punycode', 'querystring', 'readline', 'repl', 'stream', 'string_decoder',
	'sys', 'timers', 'tls', 'tty', 'url', 'util', 'vm', 'zlib'
].reduce(function (acc, x) { acc[x] = true; return acc }, {});


module.exports = function (x, opts, cbDone) {
	if (core[x]) {
		cbDone(x,x);
		return;
	}
	if (!opts) opts = {};

	var isFile = opts.isFile || function (file,cb) {
		fs.stat(file, function(err,stats) {
			if (stats && stats.isFile()) {
				cb()
			} else {
				cb(true)
			}
		})
	};
	var readFile = opts.readFile || fs.readFile;
	
	var extensions = opts.extensions || [ '', '.js', '.json' ];
	var y = opts.basedir
		|| path.dirname(require.cache[__filename].parent.filename)
	;
	var z= x;

	opts.paths = opts.paths || [];

	if (x.match(/^(?:\.\.?\/|\/|([A-Za-z]:)?\\)/)) {
		var xPath= path.resolve(y, x)
		loadAsFile(xPath, function(err){
			loadAsDirectory(xPath, function(err){
				loadNodeModules(x, y)
			})
		})
	}
	else{
		loadNodeModules(x, y)
	}

	function loadAsFile (x,errback,i) {
		i= i||0
		if(i >= extensions.length){
			// callback only called on failure
			errback(true)
			return 
		}
		isFile(x+extensions[i],function(err){
			if(err){
				loadAsFile(x,errback,i+1)
				return
			}
			// no, don't even pass back the success case, they just had to finish.
			//cb(undefined,x+extension[i])
			cbDone(x+extensions[i],z)
		})
	}
	
	function loadAsDirectory (x, errback) {
		function indexFallback(){
			loadAsFile(path.join( x, '/index'), function(err){
				if(err){
					errback(true)
				}
			})
		}

		var pkgfile = path.join(x, '/package.json');
		isFile(pkgfile,function(err){
			if(err){
				indexFallback()
				return
			}
			readFile(pkgfile, 'utf8', function(err,body){
				if(err){
					indexFallback()
					return
				}

				var pkg
				try {
					pkg = JSON.parse(body);
					if (opts.packageFilter) {
						pkg = opts.packageFilter(pkg)
					}
				} catch(ex) {
				}

				if (pkg && pkg.main) {
					loadAsFile(path.resolve(x, pkg.main), function(err){
						if(err)
							indexFallback()
					})
					return
				}
				indexFallback()
			})
		})
	}

	function _loadNodeModules (x, dirs, errback) {
		var dir= dirs.shift()
		if(!dir){
			errback(true)
			return
		}
		var dirXPath= path.join( dir, '/', x)
		loadAsFile(dirXPath, function(err){
			loadAsDirectory(dirXPath, function(err){
				_loadNodeModules(x, dirs, errback)
			})
		})
	}

	function loadNodeModules (x, start) {
		var dirs = nodeModulesPaths(start);
		_loadNodeModules(x, dirs, function(err){
			// true failure
			cbDone(undefined,z)
		})
	}

	function nodeModulesPaths (start) {
		var splitRe = process.platform === 'win32' ? /[\/\\]/ : /\/+/;
		var parts = start.split(splitRe);

		var dirs = [];
		for (var i = parts.length - 1; i >= 0; i--) {
			if (parts[i] === 'node_modules') continue;
			var dir = path.join(
				path.join.apply(path, parts.slice(0, i + 1)),
				'node_modules'
			);
			if (!parts[0].match(/([A-Za-z]:)/)) {
				dir = '/' + dir;	
			}
			dirs.push(dir);
		}
		return dirs.concat(opts.paths)
	}
};

module.exports.async= module.exports

module.exports.isCore = function (x) { return core[x] };
