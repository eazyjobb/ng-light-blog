$(document).ready(function () {
	$('.sadness').click(function () {
		var data = {
			omsg: $(':input[name=sadness]').val(),
			type: false
		};
		$.ajax({
			url: "/today/update",
			data: data,
			type: "POST",
			success: function() {
				$(location).attr('href', "/user");
			}
		});
	});
	$('.happiness').click(function () {
		var data = {
			omsg: $(':input[name=happiness]').val(),
			type: true
		};
		$.ajax({
			url: "/today/update",
			data: data,
			type: "POST",
			success: function() {
				$(location).attr('href', "/user");
			}
		});
	});
});
