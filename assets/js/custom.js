/* Nur Center customizations. */
(function () {

	// Fade/slide each .reveal section's box in when it scrolls into view.
	var reveals = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) { e.target.classList.toggle('is-visible', e.isIntersecting); });
		}, { threshold: 0.2 });
		reveals.forEach(function (el) { io.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add('is-visible'); });
	}

	// Upcoming Programs slider: next slide slides in every N ms (data-interval).
	document.querySelectorAll('.slider').forEach(function (slider) {
		var slides = slider.querySelectorAll('.slide'),
			dotsBox = slider.querySelector('.slider-dots'),
			interval = parseInt(slider.getAttribute('data-interval'), 10) || 5000,
			current = 0,
			timer = null,
			dots = [];

		if (slides.length < 2) return;

		slides.forEach(function (slide, i) {
			var dot = document.createElement('button');
			dot.type = 'button';
			dot.setAttribute('aria-label', 'Show program ' + (i + 1));
			dot.addEventListener('click', function () { go(i); restart(); });
			dotsBox.appendChild(dot);
			dots.push(dot);
		});

		function go(next) {
			if (next === current) return;
			var prev = slides[current];
			prev.classList.remove('is-active');
			prev.classList.add('is-leaving');
			setTimeout(function () { prev.classList.remove('is-leaving'); }, 800);
			slides[next].classList.add('is-active');
			dots[current].classList.remove('is-active');
			dots[next].classList.add('is-active');
			current = next;
		}

		function restart() {
			clearInterval(timer);
			timer = setInterval(function () { go((current + 1) % slides.length); }, interval);
		}

		dots[0].classList.add('is-active');
		slider.addEventListener('mouseenter', function () { clearInterval(timer); });
		slider.addEventListener('mouseleave', restart);
		restart();
	});

})();
