is_log_in = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/user/login');
	}
};

is_admin = function(req, res, next) {
	if(req.isAuthenticated() && req.user.isAdmin) {
		return next();
	} else {
		req.flash('error_msg','You are not admin');
		res.redirect('/user');
	}
};

module.exports = function (auth_setting) {
	if (auth_setting.isAdmin)
		return is_admin;
	return is_log_in;
}
