document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.reveal');
	if (!('IntersectionObserver' in window)) {
		items.forEach((item) => item.classList.add('revealed'));
		return;
	}
	// Add a subtle stagger within each group of sibling reveal elements.
	const parents = new Set();
	items.forEach((item) => {
		if (item.parentElement) parents.add(item.parentElement);
	});
	parents.forEach((parent) => {
		const siblings = Array.from(parent.children).filter((child) => child.classList.contains('reveal'));
		siblings.forEach((item, index) => {
			item.style.setProperty('--reveal-delay', `${Math.min(index, 2) * 80}ms`);
		});
	});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('revealed');
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.08 },
	);
	items.forEach((item) => observer.observe(item));
});

/* =========================================
   FAQ ACCORDION - smooth open/close, one open at a time
========================================= */
document.addEventListener('DOMContentLoaded', () => {
	const items = Array.from(document.querySelectorAll('.faq-item'));
	if (!items.length) return;

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const DURATION = reduceMotion ? 0 : 350;
	const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

	const isOpen = (item) => item.open && !item.classList.contains('is-closing');

	const animateHeight = (item, from, to, onDone) => {
		const anim = item.animate({ height: [`${from}px`, `${to}px`] }, { duration: DURATION, easing: EASING });
		item._anim = anim;
		anim.onfinish = () => {
			item._anim = null;
			if (onDone) onDone();
		};
		anim.oncancel = () => {
			item._anim = null;
		};
	};

	const openItem = (item) => {
		const from = item.getBoundingClientRect().height;
		if (item._anim) item._anim.cancel();
		item.classList.remove('is-closing');
		item.open = true;
		const to = item.offsetHeight; // full natural height
		animateHeight(item, from, to);
	};

	const closeItem = (item) => {
		const from = item.getBoundingClientRect().height;
		if (item._anim) item._anim.cancel();
		const summary = item.querySelector('summary');
		const borders = item.offsetHeight - item.clientHeight;
		const to = summary.offsetHeight + borders;
		item.classList.add('is-closing');
		animateHeight(item, from, to, () => {
			item.open = false;
			item.classList.remove('is-closing');
		});
	};

	// Only one item may be open at the start
	items.filter((item) => item.open).slice(1).forEach((item) => (item.open = false));

	items.forEach((item) => {
		const summary = item.querySelector('summary');
		if (!summary) return;
		summary.addEventListener('click', (event) => {
			event.preventDefault(); // stop the browser's instant toggle
			if (isOpen(item)) {
				closeItem(item);
				return;
			}
			items.forEach((other) => {
				if (other !== item && isOpen(other)) closeItem(other);
			});
			openItem(item);
		});
	});
});