var mongoose = require('mongoose');

var promise = require('bluebird');

var ref_link_schema = mongoose.Schema({
	root_id: {type: String},	// *¸ù¾Ý»Ø¸´Ìû×ÓµÄ¸ù»ñÈ¡Ìû×ÓÁ´Ìõ
	to_id: {type: String},		// atµÄ½ÓÊÜÕß
	msg_id: {type: String},		// ·¢³öatµÄÏûÏ¢µÄid
	date: {type: Date},			// at·¢ËÍµÄÈÕÆÚ£¨ÊÇ·ñÐèÒª¼ÓÈë¹ýÆÚ»úÖÆ£¿
	read: {type: Boolean}		// atÊÇ·ñÒÑ¶Á
});

ref_link_schema.virtual('msg_data', {
	ref: 'msg_board', 
	localField: 'msg_id',
	foreignField: '_id',
	justOne: true
});

var ref_link_table = module.exports = mongoose.model('ref_link', ref_link_schema);

ref_link_table.insert_ref_link = function(new_ref_link, callback) {
	new_ref_link.save(callback);
}

ref_link_table.get_unread_ref_link_by_to_id = function(to_id) {
	return ref_link_table.find({to_id: to_id}).
	                      where('read').equals(false).
						  sort({date: -1});
}

ref_link_table.set_ref_link_read = function(id) {
	console.log(id);
	return ref_link_table.update({_id: id}, {read: true});
}

/*
ref_link_table.set_ref_link_read("599656db05dd8a65280f2637").exec(function (err) {
	if (err)
		console.log(err);
});
*/

