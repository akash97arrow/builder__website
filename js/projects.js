document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('[data-project]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      const filter = button.dataset.filter;
      cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.project.includes(filter);
        card.hidden = !matches;
      });
    });
  });
});
