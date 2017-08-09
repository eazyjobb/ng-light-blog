var mongoose = require('mongoose');

var promise = require('bluebird');

var ref_link_schema = mongoose.Schema({
	root_id: {type: String},	// *���ݻظ����ӵĸ���ȡ��������
	to_id: {type: String},		// at�Ľ�����
	msg_id: {type: String},		// ����at����Ϣ��id
	date: {type: Date},			// at���͵����ڣ��Ƿ���Ҫ������ڻ��ƣ�
	read: {type: Boolean}		// at�Ƿ��Ѷ�
});

var ref_link_table = module.exports = mongoose.model('ref_link', ref_link_schema);

/*
	function:
		insert_ref_link(new_ref_link, callback)
		get_unread_ref_link_by_to_id(to_id, callback) //����to_id��ȡ��ǰ�û���δ��ref_link�����������������������Ƿ���ҪУ�鵱ǰ��¼�û�ȷ���Ϸ��ԣ�
		get_all_ref_link_by_to_id(to_id, callback)    // ����to_id��ȡ��ǰ�û�������at������������
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

