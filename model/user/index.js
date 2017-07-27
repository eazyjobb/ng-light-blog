var mongoose = require('mongoose'), 
	bcrypt = require('bcryptjs');

var user_schema = mongoose.Schema({
	user_name: {type: String, index: true},
	password: {type: String},
	name: {type: String},
	email: {type: String},
	isAdmin: {type: Boolean}
});

var user_table = module.exports = mongoose.model('User', user_schema);

user_table.create_user = function (new_user, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(new_user.password, salt, function (err, hash) {
			new_user.password = hash;
			new_user.save(callback);
		});
	});
}

user_table.get_user_by_user_name = function(user_name, callback) {
	var query = {user_name: user_name};
	user_table.findOne(query, callback);
}

user_table.get_user_by_id = function(user_id, callback) {
	user_table.findById(user_id, callback);
}


user_table.compare_password = function(password, password_hash, callback) {
	bcrypt.compare(password, password_hash, function(err, match) {
		if(err) throw err;
		callback(null, match);
	});
}
/*
var admin = new user_table({
	name: 'admin',
	email:'',
	user_name: 'admin',
	password: '123456',
	isAdmin: true
});

user_table.create_user(admin, function (err, user) {
	if (err) throw err;
	console.log(user);
});

var normi = new user_table({
	name: 'normi',
	email:'',
	user_name: 'normi',
	password: '123',
	isAdmin: false
});

user_table.create_user(normi, function (err, user) {
	if (err) throw err;
	console.log(user);
});
*/
