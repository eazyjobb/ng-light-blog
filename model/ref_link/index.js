var mongoose = require('mongoose');

var promise = require('bluebird');

var ref_link_schema = mongoose.Schema({
	root_id: {type: String},	// *根据回复帖子的根获取帖子链条
	to_id: {type: String},		// at的接受者
	msg_id: {type: String},		// 发出at的消息的id
	date: {type: Date},			// at发送的日期（是否需要加入过期机制？
	read: {type: Boolean}		// at是否已读
});

var ref_link_table = module.exports = mongoose.model('ref_link', ref_link_schema);

/*
	function:
		insert_ref_link(new_ref_link, callback)
		get_unread_ref_link_by_to_id(to_id, callback) //根据to_id获取当前用户的未读ref_link，按日期排序，这两个函数是否需要校验当前登录用户确定合法性？
		get_all_ref_link_by_to_id(to_id, callback)    // 根据to_id获取当前用户的所有at，按日期排序
});
*/

ref_link_table.insert_ref_link = function(new_ref_link, callback) {
	new_ref_link.save(callback);
}

ref_link_table.get_unread_ref_link_by_to_id = function(to_id, callback) {
	return ref_link_table.find({to_id: to_id}).
	                      where('read').equals(false).
						  sort({date: -1});
}

