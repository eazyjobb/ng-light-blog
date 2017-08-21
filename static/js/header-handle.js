$(document).ready(function() {
	header_select();
	$(window).resize(header_select);
	$('.main.menu').visibility({
		type: 'fixed'
	});
	$('.manu-jump').click(function() {
		$(location).attr('href', $(this).attr("href"));
	});
	$.ajax({
		url: "/messageboard/un_read",
		data: {},
		type: "GET",
		success: function (res) {
			if (res["unread"] && res["unread"].length) {
				$('.notice').append('<div class="ui red empty circular mini label"\
					style="position:absolute; top:1.5em; left:65%;"></div>');
			}
		}
	});
});

function header_select() {
	var width = $('body').width();
	if (width < 768) {
		$('.header-large').hide();
		$('.header-tiny').show();
	}
	if (width >= 768) {
		$('.header-large').show();
		$('.header-tiny').hide();
	}
}
