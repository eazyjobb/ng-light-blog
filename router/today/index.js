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
		content: render.today(),
		bottom: render.bottom()
	}));
});

module.exports = router;
