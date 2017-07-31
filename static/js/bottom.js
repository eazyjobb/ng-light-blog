$(document).ready(function () {
	var footer_place = function () {
		var pheight = $('body').height()
					- $('#footer').height()
					- $('#footer')[0].offsetTop
					- 28
					+ $('.place-holder').height();
		$('.place-holder').css({'height': ((pheight > 0) ? (pheight) : (0))+ 'px'});
	}
	footer_place();
	$(window).resize(footer_place);
	
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
		footer_place();
	});

	observer.observe(document, {
		subtree: true,
		childList: true
	});

	setTimeout('$(window).resize()', 500);
});
