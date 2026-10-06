document.addEventListener('DOMContentLoaded', () => {
	const login = document.querySelector('#loginForm');
	const register = document.querySelector('#registerForm');

	if (login) {
		login.addEventListener('submit', (event) => {
			event.preventDefault();
			if (!login.checkValidity()) return login.reportValidity();
			document.querySelector('#loginNotice').textContent =
				'Demo login submitted. Connect this form to the real resident portal before launch.';
			document.querySelector('#loginNotice').style.display = 'block';
		});
	}

	if (register) {
		const password = register.querySelector('#password');
		const confirm = register.querySelector('#confirm');

		register.addEventListener('submit', (event) => {
			confirm.setCustomValidity(password.value === confirm.value ? '' : 'Passwords do not match.');
			event.preventDefault();
			if (!register.checkValidity()) return register.reportValidity();
			document.querySelector('#registerNotice').textContent =
				'Demo account request submitted. Connect this form to the real account service before launch.';
			document.querySelector('#registerNotice').style.display = 'block';
			register.reset();
		});

		confirm.addEventListener('input', () => confirm.setCustomValidity(''));
	}
});
