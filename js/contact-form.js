document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('#contactForm');
	const notice = document.querySelector('#formNotice');
	const nameInput = document.querySelector('#name');
	const phoneInput = document.querySelector('#phone');

	if (!form) return;

	// allow only letters and spaces
	if (nameInput) {
		nameInput.addEventListener('input', () => {
			nameInput.value = nameInput.value.replace(/[^A-Za-z ]/g, '');
		});
	}

	// allow only numbers
	if (phoneInput) {
		phoneInput.addEventListener('input', () => {
			phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
		});
	}

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}
		notice.textContent =
			'Thank you. Your enquiry has been recorded for this website demo. The builder can connect this form to email or CRM later.';
		notice.style.display = 'block';
		form.reset();
	});
});
