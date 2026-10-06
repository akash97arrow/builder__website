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
