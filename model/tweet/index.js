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

tweet_schema.virtual('user', {
	ref: 'User',
	localField: 'user_id',
	foreignField: '_id',
	justOne: true
});

var tweet_table = module.exports = mongoose.model('tweet', tweet_schema);

tweet_table.insert_tweet = function(new_tweet, callback) {

	var time = parseInt(new_tweet.date.getTime() / 1000 / 60 / 60 / 24);
	time = time * 24 * 60 * 60 * 1000;
	//console.log(new_tweet.date, new_tweet.date.getTime());
	new_tweet.date = new Date(time);
	//console.log(new_tweet.date, time);

	var query = {user_id: new_tweet.user_id, date: new_tweet.date, type: new_tweet.type};

	tweet_table.findOne(query, function (err, tweet) {
		if (err) throw err;

		if (tweet) {
			//console.log(tweet.date, tweet.description, 1);
			tweet.description = new_tweet.description;
			//console.log(tweet.date, tweet.description, 2);
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
	return tweet_table.find({type: type}).sort({date: -1}).limit(10);
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
	user_id: '597ebcb9a90a8754dc748c08',
	date: new Date('2017/07/30'),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);

tester = new tweet_table({
	user_id: '597ebcb9a90a8754dc748c08',
	date: new Date('2017/07/30'),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);

tester = new tweet_table({
	user_id: '597ebcb9a90a8754dc748c08',
	date: new Date('2017/07/29'),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);

tester = new tweet_table({
	user_id: '597ebcb9a90a8754dc748c08',
	date: new Date('2017/07/28'),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);

tester = new tweet_table({
	user_id: '597ebcb9a90a8754dc748c08',
	date: new Date('2017/07/27'),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);

tester = new tweet_table({
	user_id: '597ebcb9a90a8754dc748c08',
	date: new Date('2017/07/26'),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);

tester = new tweet_table({
	user_id: '597ebcb9a90a8754dc748c08',
	date: new Date('2017/07/25'),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);

tester = new tweet_table({
	user_id: '597ebcb9a90a8754dc748c08',
	date: new Date('2017/07/24'),
	description: '123456',
	type: false,
	agree: 1
});

tweet_table.insert_tweet(tester);
*/