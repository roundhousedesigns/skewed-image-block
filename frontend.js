document.addEventListener("DOMContentLoaded", function () {
	const parallaxElements = document.querySelectorAll(".slanted-image-container.parallax img");

	const setParallaxPosition = () => {
		const scrollPosition = window.scrollY;
		parallaxElements.forEach(element => {
			const rect = element.getBoundingClientRect();
			const elementTop = rect.top + scrollPosition;
			const offset = (scrollPosition - elementTop) * 0.5;
			element.style.transform = `translateY(${offset}px)`;
		});
	};

	// Set initial positions
	setParallaxPosition();

	// Update on scroll
	let ticking = false;
	window.addEventListener("scroll", function() {
		if (!ticking) {
			window.requestAnimationFrame(function() {
				setParallaxPosition();
				ticking = false;
			});
			ticking = true;
		}
	});

	// Update parallax position on resize
	window.addEventListener("resize", setParallaxPosition);
});
