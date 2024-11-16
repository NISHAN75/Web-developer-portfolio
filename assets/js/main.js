(function ($) {
	$(document).ready(function () {
        $(".portfolio-btn").each(function (index, item) {
			$(item).on("mousemove", function (e) {
				let target = $(e.target);
				var x = e.pageX - target.offset().left;
				var y = e.pageY - target.offset().top;
				target.css("--x", x + 'px');
				target.css("--y", y + 'px');
			});
		});

	  // isotope
	  if($('.grid').length != 0){
		var $grid = $('.grid').imagesLoaded(function() {
		  // Initialize Isotope
		  $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
			  columnWidth: 1
			}
		  });
	
		
		  // Filter items on button click and manage active class
		  $('.filter-buttons').on('click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			// Filter items
			$grid.isotope({ filter: filterValue });
			$('.filter-buttons button').removeClass('active');
			$(this).addClass('active');
		  });
		});
	  } 

	});
})(jQuery);