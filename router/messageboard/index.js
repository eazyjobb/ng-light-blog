var express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	user = require('../../model/user'),
	msg_board = require('../../model/msg_board');
	authorized = require('../authorized');

router.get('/data', function (req, res) {
	//res.json({end:1});
	res.json([{
		msg: "123",
		author: "ngzm",
		user_name: "ngzm",
		msg_id:"abcdefg",
		date: new Date().getTime()
	},{
		msg: "456",
		author: "iasfhsadh",
		user_name: "ngzm",
		msg_id:"abcdefg",
		date: new Date().getTime()
	}]);
});

router.get('/get_comment', function (req, res) {
	//res.json({end:1});
	res.json([{
		msg: "123",
		author: "ngzm",
		user_name: "ngzm",
		msg_id:"abcdefg",
		date: new Date().getTime()
	},{
		msg: "456",
		author: "iasfhsadh",
		user_name: "ngzm",
		msg_id:"abcdefg",
		date: new Date().getTime()
	}]);
});

router.get('/', function (req, res) {
	res.send(render.base({
		title:'留言版',
		header: render.header({
			title: '留言版',
			description: '<p>又急又气，正在施工中</p><p>logo呢已经更新了，你说好不好啊</p>',
			login: req.user || false
		}),
		info: render.info(req.flash('info')),
		error: render.error(req.flash('error')),
		content: render.msgb({login: req.user || false}),
		bottom: render.bottom()
	}));
});

router.post('/post', function (req, res) {	
	if (req.body.message.length > 1000) {
		req.flash('error', "tl;dr. too long dont read. 内容长度大于1000！");
		res.end();
		return ;
	}
	var new_msg_board = new msg_board({
		root_id: "NONE",
		reply_id: "NONE",
		user_id: req.user._id,
		msg: req.body.message,
		date: new Date()
	});
	new_msg_board.root_id = new_msg_board._id;
	msg_board.insert_msg(new_msg_board, function(err) {
		if (err)
			throw err;
		req.flash('info', '帖子发布成功');
		res.end();
	});
	res.redirect('./');
});

module.exports = router;
