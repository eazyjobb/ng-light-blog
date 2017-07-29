var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'), 
	authorized = require('../authorized');
	tweet_table = require('../../model/tweet');
	
function insert() { // just for debug
	var tweet = new tweet_table({
		index: 'second',
		user_name: 'wmzwmz',
		name: 'wmz2',
		date: new Date(),
		description: 'I love ayaneru too!',
		type: 0,
		agree: 11
	});
	
	tweet.save(function(err, res) {
		if (err) {
			console.log('Err' + err);
		} else {
			console.log('Res' + res);			
		}
	});
}

//insert();

router.get('/', function (req, res) {
	console.log("wmz debugging");
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
	tweet_table.get_tweet_by_name('wmz2', function(err, tweet) {
		console.log('in get_tweet_by_name');
		if (err) throw err;
		console.log(tweet);
		if (tweet) {
			for (var i = 0; i < tweet.length; ++i) {
				//console.log('check' + tweet[i]);
				console.log('check' + tweet[i].name);
				console.log('check' + tweet[i].description);
				console.log('check' + tweet[i].date);
				console.log(i);
				happiness.push({
					author: tweet[i].name,
					description: tweet[i].description,
					date: tweet[i].date
				});
			}
		} else {
			console.log('no tweet');
		}
		console.log('callback end');
		console.log('the happiness' + happiness);
		
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

router.get('/history/data/', function (req, res) {
	//console.log(req.query);
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
