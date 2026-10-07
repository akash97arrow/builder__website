document.addEventListener('DOMContentLoaded', () => {
	const login = document.querySelector('#loginForm');
	const register = document.querySelector('#registerForm');

	if (login) {
		login.addEventListener('submit', (event) => {
			event.preventDefault();
			if (!login.checkValidity()) return login.reportValidity();
			document.querySelector('#loginNotice').textContent =
				'This is a demo login form only. Connect it to the real resident portal before launch.';
			document.querySelector('#loginNotice').style.display = 'block';
		});
	}

	if (register) {
		const password = register.querySelector('#password');
		const confirm = register.querySelector('#confirm');

		register.addEventListener('submit', (event) => {
			confirm.setCustomValidity(password.value === confirm.value ? '' : 'Passwords do not match.');
			event.preventDefault();
			if (!register.checkValidity()) {
				register.reportValidity();
				return;
			}
			document.querySelector('#registerNotice').textContent =
				'This is a demo registration form only. Connect it to the real account service before launch.';
			document.querySelector('#registerNotice').style.display = 'block';
			register.reset();
		});

		confirm.addEventListener('input', () => confirm.setCustomValidity(''));
	}
});
