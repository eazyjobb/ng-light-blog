var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'), 
	authorized = require('../authorized'),
	tweet = require('../../model/tweet'),
	user = require('../../model/user'),
	promise = require('bluebird');

router.get('/', function (req, res) {
	var happiness = [], sadness = [];

	promise.delay(0).then(function () {
		return tweet
			.get_tweet_by_top10(true)
			.populate({ path: 'user', select: 'name'})
			.exec(function(error, tweet) {
				tweet.forEach(function (entry) {
					happiness.push({
						author:entry.user.name,
						date: entry.date,
						description: entry.description	
					});
				});
			}).catch(function (err) {console.log(err);});
	}).then(function () {
		return tweet
			.get_tweet_by_top10(false)
			.populate({ path: 'user', select: 'name'})
			.exec(function(error, tweet) {
				tweet.forEach(function (entry) {
					sadness.push({
						author:entry.user.name,
						date: entry.date,
						description: entry.description	
					});
				});
			}).catch(function (err) {console.log(err);});
	}).then(function () {
		res.send(render.base({
			title: '今日事',
			header: render.header({
				title: '今日事',
				description: '<p>又急又气，正在施工中</p><p>logo呢已经更新了，你说好不好啊</p>',
				login: req.user || false,
				notice_info: false
			}),
			content: render.today({
				happiness: happiness,
				sadness: sadness,
			}),
			bottom: render.bottom()
		}));
	}).catch(function (err) {console.log(err); res.end();});
});

router.get('/history/data/', function (req, res) {
	var date = new Date(parseInt(req.query.time));
	var happiness = [];
	tweet.get_tweet_by_date(date)
		.populate({ path: 'user', select: 'name'})
		.exec(function(error, tweet) {
			tweet.forEach(function (entry) {
				happiness.push({
					author:entry.user.name,
					type: entry.type,
					description: entry.description	
				});
			});
		})
		.then(function () {
			if (happiness.length == 0) {
				tweet.num_of_tweet_before_date(date).then(function (count) {
					if (count == 0)
						res.json({end:1});
					else
						res.json({empty:1});
				});
			} else res.json(happiness);
		}).catch(function (err) {console.log(err); res.end();});
});

router.get('/history', function (req, res) {
	res.send(render.base({
		title: '当年今日',
		header: render.header({
			title: '当年今日',
			description: '<p>又急又气，正在施工中</p><p>logo呢已经更新了，你说好不好啊</p>',
			login: req.user || false
		}),
		content: render.tweet_history(),
		bottom: render.bottom()
	}));
});

router.post('/update', authorized(), function (req, res) {
	console.log(req.user);
	var id = req.user._id.toString();

	if (req.body.omsg.length > 140) {
		req.flash('error', "tl;dr. too long dont read. 太长不要。");
		res.end();
		return;
	}

	var new_tweet = new tweet({
		user_id: id,
		date: new Date(),
		description: req.body.omsg,
		type: req.body.type,
		agree: 0
	});
	tweet.insert_tweet(new_tweet, function (err) {
		if (err)
			throw err;
		req.flash('info', '更新成功');
		res.end();
	});
});

module.exports = router;
