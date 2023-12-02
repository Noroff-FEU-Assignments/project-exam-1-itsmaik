const form = document.querySelector('.contact-form form');

form.addEventListener('submit', function (event) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  if (nameInput.value.length <= 5) {
    alert('Name must be more than 5 characters long');
    event.preventDefault();
    return;
  }

  if (!isValidEmail(emailInput.value)) {
    alert('Please enter a valid email address');
    event.preventDefault();
    return;
  }

  if (subjectInput.value.length <= 15) {
    alert('Subject must be more than 15 characters long');
    event.preventDefault();
    return;
  }

  if (messageInput.value.length <= 25) {
    alert('Message must be more than 25 characters long');
    event.preventDefault();
    return;
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}