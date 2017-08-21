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
				console.log($(this));
				if($(this).hasClass('positive')) {
					$(this).removeClass('positive');
					$(this).addClass('negative');
					$(this).html('等待');
/*
					$.ajax({
						url: "/messageboard/post/reply_msgb",
						data: {msg: txt[0].value,
							   reply_msg_id: $(this).parent().parent().next().attr('msg_id')
						},
						type: "POST",
						success: function(res) {*/
							$(location).attr('href',
								'/messageboard/view_msg/' + $(this).attr('href')
							);
/*						}
					});*/
				}
			});
		}
	});

});
