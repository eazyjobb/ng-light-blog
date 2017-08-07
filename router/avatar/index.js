var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	fs = require('fs'),
	user = require('../../model/user');

router.get('/req_id', function(req, res) {
	var avatar_location = './static/user/' + req.user._id + '/avatar.jpg';
	var avatar_url = '/static/user/' + req.user._id + '/avatar.jpg';
	fs.access(avatar_location, fs.constants.F_OK, function (err) {
		if (err)
			avatar_url = '/static/img/default-avatar.jpg';
		res.redirect(avatar_url);
	});
});

router.get('/user_id/*', function(req, res) {
	var name = req.params[0];
	user.get_user_by_user_name(name, function (err, user) {
		if (err) throw err;

		var id = (user) ? (user._id) : (0);

		var avatar_location = './static/user/' + id + '/avatar.jpg';
		var avatar_url = '/static/user/' + id + '/avatar.jpg';

		fs.access(avatar_location, fs.constants.F_OK, function (err) {
			if (err)
				avatar_url = '/static/img/default-avatar.jpg';
			res.redirect(avatar_url);
		});

	});
});

module.exports = router;
