var mongoose = require('mongoose');

var promise = require('bluebird');

var user = require('../user');
var ref_link = require('../ref_link');


var msg_board_schema = mongoose.Schema({
	root_id: {type: String},  // *����������������ĸ��ڵ�
	reply_id: {type: String}, // ������ǳ�ʼ��Ϣ���ǻظ���ϸ����Լ����NONEֵ
	user_id: {type: String},  // �����˵�id
	msg: {type: String},	  // ���ģ�����Լ��
	date: {type: Date}		  // ��������
});

var msg_board_table = module.exports = mongoose.model('msg_board', msg_board_schema);

/*
	function:
		insert_msg(new_msg, callback)
		get_msg_by_date(date, callback) // �������ڻ�ȡ���԰���Ϣ���ϸ�ʱ������
		num_of_msg_before_date(date, callback)
		get_msg_by_user_id(user_id, callback) 	
		get_msg_by_root_id(root_id, callback)   // *���ݸ���ֵ��ȡ�ظ�������ʱ������
*/

msg_board_table.insert_msg = function(new_msg, callback) {
	// Ĭ��ǰ�˽�����Լ����֤��
	console.log(new_msg);
	new_msg.save(callback);
	if (new_msg.reply_id != "NONE") {
		var new_ref_link = new ref_link({
			root_id: new_msg.root_id,
			to_id: "NONE",
			msg_id: new_msg._id,
			date: new_msg.date,
			read: false
		});
		
		var to_id = "";
		
		promise.delay(0).then(function() {
			msg_board_table.findById(new_msg.reply_id)
						   .exec(function(err, msg) {
								to_id = msg.user_id;
							})
							.catch(function (err) {
								console.log(err);
							});
		}).then(function () {
			new_ref_link.to_id = to_id;
		}).then(function () {
			ref_link.insert_ref_link(new_ref_link, function (err) {
				if (err)
					console.log(err);
			});
		}).catch(function (err) {
			console.log(err);
			res.end();
		});
	}
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

msg_board_table.num_of_msg_before_date = function(date, callback) {
	var ed_day = 0, ed = new Date();
	ed_day = parseInt(date.getTime() / 1000 / 24 / 3600) + 1;
	ed.setTime(ed_day * 24 * 3600 * 1000);

	var query = {date: {"$lt": ed}};

	return msg_board_table.count(query, callback);
}	

msg_board_table.get_msg_by_root_id = function(root_id, callback) {
	return msg_board_table.find({root_id: root_id}, callback).sort({date: 1});
}
