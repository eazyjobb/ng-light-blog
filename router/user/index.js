var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	passport = require('passport'), 
	local_strategy = require('passport-local').Strategy,
	authorized = require('../authorized'),
	user_table = require('../../model/user');

////////////////////////////////////////////////////////////////////////////////
// wait for database model
////////////////////////////////////////////////////////////////////////////////

passport.use(new local_strategy(
	function(user_name, password, done) {
		user_table.get_user_by_user_name(user_name, function (err, user) {
			if (err) throw err;
			if (!user)
				return done(null, false, {message: 'no such person'});

			user_table.compare_password(password, user.password, function (err, Match) {
				if (err) throw err;
				if (Match)
					return done(null, user);
				return done(null, false, {message: 'wrong password'});
			});
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	user_table.get_user_by_id(id, function (err, user) {
		done(err, user);
	});
});

////////////////////////////////////////////////////////////////////////////////

router.get('/', authorized({isAdmin: false}), function (req, res) {
	res.send(render.test({text: 'user page'}));
});

router.get('/login', function(req, res) {
	if (req.isAuthenticated())
		res.redirect('/user');
	else res.send(render.login());
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
