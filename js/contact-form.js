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
			notice.textContent = 'Please complete the required fields before submitting this demo form.';
			notice.style.display = 'block';
			return;
		}
		notice.textContent =
			'This is a demo form only. Connect it to the real enquiry workflow before launch.';
		notice.style.display = 'block';
		form.reset();
	});
});
