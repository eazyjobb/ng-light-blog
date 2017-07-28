$(document).ready(function () {
	footer_place = function () {
		$('.place-holder').css({'height':'0px'});
		var pheight = $('body').height() - $('#footer').height() - $('#footer')[0].offsetTop - 28;
		$('.place-holder').css({'height': ((pheight > 0) ? (pheight) : (0))+ 'px'});
	}
	footer_place();
	$(window).resize(footer_place);
	$('body').change(footer_place);
});
