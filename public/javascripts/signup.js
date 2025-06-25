// Password toggle functionality
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.toggle-password');
  if (toggle) {
    toggle.addEventListener('click', function () {
      const pwd = document.getElementById('password');
      const icon = this;
      if (pwd.type === 'password') {
        pwd.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        pwd.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    });
  }
});
