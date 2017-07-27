$(document).ready(function() {
	$('.message .close').on('click', function() {
		if ($('.message.hidden').length == 1)
			$('#message').transition('fade');
		else
			$(this).closest('.message').transition('fade');
	});
	message_place();
	$(window).resize(message_place);
});

function message_place() {
	var width = $('body').width();
	if (width < 1440 && $('#message').hasClass("rail")) {
		$('#message').removeClass("rail");
	}
	if (width >= 1440 && false == $('#message').hasClass("rail")) {
		$('#message').addClass("rail");
	}
}