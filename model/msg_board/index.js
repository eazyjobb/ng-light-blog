var mongoose = require('mongoose');

var promise = require('bluebird');

var user = require('../user');
var ref_link = require('../ref_link');


var msg_board_schema = mongoose.Schema({
	root_id: {type: String},  // *这个帖子所在链条的根节点
	reply_id: {type: String}, // 如果这是初始消息而非回复详细，置约定的NONE值，
							  // 现阶段reply_id无用，实现回复通过扫描消息字符串
	user_id: {type: String},  // 发言人的id
	msg: {type: String},	  // 正文，字数约束
	date: {type: Date}		  // 发表日期
});

msg_board_schema.virtual('user', {
	ref: 'User', // 为何要大写？不大写会错
	localField: 'user_id',
	foreignField: '_id',
	justOne: true
});

var msg_board_table = module.exports = mongoose.model('msg_board', msg_board_schema);

/*
	function:
		insert_msg(new_msg, callback)
		get_msg_by_date(date, callback) // 根据日期获取留言板消息，严格按时间排序！
		num_of_msg_before_date(date, callback)
		get_msg_by_user_id(user_id, callback) 	
		get_msg_by_root_id(root_id, callback)   // *根据根的值提取回复链，按时间排序
*/

msg_board_table.insert_msg = function(new_msg, callback) {
	promise.delay(0).then(function () {
		new_msg.save(callback);
	}).then(function () {
		if (true) { // 现阶段reply_id无用，这个if内的代码实现了回复，通过扫描消息字符串at的user_name
		// 需要回复贴主，故不能直接判root_id != NONE
			var str = new_msg.msg, atList = {};
			var user_name = str.split(' ');
			
			user_name.forEach(function (entry) {
				var at = entry.lastIndexOf('@');
				if (at == -1) return ;
				var user_name = entry.substring(at + 1);
				
				if (user_name in atList) return ;
				atList[user_name] = true;
				
				user.get_user_by_user_name(user_name, function (err, res) {
					if (!res) return ;
					if (err) {
						console.log(err);
						return ; 
					}
					var new_ref_link = new ref_link({
							root_id: new_msg.root_id,
							to_id: res._id,
							msg_id: new_msg._id,
							date: new Date(),
							read: false
					});
					
					ref_link.insert_ref_link(new_ref_link, function (err) {
						if (err) console.log(err);
					});
				});
			});
			
			var root_msg_id = new_msg.root_id;
			if (root_msg_id != 'NONE') // 不是根帖子，则提醒帖主
				msg_board_table.get_msg_by_id(root_msg_id)
							   .exec(function (err, res) {
									var user_id = res.user_id;
									if (user_id == new_msg.user_id)
										return;
									user.get_user_by_id(user_id, function (err, res) {
										if (res.user_name in atList) return ;
										
										if (err) {
											console.log(err);
											return ;
										}
										var new_ref_link = new ref_link({
												root_id: new_msg.root_id,
												to_id: res._id,
												msg_id: new_msg._id,
												date: new Date(),
												read: false
										});
										
										ref_link.insert_ref_link(new_ref_link, function (err) {
											if (err) console.log(err);
										});
									});
							   });
		}	
	}).catch(function (err) { console.log(err); });
}

msg_board_table.get_msg_by_date = function(date, callback) {
	var st_day = 0, ed_day = 0, st = new Date(), ed = new Date();
	st_day = parseInt(date.getTime() / 1000 / 24 / 3600);
	ed_day = st_day + 1;
	st.setTime(st_day * 24 * 3600 * 1000);
	ed.setTime(ed_day * 24 * 3600 * 1000);

	var query = {date: {"$gte": st, "$lt": ed}};

	return msg_board_table.find(query, callback).sort({date: 1});
}

msg_board_table.num_of_msg_before_date = function (date, callback) {
	var ed_day = 0, ed = new Date();
	ed_day = parseInt(date.getTime() / 1000 / 24 / 3600) + 1;
	ed.setTime(ed_day * 24 * 3600 * 1000);

	var query = {date: {"$lt": ed}};

	return msg_board_table.count(query, callback);
}

msg_board_table.get_msg_by_id = function (id, callback) {
	return msg_board_table.findById(id);
}	

msg_board_table.get_msg_by_root_id = function (root_id, callback) {
	return msg_board_table.find({root_id: root_id}).sort({date: 1});
}

msg_board_table.get_ten_root_msg_before_time = function(date, callback) {
	var query = {date: {"$lt": date}};
	return msg_board_table.find(query)
						  .where('root_id').equals('NONE')
						  .sort({date: -1}).limit(10);
}
