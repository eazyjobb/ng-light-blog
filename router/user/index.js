var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	passport = require('passport'), 
	local_strategy = require('passport-local').Strategy,
	authorized = require('../authorized'),
	user_table = require('../../model/user');

passport.use(new local_strategy(
	function(user_name, password, done) {
		user_table.get_user_by_user_name(user_name, function (err, user) {
			if (err) throw err;
			if (!user)
				return done(null, false, {message: 'No such user'});

			user_table.compare_password(password, user.password, function (err, Match) {
				if (err) throw err;
				if (Match)
					return done(null, user);
				return done(null, false, {message: 'Incorrect password'});
			});
		});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	user_table.get_user_by_id(id, function (err, user) {
		done(err, user);
	});
});

router.get('/', authorized(), function (req, res) {
	res.send(render.base({
		title: 'User Page',
		error: render.error(req.flash('error')),
		info: render.info(req.flash('info'))
	}));
});

router.get('/login',
	authorized({notLogin: true}),
	function (req, res) {
		res.send(render.base({
			title: 'Log In',
			content: render.login(),
			error: render.error(req.flash('error')),
			info: render.info(req.flash('info'))
		}));
	}
);

router.get('/register',
	authorized({notLogin: true}),
	function (req, res) {
		res.send(render.base({
			title: 'Register',
			content: render.register(),
			error: render.error(req.flash('error')),
			info: render.info(req.flash('info'))
		}));
	}
);

router.post('/login',
	authorized({notLogin: true}),
	passport.authenticate('local', {
		successRedirect:'/user', 
		failureRedirect:'/user/login', 
		failureFlash: true
	}), 
	function (req, res) {
		res.redirect('/user');
	}
);

router.post('/register',
	authorized({notLogin: true}),
	function (req, res) {
		
		req.checkBody('user_name', 'UserID is required').notEmpty();
		req.checkBody('user_name', 'UserID should be alphanumeric').isAlphanumeric();
		req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password', 'Password is too short').len(6, 100);
		req.checkBody('password-rep', 'Passwords do not match').equals(req.body.password);

		var errors = req.validationErrors();

		if (errors) {
			for (var x in errors)
				req.flash('error', errors[x]);
			//console.log(errors);
			res.redirect('/user/register');
			return;
		}

		user_table.get_user_by_user_name(req.body.user_name, function (err, user) {
			if (err) throw err;
			if (user) {
				req.flash('error', 'user_name exist');
				res.redirect('/user/register');
				return;
			}
			
			var new_user = new user_table({
				name: req.body.name,
				email: req.body.email,
				user_name: req.body.user_name,
				password: req.body.password,
				isAdmin: false
			});

			user_table.create_user(new_user, function(err, user){
				if(err) {
					req.flash('error', 'server error');
					res.redirect('/user/register');
					throw err;
				}

				//console.log(user);
				req.flash('info', "Registration Completed");
				res.redirect('/user/login');
			});
		});
	}
);

router.get('/logout',
	authorized(),
	function (req, res){
		req.logout();
		req.flash('info', 'Logout Successful');
		res.redirect('/user/login');
	}
);

module.exports = router;
