$(document).ready(function() {
	author_place();
	$(window).resize(author_place);
});

function author_place(callback) {
	var width = $('body').width();
	var p = $('#author').parent();
	if (width < 1440) {
		p.removeClass("rail");
		$('#author').visibility({
			type: false,
		});
	}
	if (width >= 1440) {
		p.addClass("rail");
		$('#author').visibility({
			type: 'fixed',
			offset: 100
		});
		$('#author').next().remove();
	}
}
