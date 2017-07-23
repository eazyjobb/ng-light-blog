var http = require('http'), 
	express = require('express'), 
	render = require('./render'), 
	router = require('./router'), 
	port = undefined, 
	session = require('express-session'), 
	MongoStore = require('connect-mongo')(session), 
	app = express(), 
	passport = require('passport'), 
	body_parser = require('body-parser'), 
	express_validator = require('express-validator'), 
	mongoose = require('mongoose'),
	flash = require('connect-flash');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/loginapp', {
	useMongoClient: true
});

// in production
// app.set('view cache', true);

app.use('/static', express.static('static'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(session({
	secret: 'yFJVVsX30jCREvIAeEj9O8zAx5HPMgO',
	saveUninitialized: true,
	resave: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());

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

		return formParam + ' ' + msg + ' ' + value;
	}
}));

app.use('/', router);

var server = app.listen(port || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	if (host === '::') {
		host = 'localhost';
	}

	console.log('listening at http://%s:%s', host, port);
});
