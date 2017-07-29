$(document).ready(function () {
	var hv_date = new Date();
	var hv_counter = false;

	$('#history').visibility({
		once: false,
		observeChanges: true,
		onBottomVisible: function() {
			if (hv_counter)
				return;
			$.ajax({
				url: "/today/history/data/",
				data: {date: hv_date},
				contentType: 'application/json',
				dataType: 'json',
				type: "GET",
				success: function (result) {
					if (hv_counter)
						return;
					//yesterday
					
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
					
					hv_date.setTime(hv_date.getTime() - 1000 * 60 * 60 * 24);
					//console.log(result, result.happiness, result.sadness);

					for (var x in result.happiness) {
						last_day.append(
							$('<div class="ui positive message">').html('\
								<p>' + result.happiness[x].description + '</p>\
								<p> --- ' + result.happiness[x].author + '</p>'
							)
						);
					}
					for (var x in result.sadness) {
						last_day.append(
							$('<div class="ui info message">').html('\
								<p>' + result.sadness[x].description + '</p>\
								<p> --- ' + result.sadness[x].author + '</p>'
							)
						);
					}
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
