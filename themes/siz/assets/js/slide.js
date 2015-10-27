$(function()
{
	var bars = $("#bars"),
	side = $("#mobile-taglist-wrapper"),
	elHeight = side.height(),
	tmp = 0;

	bars.click(function(e) {
		if (tmp == 0) {
			tmp = 1;
			side.animate({
				marginTop: 0,
			}, 300);
		} else {
			tmp = 0;
			console.log(elHeight);
			side.animate({
				marginTop: -elHeight + "px",
			}, 300);
		}

	});
});