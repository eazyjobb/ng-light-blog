var mongoose = require('mongoose');
var user = require('../user');
var promise = require('bluebird');

var tweet_schema = mongoose.Schema({
	user_id: {type: String},
	date: {type: Date},
	description: {type: String},
	type: {type: Boolean},
	agree: {type: Number}
});
/*
tweet_schema.virtual('author').get(function () {
	var res = "[deleted]";

	return user.findById(this.user_id, function (err, user) {
		if (err)
			throw err;
		if (user)
			res = user.name;
		console.log(1);
	});
});
*/
var tweet_table = module.exports = mongoose.model('tweet', tweet_schema);

tweet_table.insert_tweet = function(new_tweet, callback) {
	var query = {user_id: new_tweet.user_id, date: new_tweet.date};

	tweet_table.findOne(query, function (err, tweet) {
		if (err) throw err;

		if (tweet) {
			tweet.msg = new_tweet.msg
			tweet.save(callback);
		}else
			new_tweet.save(callback);
	});
}

tweet_table.get_tweet_by_date = function(date, callback) {
	var st_day = 0, ed_day = 0, st = new Date(), ed = new Date();
	st_day = parseInt(date.getTime() / 1000 / 24 / 3600);
	ed_day = st_day + 1;
	st.setTime(st_day * 24 * 3600 * 1000);
	ed.setTime(ed_day * 24 * 3600 * 1000);

	var query = {date: {"$gte": st, "$lt": ed}};

	return tweet_table.find(query, callback);
}

tweet_table.get_tweet_by_top10 = function(type, callback) {
	return tweet_table.find({type: type}).sort({date: -1}).limit(10).exec();
}

tweet_table.num_of_tweet_before_date = function(date, callback) { 
	var ed_day = 0, ed = new Date();
	ed_day = parseInt(date.getTime() / 1000 / 24 / 3600) + 1;
	ed.setTime(ed_day * 24 * 3600 * 1000);

	var query = {date: {"$lt": ed}};

	return tweet_table.count(query, callback);
}

/*
var tester = new tweet_table({
	user_id: '456',
	date: new Date(),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);
*/
