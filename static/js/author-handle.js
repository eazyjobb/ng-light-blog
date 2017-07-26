$(document).ready(function() {
	author_place(function () {
		$('#author').visibility({
			type: 'fixed',
			offset: 60
		});
		$('#author').next().remove();
	});
	$(window).resize(author_place);
});

function author_place(callback) {
	var width = $('body').width();
	var p = $('#author').parent();
	if (width < 1440 && p.hasClass("rail"))
		p.removeClass("rail");
	if (width >= 1440 && false == p.hasClass("rail"))
		p.addClass("rail");
	if (typeof(callback)==="function")	callback();
}
