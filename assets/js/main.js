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
		if ($('.grid').length != 0) {
			var $grid = $('.grid').imagesLoaded(function () {
				// Initialize Isotope
				$('.grid').isotope({
					itemSelector: '.grid-item',
					percentPosition: true,
					masonry: {
						columnWidth: 1
					}
				});


				// Filter items on button click and manage active class
				$('.filter-buttons').on('click', 'button', function () {
					var filterValue = $(this).attr('data-filter');
					// Filter items
					$grid.isotope({
						filter: filterValue
					});
					$('.filter-buttons button').removeClass('active');
					$(this).addClass('active');
				});
			});
		}

		// map
		if ($('body').hasClass('contact-page')) {
			const customStyle = [{
					"elementType": "geometry",
					"stylers": [{
						"color": "#F2F2F2"
					}]
				},
				{
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				},
				{
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#222831"
					}]
				},
				{
					"elementType": "labels.text.stroke",
					"stylers": [{
						"color": "#F2F2F2"
					}]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry",
					"stylers": [{
						"color": "#222831"
					}]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [{
						"color": "#F2F2F2"
					}]
				},
				{
					"featureType": "poi",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#222831"
					}]
				},
				{
					"featureType": "road",
					"elementType": "geometry",
					"stylers": [{
						"color": "#FEFEFE"
					}]
				},
				{
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#FEFEFE"
					}]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry",
					"stylers": [{
						"color": "#FEFEFE"
					}]
				},
				{
					"featureType": "road.highway",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#FEFEFE"
					}]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [{
						"color": "#222831"
					}]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [{
						"color": "#00ADB5"
					}]
				},
				{
					"featureType": "water",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#00ADB5"
					}]
				}
			];

			function initMap() {
				const mapOptions = {
					center: {
						lat: 22.2759685,
						lng: 91.7762721
					},
					zoom: 10,
					styles: customStyle,
					fullscreenControl: false, // Disable fullscreen button
					streetViewControl: false, // Disable Street View button
					mapTypeControl: false, // Disable Map/Satellite toggle
					zoomControl: false, // Disable zoom controls
				};

				const map = new google.maps.Map(document.getElementById("map"), mapOptions);

				const customIcon = {
					url: "http://127.0.0.1:5500/assets/images/map/map-icon.png",
					scaledSize: new google.maps.Size(40, 40),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(25, 50),
				};

				const customMarker = new google.maps.Marker({
					position: {
						lat: 22.2759685,
						lng: 91.7762721
					},
					map: map,
					icon: customIcon,
					title: "Custom Marker",
				});

				const infoWindow = new google.maps.InfoWindow({
					content: '<div class="map-card"><h6>Potenga</h6><p>My workspace is at Potenga. Feel free to reach out!</p></div>',
				});

				customMarker.addListener("click", function () {
					infoWindow.open(map, customMarker);
				});
			}

			initMap();
		}
		// CounterUp plugin initialization
		var counterUp = window.counterUp["default"];
		var $counters = $(".counter");

		// Intersection Observer to trigger CounterUp when in viewport
		if ("IntersectionObserver" in window) {
			let observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						counterUp(entry.target, {
							duration: 1000,
							delay: 16,
						});
						observer.unobserve(entry.target); // Trigger only once
					}
				});
			});

			$counters.each(function () {
				observer.observe(this);
			});
		} else {
			// Fallback for browsers without IntersectionObserver
			$counters.each(function () {
				counterUp(this, {
					duration: 1000,
					delay: 16,
				});
			});
		}

	});
})(jQuery);