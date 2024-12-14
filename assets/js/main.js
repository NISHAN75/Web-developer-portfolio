(function ($) {
	$(document).ready(function () {
		function sendMail() {
			let parms = {
				user_name: $("#name").val(),
				user_email: $("#email").val(),
				user_subject: $("#subject").val(),
				message: $("#message").val(),
			};
			console.log("hi");
			emailjs.send("service_vs42f2v", "template_vg5dyih", parms)
				.then(() => {
					alert("Email Sent!");
					$("#name").val('');
					$("#email").val('');
					$("#subject").val('');
					$("#message").val('');
				})
				.catch((error) => {
					console.error("Error sending email:", error);
				});
		}
		 $("#submit-btn").on("click", function (event) {
        event.preventDefault(); // Prevent form submission

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const subject = $("#subject").val().trim();
        const message = $("#message").val().trim();

        let isValid = true;

        if (name === "") {
            alert("Name is required.");
            isValid = false;
        }

        if (email === "") {
            alert("Email is required.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            isValid = false;
        }

        if (subject === "") {
            alert("Subject is required.");
            isValid = false;
        }

        if (message === "") {
            alert("Message is required.");
            isValid = false;
        }

        if (isValid) {
			sendMail();
        }
    });

		
		// header sticky
		var windowOn = $(window);
		windowOn.on('scroll', function () {
			if ($("body").hasClass("home")) {
				var scroll = windowOn.scrollTop();
				if (scroll < 100) {
					$(".header-area").removeClass("header-sticky");
					$(".header-offcanvas").removeClass("version-2");
				} else {
					$(".header-area").addClass("header-sticky");
					$(".header-offcanvas").addClass("version-2");
				}
			}
		});

		let offcanvasElement = $(".header-offcanvas");
        offcanvasElement.on("show.bs.offcanvas", function () {
            $(".menu-icon").addClass("open");
            $(".close-icon span:nth-child(1)").css({
                transform: "rotate(45deg)"
            });
            $(".close-icon span:nth-child(2)").css({
                transform: "rotate(-45deg)",
                marginTop: "-2px"
            });
        });
        offcanvasElement.on("hide.bs.offcanvas", function () {
            $(".menu-icon").removeClass("open");
            $(".close-icon span:nth-child(1)").css({
                transform: ""
            });
            $(".close-icon span:nth-child(2)").css({
                transform: "",
                marginTop: ""
            });
        });
	  



		// mouse pointer
		var mousepointerDiv = document.querySelector('#mousepointer>div>*');
		var mousepointer = document.querySelector('#mousepointer');
		var all_link;
		var all_submit;

		const cursor = document.querySelector('#mousepointer');

		let mouseX = 0;
		let mouseY = 0;
		let cursorX = 0;
		let cursorY = 0;
		let speed = 0.5;

		function animate() {
			let distX = mouseX - cursorX;

			let distY = mouseY - cursorY;

			cursorX = cursorX + (distX * speed);
			cursorY = cursorY + (distY * speed);

			cursor.style.left = cursorX - 40 + 'px';
			cursor.style.top = cursorY - 40 + 'px';
			requestAnimationFrame(animate);
		}

		animate();

		document.addEventListener('mousemove', (event) => {
			mouseX = event.clientX + 19;
			mouseY = event.clientY + 18;
		})

		mouse_mo();

		function mouse_mo() {
			all_link = document.querySelectorAll('a');

			for (var i = 0; i < all_link.length; i++) {
				var el = all_link[i];
				el.addEventListener("mouseover", event => {
					mousepointerDiv.classList.remove('active');
					mousepointer.classList.add('active');
				});

				el.addEventListener("mouseout", event => {
					mousepointer.classList.remove('active');
				});
			}
			all_letter = document.querySelectorAll('.letter');

			for (var i = 0; i < all_letter.length; i++) {
				var el = all_letter[i];
				el.addEventListener("mouseover", event => {
					mousepointerDiv.classList.remove('active');
					mousepointer.classList.add('active');
				});

				el.addEventListener("mouseout", event => {
					mousepointer.classList.remove('active');
				});
			}

			all_submit = document.querySelectorAll('input[type="range"]');
			for (var i = 0; i < all_submit.length; i++) {
				var el = all_submit[i];
				el.addEventListener("mouseover", event => {
					mousepointerDiv.classList.remove('active');
					mousepointer.classList.add('active');
				});

				el.addEventListener("mouseout", event => {
					mousepointer.classList.remove('active');
				});
			}
		}
		// Set the offset value (e.g., height of a sticky header)
		let offset = 50;
		$('.main-menu > ul li a').on('click', function (e) {
			e.preventDefault(); 
			var target = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(target).offset().top - offset
			}, 800); 
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
					url: "assets/images/map/map-icon.png",
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
		$(window).load(function() {
			gsap.fromTo(
				".prograss-inner-info",
				{ x: "-100%", opacity: 0 }, // Start position and opacity
				{
				  x: "0%",    // End position
				  opacity: 1, // Fully visible
				  duration: 1.5, // Animation duration
				  ease: "power2.out", // Smooth easing
				  scrollTrigger: {
					trigger: ".prograss-info", // Trigger when this element enters the viewport
					start: "top 90%", // Starts animation when the top of the trigger reaches 90% of the viewport
					toggleActions: "play none none reverse", // Play animation on scroll down, reverse on scroll up
				  },
				}
			  );
			  gsap.fromTo(
				".loading-page",
				{ opacity: 1 },
				{
				  opacity: 0,
				  display: "none",
				  duration: 1.5,
				  delay: 3.5,
				}
			  );
			  
			  gsap.fromTo(
				".logo-name",
				{
				  y: 50,
				  opacity: 0,
				},
				{
				  y: 0,
				  opacity: 1,
				  duration: 2,
				  delay: 0.5,
				}
			  );
		})
		


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

		// (function(){
		// 	emailjs.init({
		// 	  publicKey: "2---X-G8_ycDjswbq",
		// 	});
		//  })();



	});
})(jQuery);