$(document).ready(function () {
	var hv_date = new Date();
	var hv_counter = false;

	$('#history').visibility({
		once: false,
		continuous:true,
		observeChanges: true,
		onBottomVisible: function() {
			if (hv_counter)
				return;
			$.ajax({
				url: "/today/history/data/",
				data: {
					time: hv_date.getTime()
				},
				contentType: 'application/json',
				dataType: 'json',
				type: "GET",
				success: function (result) {
					if (hv_counter)
						return;

					console.log(result);
					if (result["empty"])
						return;
					if (result["end"]) {
						hv_counter = true;
						$('#history').append('<div class="a-day">');
						var last_day = $(".a-day:last");
						last_day.append($('<div class="ui horizontal divider">').html('没了，就这么多'));
						return;
					}

					$('#history').append('<div class="a-day">');
					var last_day = $(".a-day:last");
					last_day.append($('<div class="ui horizontal divider">').html(hv_date.toDateString()));

					//console.log(result, result.happiness, result.sadness);

					for (var x in result) {
						if (result[x].type)
							last_day.append(
								$('<div class="ui positive message">').html('\
									<p>' + result[x].description + '</p>\
									<p> --- ' + result[x].author + '</p>'
								)
							);
						else
							last_day.append(
								$('<div class="ui info message">').html('\
									<p>' + result[x].description + '</p>\
									<p> --- ' + result[x].author + '</p>'
								)
							);
					}

					//yesterday
					hv_date.setTime(hv_date.getTime() - 1000 * 60 * 60 * 24);
				},
				error: function () {
					if (hv_counter)
						return;
					hv_counter = true;
					$('#history').append('<div class="a-day">');
					var last_day = $(".a-day:last");
					last_day.append($('<div class="ui horizontal divider">').html('没了，就这么多'));
				}
			});
		}
	});
});
