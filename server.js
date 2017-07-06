var http = require('http'), 
	express = require('express'), 
	render = require('./render'), 
	router = require('./router'), 
	port = undefined, 
	session = require('express-session'), 
	app = express(), 
	flash = require('connect-flash'), 
	passport = require('passport'), 
	body_parser = require('body-parser'), 
	cookie_parser = require('cookie-parser'),
	express_validator = require('express-validator'), 
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginapp', {
	useMongoClient: true
});

var db = mongoose.connection;

// in production
// app.set('view cache', true);

app.use('/static', express.static('static'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cookie_parser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express_validator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.'), 
			root = namespace.shift(), 
			formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}

		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));

app.use(flash());

app.use('/', router);

var server = app.listen(port || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	if (host === '::') {
		host = 'localhost';
	}

	console.log('listening at http://%s:%s', host, port);
});
