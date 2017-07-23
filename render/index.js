var path = require('path'),
	fs = require('fs');

function req(name) {
	var module = require("./" + name);
	delete exports[name];
	return exports[name] = module;
}

// compiling render
require("dot").process({
	global: "_page.render",
	destination: __dirname + "/../render/",
	path: (__dirname + "/../templates")
});

//exports render
fs.readdirSync(__dirname).forEach(function(file) {
	if ((file === 'index.js') || (file[0] === '_')) { return; }
	var ext = path.extname(file);
	var stats = fs.statSync(__dirname + '/' + file);
	if (stats.isFile() && !(ext in require.extensions)) { return; }
	var basename = path.basename(file, '.js');
  	exports.__defineGetter__(basename, function() { return req(basename); });
});
