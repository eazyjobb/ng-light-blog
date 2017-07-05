require("dot").process({
	global: "_page.render",
	destination: __dirname + "/render/",
	path: (__dirname + "/templates")
});

var http = require('http'),
	express = require('express'),
	render = require('./render');

var app = express();

// in production
// app.set('view cache', true);

app.get('/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.write(render.dashboard({text:"Good morning!"}));
	res.end();
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	if (host === '::') {
		host = 'localhost';
	}

	console.log('listening at http://%s:%s', host, port);
});
