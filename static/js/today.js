$(document).ready(function () {
	$(document).on('touchstart touchend', '.reveal', function() {
    	$('.reveal').click();
	});

	$('.visible').click(function() {console.log('bug');});
	
	$('.reveal').ready(function () {

		var mid_offset = $('.ng-divider').width() / 1.5 * 1.75;

		var left_before = $('<div class="div-line">').css({
			'top'		: '50px',
			'right'		: mid_offset + 'px'
		});

		var left_after = $('<div class="div-line">').css({
			'bottom'	: '50px',
			'right'		: mid_offset + 'px'
		});

		var right_before = $('<div class="div-line">').css({
			'top'		: '50px',
			'left'		: mid_offset + 'px'
		});

		var right_after = $('<div class="div-line">').css({
			'bottom'	: '50px',
			'left'		: mid_offset + 'px'
		});


		$('#left-hidden .ng-divider').before(left_before);
		$('#left-hidden .ng-divider').after(left_after);
		$('#right-hidden .ng-divider').before(right_before);
		$('#right-hidden .ng-divider').after(right_after);

		setTimeout(
			"$('.dimmer').removeClass('active').addClass('disabled')",
			500
		);

		putWords = function () {
			var beginTop = 50;
			var count = $('.words.left').length;
			var overFlowHeight = $('.today-type2').height() - 100;
			for (var i = 0; i < count; ++ i) {
				var blockHeight = $('.words.left:eq('+i+')').height() + 30;

				if (beginTop + blockHeight > overFlowHeight)
					$('.words.left:eq('+i+')').hide();
				else
					$('.words.left:eq('+i+')').show();

				$('.words.left:eq('+i+')').css({'top' : beginTop + 'px'});
				beginTop += blockHeight + 25;
			}

			beginTop = 50;
			count = $('.words.right').length;
			for (var i = 0; i < count; ++ i) {
				var blockHeight = $('.words.right:eq('+i+')').height() + 30;

				if (beginTop + blockHeight > overFlowHeight)
					$('.words.right:eq('+i+')').hide();
				else
					$('.words.right:eq('+i+')').show();

				$('.words.right:eq('+i+')').css({'top' : beginTop + 'px'});
				beginTop += blockHeight + 25;
			}
		};

		putWords();
		$(window).resize(putWords)
	});
	
});
