$(document).ready(function () {

	doT.templateSettings = {
		evaluate:    /\(\(([\s\S]+?)\)\)/g,
		interpolate: /\(\(=([\s\S]+?)\)\)/g,
		varname: 'it',
		strip: true,
		append: true,
		selfcontained: false
	};

	var innerMsg = doT.template($("#template-msgb-detail").text());

	$('.more-btn').click(function () {
		var obj = $(this);
		if ( ! obj.hasClass('once') ) {
			obj.addClass('once');

		$.ajax({
			url: "/messageboard/get_comment",
			data: {msg_id: obj.attr('msg_id')},
			type: "GET",
			success: function(res) {
				obj.before(innerMsg(res));
				obj.hide();
					
				$('.reply-msgb-btn').click(function () {
					console.log(1);
					var txt = $(this).parent().siblings('textarea');
						
					if($(this).hasClass('positive')) {
						$(this).removeClass('positive');
						$(this).addClass('negative');
						$(this).html('等待');
						$.ajax({
							url: "/messageboard/post/reply_msgb",
							data: {msg: txt[0].value,
								   reply_msg_id: $(this).parent().parent().next().attr('msg_id')
							},
							type: "POST",
							success: function(res) {
								location.reload();
							}
						});
					}
				});
			}
		});
		
		}

	});

	$('.more-btn').click();
});
