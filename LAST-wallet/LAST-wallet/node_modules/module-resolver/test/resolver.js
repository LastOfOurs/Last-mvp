var test = require('tap').test;
var resolve = require('../');

function asyncCompletion(t,n){
	return function(){
		if(!--n)
			t.end()
		console.log("TESTCOUNT",n)
	}
}

test('foo', function (t) {
	var dir = __dirname + '/resolver';
	var testEnd= asyncCompletion(t,3)

	resolve.async('./foo', { basedir : dir }, function(found){
		t.equal(found, dir + '/foo.js')
		testEnd()
	})

	resolve.async('./foo.js', { basedir : dir }, function(found){
		t.equal(found, dir + '/foo.js')
		testEnd()
	})

	resolve.async('foo', { basedir : dir }, function(found){
		t.equal(found,undefined)
		testEnd()
	})
});

test('bar', function (t) {
	var dir = __dirname + '/resolver';
	var testEnd= asyncCompletion(t,1)

	resolve.async('foo', { basedir : dir + '/bar' }, function(found){
		t.equal(found, dir + '/bar/node_modules/foo/index.js')
		testEnd()
	})
});

test('baz', function (t) {
	var dir = __dirname + '/resolver';
	var testEnd= asyncCompletion(t,1)

	resolve.async('./baz', { basedir : dir }, function(found){
		t.equal(found, dir + '/baz/quux.js')
		testEnd()
	})
});


test('biz', function (t) {
	var dir = __dirname + '/resolver/biz/node_modules';
	var testEnd= asyncCompletion(t,3)

	resolve.async('./grux', { basedir : dir }, function(found){
		t.equal(found, dir + '/grux/index.js')
		testEnd()
	})

	resolve.async('tiv', { basedir : dir + '/grux' }, function(found){
		t.equal(found, dir + '/tiv/index.js')
		testEnd()
	});
	
	resolve.async('grux', { basedir : dir + '/tiv' }, function(found){
		t.equal(found, dir + '/grux/index.js')
		testEnd()
	});
});


test('normalize', function (t) {
	var dir = __dirname + '/resolver/biz/node_modules/grux';
	var testEnd= asyncCompletion(t,1)

	resolve.async('../grux', { basedir : dir }, function(found){
		t.equal(found, dir + '/index.js')
		testEnd()
	})
});

test('cup', function (t) {
	var dir = __dirname + '/resolver';
	var testEnd= asyncCompletion(t,3)

	resolve.async('./cup', {
			basedir : dir,
			extensions : [ '.js', '.coffee' ]
		}, function(found){
			t.equal(found, dir + '/cup.coffee')
			testEnd()
	})

	resolve.async('./cup.coffee', {
			basedir : dir
		}, function(found){
			t.equal(found, dir + '/cup.coffee')
			testEnd()
	})

	resolve.async('./cup', {
			basedir : dir,
			extensions : [ '.js' ]
		}, function(found){
			t.equal(found,undefined)
			testEnd()
	});
});

test('mug', function (t) {
	var dir = __dirname + '/resolver';
	var testEnd= asyncCompletion(t,3)

	resolve.async('./mug', { basedir : dir }, function(found){
		t.equal(found, dir + '/mug.js')
		testEnd()
	})

	resolve.async('./mug', {
			basedir : dir,
			extensions : [ '.coffee', '.js' ]
		}, function(found){
			t.equal(found, dir + '/mug.coffee')
			testEnd()
	})

	resolve.async('./mug', {
			basedir : dir,
			extensions : [ '.js', '.coffee' ]
		}, function(found){
			t.equal(found, dir + '/mug.js')
			testEnd()
	});
});

test('other path', function (t) {
	var resolverDir = __dirname + '/resolver';
	var dir = resolverDir + '/bar';
	var otherDir = resolverDir + '/other_path';

	var path = require('path');

	var testEnd= asyncCompletion(t,4)

	resolve.async('root', {
		basedir : dir,
		paths: [otherDir] },
		function(found){
			t.equal(found, resolverDir + '/other_path/root.js')
			testEnd()
		})
	
	resolve.async('lib/other-lib', {
		basedir : dir,
		paths: [otherDir] },
		function(found){
			t.equal(found, resolverDir + '/other_path/lib/other-lib.js')
			testEnd()
		})

	resolve.async('root', { basedir : dir, }, function(found){
		t.equal(found,undefined)
		testEnd()
	})
	
	resolve.async('zzz', {
		basedir : dir,
		paths: [otherDir] },
		function(found){
			t.equal(found,undefined)
			testEnd()
		})
});
