var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	passport = require('passport'), 
	local_strategy = require('passport-local').Strategy,
	authorized = require('../authorized');

////////////////////////////////////////////////////////////////////////////////
// wait for database model
////////////////////////////////////////////////////////////////////////////////

passport.use(new local_strategy(
	function(username, password, done) {
		if (username == '123' && password == '456')
			return done(null, 123);
		return done(null, false, {message: 'Invaild'});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(id, done) {
	done(null, id);
});

////////////////////////////////////////////////////////////////////////////////

router.get('/', authorized, 
	function(req, res) {
		res.redirect('/secure');
	}
);

router.get('/login', function(req, res) {
	res.send(render.login());
});

router.post('/login', 
	passport.authenticate('local', {
		successRedirect:'/user', 
		failureRedirect:'/user/login', 
		failureFlash: true
	}), 
	function(req, res) {
		res.redirect('/user');
	}
);

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/user/login');
});

module.exports = router;
