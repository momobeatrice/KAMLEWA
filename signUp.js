// script.js
document.getElementById('togglePassword').addEventListener('click', function (e) {
    // Get the password input field
    const password = document.getElementById('password');
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // Toggle the button text
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});
