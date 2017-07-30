var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');
	  
var tweet_schema = mongoose.Schema({
	index: {type: String},
	user_name: {type: String, index: true},
	name: {type: String, index: true},
	date: {type: Date, index: true},
	description: {type: String},
	type: {type: Number},
	agree: {type: Number}
});

var tweet_table = module.exports = mongoose.model('tweet', tweet_schema);

tweet_table.create_tweet = function(new_tweet, callback) {
	// TODO
}

tweet_table.get_tweet_by_name = function(name, callback) {
	var query = {name: name};
	tweet_table.find(query, callback);
}

tweet_table.get_tweet_by_date = function(date, callback) {
	var st_day = 0, ed_day = 0, st = new Date(), ed = new Date();
	st_day = parseInt(date.getTime() / 1000 / 24 / 3600);
	ed_day = st_day + 1;
	st.setTime(st_day * 24 * 3600 * 1000);
	ed.setTime(ed_day * 24 * 3600 * 1000);
	var query = {date: {"$gte": st, "$lt": ed}};
	tweet_table.find(query, callback);
}

tweet_table.get_tweet_by_top10 = function(callback) {
	//set the limit for debug, 
	tweet_table.find({}).sort({date: -1}).limit(2).exec(callback);
}

// the num of tweet include the tweet in query date
tweet_table.num_of_tweet_before_date = function(date, callback) { 
	var ed_day = 0, ed = new Date();
	ed_day = parseInt(date.getTime() / 1000 / 24 / 3600) + 1;
	ed.setTime(ed_day * 24 * 3600 * 1000);
	var query = {date: {"$lt": ed}};
	tweet_table.count(query, callback);
}