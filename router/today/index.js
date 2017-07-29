var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'), 
	authorized = require('../authorized');
	tweet_table = require('../../model/tweet');
	
function insert() { // just for debug, 
	var tweet = new tweet_table({
		index: 'first',
		user_name: 'wmz',
		name: 'wmz',
		date: new Date(),
		description: 'I love ayaneru too！',
		type: 0,
		agree: 111
	});
	for (var i = 0; i < 2; ++i)
	tweet.save(function(err, res) {
		if (err) {
			console.log('Err' + err);
		} else {
			console.log('Res' + res);			
		}
	});
	tweet = new tweet_table({
		index: 'second',
		user_name: 'wmz2',
		name: 'wmz2',
		date: new Date('2017/07/28'),
		description: 'I love sakura ayane! 佐仓大法好！',
		type: 0,
		agree: 11
	});
	for (var i = 0; i < 2; ++i)
	tweet.save(function(err, res) {
		if (err) {
			console.log('Err' + err);
		} else {
			console.log('Res' + res);			
		}
	});
	tweet = new tweet_table({
		index: 'third',
		user_name: 'Ng',
		name: 'Ng',
		date: new Date('2017/07/27'),
		description: '末日尼哥上线了',
		type: 0,
		agree: 1111
	});
	for (var i = 0; i < 2; ++i)
	tweet.save(function(err, res) {
		if (err) {
			console.log('Err' + err);
		} else {
			console.log('Res' + res);			
		}
	});
}

//使用方法： 打开注释后重启服务，进入today页面运行insert，然后关闭服务，关闭注释。因为重复调用insert会导致插入多个相同tweet！
//insert();

router.get('/', function (req, res) {
	
	var happiness = [{
				author: "Ng",
				description: "末日尼哥上线了1",
				date: new Date('2017/07/28')
			}];
	happiness.push({
				author: "Ng",
				description: "末日尼哥上线了2",
				date: new Date('2017/07/28')
			});
	
	tweet_table.get_tweet_by_date(new Date(), function(err, tweet) {
		
		if (err) throw err;
		if (tweet) {
			for (var i = 0; i < tweet.length; ++i) {
				console.log(i + ' ' + tweet[i]);
				happiness.push({
					author: tweet[i].name,
					description: tweet[i].description,
					date: tweet[i].date
				});
			}
		} else {
			console.log('no such tweet');
		}
		
		res.send(render.base({
			title: '今日事',
			header: render.header({
				title: '今日事',
				description: '<p>又急又气，正在施工中</p><p>没有logo，你奈我何</p>'
			}),
			
			content: render.today({
				happiness: happiness,
				sadness: [{
					author: "Ng",
					description: "好想吃螺蛳粉",
					date: new Date('2017/07/28')
				},{
					author: "Ng",
					description: "好想吃螺蛳粉好想吃螺蛳粉",
					date: new Date('2017/07/28')
				},{
					author: "Ng",
					description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
					date: new Date('2017/07/28')
				},{
					author: "Ng",
					description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
					date: new Date('2017/07/28')
				},{
					author: "Ng",
					description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
					date: new Date('2017/07/28')
				},{
					author: "Ng",
					description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
					date: new Date('2017/07/28')
				},{
					author: "Ng",
					description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
					date: new Date('2017/07/28')
				},{
					author: "Ng",
					description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
					date: new Date('2017/07/28')
				},{
					author: "Ng",
					description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
					date: new Date('2017/07/28')
				}],
			}),
			bottom: render.bottom()
		}));
	});
	
			/*,{
				author: "Ng",
				description: "末日尼哥上线了2",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了3",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了4",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了5",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了6",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了7",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了8",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了9",
				date: new Date('2017/07/28')
			}];*/
	
});

router.get('/history/data/', function (req, res) { // TODO
	var date = new Date(req.query.date);

	tweet_table.get_tweet_by_date(date, function(err, tweet) {
		if (err) throw err;
		
		console.log("tweet length: " + tweet.length);
		if (tweet.length > 0) {
			var happiness_tweet = [];
			for (var j = 0; j < 6; ++j) // 让单一的推多复制几次进happiness队列
			for (var i = 0; i < tweet.length; ++i) {
				happiness_tweet.push({
					author: tweet[i].name,
					description: tweet[i].description,
					date: tweet[i].date
				});
			}
			res.json({happiness: happiness_tweet});
		} else {
			console.log(date);
			tweet_table.num_of_tweet_before_date(date, function (err, num) {
				console.log("tweet num" + num);
				if (num > 0) {
					res.json({empty: 1});
				} else {
					res.json({end: 1});
				}
				console.log("res!!!!!  ");
				console.log(res);
			});
		}
	});
	
	/*
	res.json({happiness: [{
		author: "Ng",
		description: "末日尼哥上线了",
		date: new Date('2017/07/28')
	},{
		author: "Ng",
		description: "末日尼哥上线了",
		date: new Date('2017/07/28')
	},{
		author: "Ng",
		description: "末日尼哥上线了",
		date: new Date('2017/07/28')
	}], sadness:[{
		author: "Ng",
		description: "末日尼哥上线了",
		date: new Date('2017/07/28')
	},{
		author: "Ng",
		description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
		date: new Date('2017/07/28')
	},{
		author: "Ng",
		description: "好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉好想吃螺蛳粉",
		date: new Date('2017/07/28')
	}]});
	*/
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

module.exports = router;
