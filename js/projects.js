document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.filter');
	const cards = document.querySelectorAll('[data-project]');
	if (!buttons.length || !cards.length) return;

	const setActiveFilter = (button) => {
		buttons.forEach((item) => {
			const isActive = item === button;
			item.classList.toggle('active', isActive);
			item.setAttribute('aria-pressed', String(isActive));
		});
		const filter = button.dataset.filter;
		cards.forEach((card) => {
			const matches = filter === 'all' || card.dataset.project.includes(filter);
			card.hidden = !matches;
		});
	};

	const initialButton = document.querySelector('.filter.active') || buttons[0];
	if (initialButton) setActiveFilter(initialButton);

	buttons.forEach((button) => {
		button.addEventListener('click', () => setActiveFilter(button));
	});
});
