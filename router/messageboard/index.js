var promise = require('bluebird'),
	express = require('express'), 
	router = express.Router(), 
	render = require('../../render'),
	user = require('../../model/user'),
	msg_board = require('../../model/msg_board'),
	authorized = require('../authorized'),
	ref_link = require('../../model/ref_link');

router.get('/data', function (req, res) {
	//res.json({end:1});
	var msg = [];
	var date = new Date(parseInt(req.query.time));
	
	promise.delay(0).then(function () {
		return msg_board.get_ten_root_msg_before_time(date)
		.populate({path: 'user', select: {'name': 1, 'user_name': 1}})
		.exec(function (err, res) {
			res.forEach(function (entry) {
				msg.push({
					msg: entry.msg,
					author: entry.user.name,
					user_name: entry.user.user_name,
					msg_id: entry._id,
					date: entry.date
				});
			});
		});
	}).then(function () {
		if (msg.length == 0) {
			res.json({end:1});
			return ;
		}
		res.json(msg);		
	}).catch(function (err) { console.log(err); });
});

router.get('/get_comment', function (req, res) {
	var msg = [];
	var root_id = req.query.msg_id;
	
	promise.delay(0).then(function () {
		return msg_board.get_msg_by_root_id(root_id)
						.populate({path: 'user', select: {'name': 1, 'user_name': 1}})
						.exec(function (err, res) {
							res.forEach(function (entry) {
								msg.push({
									msg: entry.msg,
									author: entry.user.name,
									user_name: entry.user.user_name,
									msg_id: entry.msg_id,
									date: entry.date
								});
							});
						});
				
	}).then(function () {
		res.json(msg);
	}).catch(function (err) { console.log(err); });
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
	if (req.body.message.length < 5) {
		req.flash('error', "你太短了，长一点吧");
		res.end();
		return;
	}

	var p_msg = req.body.message
		.replace(/\r/g, '')
		.replace(/\n/g, ' </br>');

	var new_msg_board = new msg_board({
		root_id: "NONE",
		reply_id: "NONE",
		user_id: req.user._id,
		msg: p_msg,
		date: new Date()
	});
	//new_msg_board.root_id = new_msg_board._id;
	msg_board.insert_msg(new_msg_board, function(err) {
		if (err)
			throw err;
		req.flash('info', '帖子发布成功');
		res.end();
	});
	res.redirect('./');
});

router.post('/post/reply_msgb', function (req, res) {	
	if (req.body.msg.length > 1000) {
		req.flash('error', "tl;dr. too long dont read. 内容长度大于1000！");
		res.end();
		return ;
	}
	if (req.body.msg.length < 5) {
		req.flash('error', "你太短了，长一点吧");
		res.end();
		return;
	}

	msg_board.findById(req.body.reply_msg_id, function (err, msg) {
		if (err || (! msg)) {
			req.flash('error', 'server error');
			res.end();
			return;
		}

		var p_msg = req.body.msg
			.replace(/\r/g, '')
			.replace(/\n/g, ' </br>');

		var new_msg_board = new msg_board({
			root_id: req.body.reply_msg_id,
			reply_id: "NONE",
			user_id: req.user._id,
			msg: p_msg,
			date: new Date()
		});

		msg_board.insert_msg(new_msg_board, function(err) {
			if (err)
				throw err;
			req.flash('info', '帖子发布成功');
			res.end();
		});

	});
});

router.get('/un_read', function (req, res) {
	if (!req.user) {
		res.end();
		return;
	}
	
	ref_link
		.get_unread_ref_link_by_to_id(req.user._id)
		.select({_id: 1, date:1, msg_id:1, root_id:1})
		.populate({path: "msg_data", populate: {path:"user"}})
		.exec(function (err, data) {
			if (err || !data) {
				console.log(err);
				res.end();
				return;
			}

			var unread = [];
			for (var x in data) {
				var mid = data[x].root_id;
				if (mid == "NONE")
					mid = data[x].msg_data._id;
				unread.push({
					ref_link_id: data[x]._id,
					msg: data[x].msg_data.msg,
					date: data[x].date.getTime(),
					mid: mid,
					name: data[x].msg_data.user.name,
					user_id: data[x].msg_data.user.user_name
				});
			}

			res.json({unread});
			res.end();
		});

});

router.get('/view_msg/*', function (req, res) {
	var root_id = req.params[0];

	msg_board.get_msg_by_id(root_id)
		.populate({path:'user'})
		.exec(function (err, data) {
		if (err || !data) {
			console.log(err);
			res.end();
			return;
		}

		res.send(render.base({
			title:'留言版',
			header: render.header({
				title: '留言版',
				description: '<p>又急又气，正在施工中</p><p>logo呢已经更新了，你说好不好啊</p>',
				login: req.user || false
			}),
			info: render.info(req.flash('info')),
			error: render.error(req.flash('error')),
			content: render.view_msg({id: root_id, login: req.user, data: data}),
			bottom: render.bottom()
		}));

	})
	});
});

router.post('/post/set_ref_link_read', function (req, res) {
	ref_link
		.set_ref_link_read(req.body.ref_link_id)
		.exec(function (err) {
			if (err)
				console.log(err);
				res.end();
		});
});

module.exports = router;
