$(document).ready(function () {
	var hv_date = new Date();
	var hv_counter = false;

	var infScroll = new InfiniteScroll( '#history', {
		path: function () {
			return '/today/history/data/?time=' + hv_date.getTime();
		},
		responseType: 'text',
		status: '.page-load-status',
		history: false,
	});

	infScroll.on( 'load', function( response ) {
		var data = JSON.parse( response );
		console.log(data);

		if (data.empty == 1) {
			hv_date = new Date(hv_date.getTime() - 1000 * 60 * 60 * 24);
			infScroll.loadNextPage();
			return;
		}

		if (data.end == 1) {
			infScroll.destroy();

			$('#history').append('<div class="a-day">');
			var last_day = $(".a-day:last");
			last_day.append($('<div class="ui horizontal divider">').html('没了，就这么多'));

			$('#load_more_tweet_button').remove();
			return;
		}
        
		$('#history').append('<div class="a-day">');
		var last_day = $(".a-day:last");
		last_day.append($('<div class="ui horizontal divider">').html(hv_date.toDateString()));

		for (var x in data) {
			if (data[x].type)
				last_day.append(
					$('<div class="ui positive message">').html('\
						<p>' + data[x].description + '</p>\
						<p> --- ' + data[x].author + '</p>'
					)
				);
			else
				last_day.append(
					$('<div class="ui info message">').html('\
						<p>' + data[x].description + '</p>\
						<p> --- ' + data[x].author + '</p>'
					)
				);
		}

		hv_date = new Date(hv_date.getTime() - 1000 * 60 * 60 * 24);
	});
	infScroll.loadNextPage();
	
	document.getElementById("load_more_tweet_button").style.marginBottom="1em";
	
	$('#load_more_tweet_button').click(function() {
		infScroll.loadNextPage();
	});
});
