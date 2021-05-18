var timeOut = "";    
$("#example-1").on("page.dt", () => {
	clearTimeout(timeOut)
	timeOut = setTimeout(function(){
		$('.quickEdit span').editable({
			url: '/admincp.php/?pages=Archer&type=tovary&pageType=QuickEdit&Save=true',
			validate: function(value) {
				if($.trim(value) == '') {
					return 'Данное поле не может быть пустым';
				}
			}
		});
	}, 1000)
})

jQuery(document).ready(function() {	
	SmoothScroll({
	    stepSize: 80,
	    animationTime: 900,
	    frameRate: 120,
	    touchpadSupport: true,
	    fixedBackground: false
	})
})