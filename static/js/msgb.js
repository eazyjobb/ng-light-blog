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

		$('.page-load-status').before(outterMsg(data));
		$('.more-btn').click(function () {
			var obj = $(this);
			
			$.ajax({
				url: "/messageboard/get_comment",
				data: {msg_id: obj.attr('msg_id')},
				type: "GET",
				success: function(res) {
					//console.log(res);
					//console.log(obj);
					obj.before(innerMsg(res));
					//console.log(innerMsg(res));
					obj.hide();
					
					$('.reply-msgb-btn').click(function () {
						var obj = $(this);
						var txt = obj.siblings('textarea');
						
						$.ajax({
							url: "/messageboard/post/reply_msgb",
							data: {msg: txt[0].value,
								   reply_msg_id: obj.attr('msg_id')
							},
							type: "POST",
							success: function(res) {
								$(location).attr('href', '/messageboard');
							}
						});
					});
				}
			});
		});
	});

	infScroll.loadNextPage();
	
	$('#load_more_tweet_button').click(function() {
		infScroll.loadNextPage();
	});
});
