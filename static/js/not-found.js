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

		$('#img-container').css({'height': upperHeight + 'px'});
		$('#error-code').css({
			'left' : (upperWidth - codeWidth) / 2 + 'px',
			'top' : (upperHeight - codeHiehgt) /2 + 'px'
		});

		var imgMargin = ($('#img-container > img').width()
			- $('#img-container').width()) / 2;
		img_ori_x_margin = -imgMargin;

		//console.log(img_ori_x_margin);

		if (imgMargin > 0) {
			$('#img-container > img').css({
				'margin-left' : -imgMargin + 'px',
				'margin-right' : -imgMargin + 'px'
			});
		} else {
			$('#img-container > img').css({
				'margin-left' : 'auto',
				'margin-right' : 'auto'
			});
		}
	}

	$('#img-container').mousemove(function (event) {
		var middleheight = $('#img-container').height()/2;
		var middlewidth = $('#img-container').width()/2;

		var x = (event.offsetX - middlewidth) / 35;
		var y = (event.offsetY - middleheight) / 35;

		//console.log(event);

		$('#img-container > img').css({
			'margin-left' : img_ori_x_margin - x,
			'margin-right' : img_ori_x_margin + x,
			'margin-top' : img_ori_y_margin - y,
			'margin-bottom': img_ori_y_margin + y
		});
	});

	notFoundPlace();
	$(window).resize(notFoundPlace);
});
