var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	user = require('../../model/user'),
	authorized = require('../authorized');

router.get('/', function (req, res) {
	res.send(render.base({
		title:'留言版',
		header: render.header({
			title: '留言版',
			description: '<p>又急又气，正在施工中</p><p>没有logo，你奈我何</p>',
			login: req.user || false
		}),
		info: render.info(req.flash('info')),
		error: render.error(req.flash('error')),
		content: render.msgb({
			login: req.user || false
		}),
		bottom: render.bottom()
	}));
});

router.post('/post', function (req, res) {

	console.log(req.body);

	res.redirect('./');
});

module.exports = router;
