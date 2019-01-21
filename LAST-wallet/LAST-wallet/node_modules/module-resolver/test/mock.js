var test = require('tap').test;
var resolve = require('../');

function asyncCompletion(t,n){
	return function(){
		if(!--n)
			t.end()
		console.log("TESTCOUNT",n)
		console.error("TESTCOUNT",n)
	}
}

test('mock', function (t) {
	t.plan(3);

	var files = {
		'/foo/bar/baz.js' : 'beep'
	};
	var testEnd= asyncCompletion(t,3)

	function opts (basedir) {
		return {
			basedir : basedir,
			isFile : function (file,cb) {
				cb(files.hasOwnProperty(file)?undefined:true)
			},
			readFile : function (file,format,cb) {
				var is= files[file]
				cb(is?undefined:true,is)
			}
		}
	}

	resolve.async('./baz', opts('/foo/bar'), function(found){
		t.equal(found, '/foo/bar/baz.js')
		testEnd()
	})

	resolve.async('./baz.js', opts('/foo/bar'), function(found){
		t.equal(found, '/foo/bar/baz.js')
		testEnd()
	});

	resolve.async('baz', opts('/foo/bar'), function(found){
		t.equal(found, undefined)
		testEnd()
	});
});

test('mock package', function (t) {
	t.plan(1);
	
	var files = {
		'/foo/node_modules/bar/baz.js' : 'beep',
		'/foo/node_modules/bar/package.json' : JSON.stringify({
			main : './baz.js'
		})
	};
	var testEnd= asyncCompletion(t,1)
	
	function opts (basedir) {
		return {
			basedir : basedir,
			isFile : function (file,cb) {
				cb(files.hasOwnProperty(file)?undefined:true)
			},
			readFile : function (file,format,cb) {
				var is= files[file]
				cb(is?undefined:true,is)
			}
		}
	}
	
	resolve.async('bar', opts('/foo'), function(found){
		t.equal(found, '/foo/node_modules/bar/baz.js')
		testEnd()
	});
});
