/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

document.addEventListener('DOMContentLoaded', () => {
	const parallaxImages = document.querySelectorAll('.skewed-image-container.parallax img');
	const BREAKPOINT = 999;
	const PARALLAX_SPEED = 0.1;

	let ticking = false;
	let parallaxEnabled = window.innerWidth >= BREAKPOINT;

	const updateParallax = () => {
		if (!parallaxEnabled) {
			parallaxImages.forEach(img => {
				img.style.transform = 'translate(-5%, -5%)';
			});
			return;
		}

		parallaxImages.forEach(img => {
			const container = img.closest('.skewed-image-container');
			const rect = container.getBoundingClientRect();

			const viewportMiddle = window.innerHeight / 2;
			const elementMiddle = rect.top + (rect.height / 2);
			const distanceFromCenter = (elementMiddle - viewportMiddle) * PARALLAX_SPEED;

			img.style.transform = `translate(-5%, calc(-5% - ${distanceFromCenter}px))`;
		});
		ticking = false;
	};

	const handleResize = () => {
		const shouldBeEnabled = window.innerWidth >= BREAKPOINT;
		if (shouldBeEnabled !== parallaxEnabled) {
			parallaxEnabled = shouldBeEnabled;
			updateParallax();
		}
	};

	window.addEventListener('scroll', () => {
		if (!ticking && parallaxEnabled) {
			window.requestAnimationFrame(updateParallax);
			ticking = true;
		}
	}, { passive: true });

	window.addEventListener('resize', handleResize, { passive: true });

	updateParallax();
});
