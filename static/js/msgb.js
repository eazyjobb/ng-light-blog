$(document).ready(function () {
	doT.templateSettings = {
		evaluate:    /\(\(([\s\S]+?)\)\)/g,
		interpolate: /\(\(=([\s\S]+?)\)\)/g,
		varname: 'it',
		strip: true,
		append: true,
		selfcontained: false
	};
	
	var now_date = new Date();

	var infScroll = new InfiniteScroll( '#msgb-data', {
		path: function () {
			return '/messageboard/data/' + 
				   '?time=' + now_date.getTime();
		},
		responseType: 'text',
		status: '.page-load-status',
		history: false,
	});

	var outterMsg = doT.template($("#template-msgb").text());
	var innerMsg = doT.template($("#template-msgb-detail").text());
	
	var at_function = function () {
		var s = $(this).siblings('.ui.form').find('textarea').val();
		var name = $(this).html();
		$(this).siblings('.ui.form').find('textarea').val(s + name + ' ');
	};

	infScroll.on( 'load', function(data) {
		data = JSON.parse(data);
		
		if (data.end == 1) {
			infScroll.destroy();

			$('#load_more_tweet_button').before($('<div class="ui horizontal divider">').html('没了，就这么多'));
			$('#load_more_tweet_button').remove();

			return;
		} else { // not empty
			now_date = new Date(data[data.length - 1].date);
		}

		$('.at-people').off("click");
		$('.at-people').click(at_function);

		$('.page-load-status').before(outterMsg(data));
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

					$('.at-people').off("click");
					$('.at-people').click(at_function);
					
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
									$(location).attr('href', '/messageboard');
								}
							});
						}
					});
				}
			});
		
			}

		});
	});

	infScroll.loadNextPage();
	
	$('#load_more_tweet_button').click(function() {
		infScroll.loadNextPage();
	});
});
