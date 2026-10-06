document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contactForm');
  const notice = document.querySelector('#formNotice');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    notice.textContent = 'Thank you. Your enquiry has been recorded for this website demo. The builder can connect this form to email or CRM later.';
    notice.style.display = 'block';
    form.reset();
  });
});
