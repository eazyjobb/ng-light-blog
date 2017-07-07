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

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	user_table.get_user_by_id(id, function (err, user) {
		done(err, user);
	});
});

router.get('/', authorized(), function (req, res) {
	res.send(render.test({text: 'user page'}));
});

router.get('/login',
	authorized({notLogin: true}),
	function (req, res) {
		res.send(render.login());
	}
);

router.get('/register',
	authorized({notLogin: true}),
	function (req, res) {
		res.send(render.register());
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
		
		req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('user_name', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password-rep', 'Passwords do not match').equals(req.body.password);

		var errors = req.validationErrors();

		if (errors) {
			res.send(render.register(errors));
			return;
		}

		user_table.get_user_by_user_name(req.body.user_name, function (err, user) {
			if (err) throw err;
			if (user) {
				res.send(render.register([{param:"user_name", msg:'user_name exist!'}]));
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
					res.send(render.register([{param:"server", msg:'server error'}]));
					throw err;
				}

				console.log(user);
				res.redirect('/user/login');
			});
		});
	}
);

router.get('/logout',
	authorized(),
	function (req, res){
		req.logout();
		req.flash('success_msg', 'You are logged out');
		res.redirect('/user/login');
	}
);

module.exports = router;
