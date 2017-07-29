$(document).ready(function() {
	header_select();
	$(window).resize(header_select);
	$('.main.menu').visibility({
		type: 'fixed'
	});
	$('.manu-jump').click(function() {
		$(location).attr('href', $(this).attr("href"));
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
