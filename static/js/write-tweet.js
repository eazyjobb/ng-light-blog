$(document).ready(function () {
	$('.sadness').click(function () {
		var data = {
			omsg: $(':input[name=sadness]').val(),
			type: false
		};
		$.ajax({
			url: "/today/update",
			data: data,
			type: "POST",
			success: function() {
				$(location).attr('href', "/user");
			}
		});
	});
	$('.happiness').click(function () {
		var data = {
			omsg: $(':input[name=happiness]').val(),
			type: true
		};
		$.ajax({
			url: "/today/update",
			data: data,
			type: "POST",
			success: function() {
				$(location).attr('href', "/user");
			}
		});
	});

	doT.templateSettings = {
		evaluate:    /\(\(([\s\S]+?)\)\)/g,
		interpolate: /\(\(=([\s\S]+?)\)\)/g,
		varname: 'it',
		strip: true,
		append: true,
		selfcontained: false
	};

	var unreadMsg = doT.template($("#unread-msgb").text());

	$.ajax({
		url: "/messageboard/un_read",
		data: {},
		type: "GET",
		success: function (res) {
			console.log(res);
			$("#unread").after(unreadMsg(res));
			$('.look-msg').click(function () {
				
				var ref_link_id = $(this).attr('ref_link_id');
					msg_id = $(this).attr('href');
				
				if($(this).hasClass('positive')) {
					$(this).removeClass('positive');
					$(this).addClass('negative');
					$(this).html('等待');

					$.ajax({
						url: "/messageboard/post/set_ref_link_read",
						data: {
							ref_link_id: ref_link_id
						},
						type: "POST",
						success: function(res) {
							$(location).attr('href',
								'/messageboard/view_msg/' + msg_id
							);
						}
					});
				}
			});
		}
	});

});
