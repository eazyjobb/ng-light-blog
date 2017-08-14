$(document).ready(function () {
	doT.templateSettings = {
		evaluate:    /\(\(([\s\S]+?)\)\)/g,
		interpolate: /\(\(=([\s\S]+?)\)\)/g,
		varname: 'it',
		strip: true,
		append: true,
		selfcontained: false
	};

	var infScroll = new InfiniteScroll( '#msgb-data', {
		path: function () {
			return '/messageboard/data/';
		},
		responseType: 'text',
		status: '.page-load-status',
		history: false,
	});

	var outterMsg = doT.template($("#template-msgb").text());
	var innerMsg = doT.template($("#template-msgb-detail").text());

	infScroll.on( 'load', function(data) {
		data = JSON.parse(data);

		//console.log(data);
		
		if (data.end == 1) {
			infScroll.destroy();

			$('#load_more_tweet_button').before($('<div class="ui horizontal divider">').html('没了，就这么多'));
			$('#load_more_tweet_button').remove();

			return;
		}

		$('.page-load-status').before(outterMsg(data));
		$('.more-btn').click(function () {
			var obj = $(this);
			$.ajax({
				url: "/messageboard/get_comment",
				data: {something:'here'},
				type: "GET",
				success: function(res) {
					//console.log(res);
					//console.log(obj);
					obj.before(innerMsg(res));
					obj.remove();
				}
			});
		});
	});

	infScroll.loadNextPage();
	
	$('#load_more_tweet_button').click(function() {
		infScroll.loadNextPage();
	});
});
