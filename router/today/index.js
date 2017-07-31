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
			.then(function (result) {
				var queue = [];
				result.forEach(function (entry) {
					queue.push(
						user.findById(entry.user_id)
							.then(function (result) {
								happiness.push({
									author:result.name,
									date: entry.date,
									description: entry.description
								});
							})
					);
				});
				return promise.all(queue);
		}).catch(function (err) {console.log(err);});
	}).then(function () {
		return tweet
			.get_tweet_by_top10(false)
			.then(function (result) {
				var queue = [];
				result.forEach(function (entry) {
					queue.push(
						user.findById(entry.user_id)
							.then(function (result) {
								sadness.push({
									author:result.name,
									date: entry.date,
									description: entry.description
								});
							})
					);
				});
				return promise.all(queue);
		}).catch(function (err) {console.log(err);});
	}).then(function () {
		res.send(render.base({
			title: '今日事',
			header: render.header({
				title: '今日事',
				description: '<p>又急又气，正在施工中</p><p>没有logo，你奈我何</p>'
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
	promise.delay(0).then(function () {
		return tweet
			.get_tweet_by_date(date)
			.then(function (result) {
				var queue = [];
				result.forEach(function (entry) {
					queue.push(
						user.findById(entry.user_id)
							.then(function (result) {
								happiness.push({
									author:result.name,
									description: entry.description
								});
							})
					);
				});
				return promise.all(queue);
			})
			.catch(function (err) {console.log(err);});
	}).then(function () {
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
			description: '<p>又急又气，正在施工中</p><p>没有logo，你奈我何</p>'
		}),
		content: render.tweet_history(),
		bottom: render.bottom()
	}));
});

router.post('/update', authorized(), function (req, res) {
	var id = req.user._id.toString();
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
