$(document).ready(function () {

	var img_ori_x_margin, img_ori_y_margin = -14;

	var notFoundPlace = function () {
		var upperWidth = $('#not-found').width();
		var upperHeight = 
			$('body').height() - $('#not-found')[0].offsetTop
			- $('#footer').height() - 28;
		var codeWidth = $('#error-code').width();
		var codeHiehgt = $('#error-code').height();

		//console.log(upperWidth, upperHeight, codeWidth, codeHiehgt);
		$('#not-found').css({'height': upperHeight + 'px'});

		$('#img-container').css({'height': upperHeight + 'px'});
		$('#error-code').css({
			'left' : (upperWidth - codeWidth) / 2 + 'px',
			'top' : (upperHeight - codeHiehgt) /2 + 'px'
		});

		var imgMargin = ($('#img-container > img').width()
			- $('#img-container').width()) / 2;
		img_ori_x_margin = -imgMargin;

		$('#img-container > img').css({
			'margin-left' : -imgMargin + 'px',
			'margin-right' : -imgMargin + 'px'
		});
	}

	$('#img-container').mousemove(function (event) {
		var middleheight = $('body').height()/2;
		var middlewidth = $('body').width()/2;

		var x = (event.pageX - middlewidth) / 35;
		var y = (event.pageY - middleheight) / 35;

		$('#img-container > img').css({
			'margin-left' : img_ori_x_margin - x,
			'margin-right' : img_ori_x_margin + x,
			'margin-top' : img_ori_y_margin - y,
			'margin-bottom': img_ori_y_margin + y
		});
	});

	notFoundPlace();

	if (navigator.userAgent.indexOf('iPhone') != -1)
		setTimeout('$(window).resize()', 500);

	$(window).resize(notFoundPlace);
});
