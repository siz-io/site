var bars = document.getElementById("bars"),
side = document.getElementById("mobile-taglist-wrapper"),
elHeight = side.offsetHeight,
tmp = 0;

bars.addEventListener('click', function(e) {
	if (tmp == 0) {
		tmp = 1;
		console.log("up");
		// side.classList.remove("animateSideBack");
		// side.classList.add("animateSide");
		side.style.marginTop = "0";
	} else {
		tmp = 0;
		console.log("down");
		// side.classList.remove("animateSide");
		// side.classList.add("animateSideBack");
		console.log(elHeight);
		side.style.marginTop = -elHeight + "px";
	}

});
