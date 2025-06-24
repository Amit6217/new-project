
// Password toggle functionality
document.querySelector('.toggle-password').addEventListener('click', function () {
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




document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const remember = document.getElementById('remember').checked;
  const statusEl = document.getElementById('loginStatus');

  // Clear previous status
  statusEl.textContent = '';
  statusEl.className = 'status-message';

  if (!username || !password) {
    statusEl.textContent = "❌ Please enter both username and password.";
    statusEl.classList.add('error');
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
      statusEl.textContent = "✅ Login successful! Redirecting...";
      statusEl.classList.add('success');

      if (remember) {
        localStorage.setItem("username", username);
        localStorage.setItem("role", result.role || "student");
      } else {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("role", result.role || "student");
      }

      setTimeout(() => {
        window.location.href = "../market/market.html";
      }, 1000); // short delay for user to see message
    } else {
      statusEl.textContent = "❌ " + result.error;
      statusEl.classList.add('error');
    }

  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Server error. Try again later.";
    statusEl.classList.add('error');
  }
});

