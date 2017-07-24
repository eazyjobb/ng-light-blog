is_log_in = function(req, res, next) {
	if(req.isAuthenticated())
		return next(), null;
	req.flash('info', 'Please log in.');
	res.redirect('/user/login');
};

is_admin = function(req, res, next) {
	if(req.isAuthenticated() && req.user.isAdmin)
		return next(), null;
	req.flash('error', "You're unauthorized.");
	res.redirect('/user');
};

not_log_in = function (req, res, next) {
	if(req.isAuthenticated()) {
		req.flash('error', "You'd already log in.");
		return res.redirect('/user'), null;
	}
	next();
}

module.exports = function (auth_setting) {
	if (!auth_setting)
		return is_log_in;
	if ('notLogin' in auth_setting && auth_setting.notLogin)
		return not_log_in;
	if ('isAdmin' in auth_setting && auth_setting.isAdmin)
		return is_admin;
	return is_log_in;
}
