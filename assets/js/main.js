(function ($) {
	$(document).ready(function () {

		// Create a custom cursor element
		const $cursor = $('<div class="custom-cursor"></div>');
		$('body').append($cursor);
	
		// Move the cursor based on mouse position
		$(document).mousemove(function(e) {
			$cursor.css({
				left: e.pageX,
				top: e.pageY
			});
		});
	
		// Change the body cursor dynamically
		$('#cursor-default').click(function() {
			$('body').css('cursor', 'url("default-cursor.png"), auto');
		});
	
		$('#cursor-pointer').click(function() {
			$('body').css('cursor', 'pointer');
		});
	
		$('#cursor-crosshair').click(function() {
			$('body').css('cursor', 'crosshair');
		});




		
		// Set the offset value (e.g., height of a sticky header)
		var offset = 50; // Adjust as needed

		$('.main-menu > ul li a').on('click', function (e) {
			e.preventDefault(); // Prevent default anchor click behavior
	
			// Get the target section ID
			var target = $(this).attr('href');
	
			// Scroll to the section with offset
			$('html, body').animate({
				scrollTop: $(target).offset().top - offset
			}, 800); // Adjust the animation duration as needed
		});


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

		gsap.registerPlugin(SplitText, ScrollTrigger);
		let textWrappers = $(".animation-text");
		let mainTitleSplit = new SplitText(textWrappers, {
			type: "lines,chars",
			linesClass: "line-wrapper",
			charsClass: "letter d-inline-block",
			tag: "span"
		});
		$(".line-wrapper").each(function () {
			let letters = $(this).find(".letter");
			gsap.fromTo(
				letters,
				{ 
					x: 15, 
					y:5,
					opacity: 0, 
					scale: 0.5, 
				},
				{ 
					x: 0, 
					y:0,
					opacity: 1, 
					scale: 1,
					scrollTrigger: {
						trigger: this,
						start: "top bottom",
						end: "bottom top",
						toggleActions: "play none none reverse",
					},
					duration: 0.5,
					stagger: 0.1, 
					ease: "power1.out" 
				}
			);
		});

		 // animation line
		 gsap.utils.toArray(".animation-line").forEach((element) => {
            gsap.fromTo(
                element,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play none none reverse",

                    },
                }
            );
        });



		// lenis
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        // lenis.on('scroll', (e) => {
        //     console.log(e);
        // });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
        // lenis

	});
})(jQuery);