var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'), 
	authorized = require('../authorized');

router.get('/', function (req, res) {
	res.send(render.base({
		title: '今日事',
		header: render.header({
			title: '今日事',
			description: '<p>又急又气，正在施工中</p><p>没有logo，你奈我何</p>'
		}),
		content: render.today({
			happiness: [{
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
			},{
				author: "Ng",
				description: "末日尼哥上线了",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了",
				date: new Date('2017/07/28')
			},{
				author: "Ng",
				description: "末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了末日尼哥上线了",
				date: new Date('2017/07/28')
			},{
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
			},{
				author: "Ng",
				description: "末日尼哥上线了",
				date: new Date('2017/07/28')
			}],
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

module.exports = router;
