const API_URL = "http://localhost:5000"; // Backend URL

// Toggle buttons and forms
const toggleLogin = document.getElementById("toggleLogin");
const toggleSignup = document.getElementById("toggleSignup");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Toggle between login and signup
toggleLogin.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  toggleLogin.classList.add("active");
  toggleSignup.classList.remove("active");
});

toggleSignup.addEventListener("click", () => {
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  toggleSignup.classList.add("active");
  toggleLogin.classList.remove("active");
});

// **Pharmacy Signup**
async function pharmacySignup(event) {
  event.preventDefault();

  const pharmacyData = {
    pharmacyName: document.getElementById("pharmacy-name").value.trim(),
    phone: document.getElementById("pharmacy-phone").value.trim(),
    email: document.getElementById("pharmacy-email").value.trim(),
    password: document.getElementById("pharmacy-password").value,
    address: document.getElementById("pharmacy-address").value.trim()
  };

  try {
    const response = await fetch(`${API_URL}/pharmacy/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pharmacyData)
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Pharmacy registered successfully. Please log in.");
      toggleLogin.click(); // Switch to login form
    } else {
      alert(`⚠️ ${result.message || "Signup failed"}`);
    }
  } catch (error) {
    console.error("Pharmacy Signup Error:", error);
    alert("❌ Something went wrong during signup.");
  }
}

// **Pharmacy Login**
async function pharmacyLogin(event) {
  event.preventDefault();

  const loginData = {
    phone: document.getElementById("login-phone").value.trim(),
    password: document.getElementById("login-password").value
  };

  try {
    const response = await fetch(`${API_URL}/pharmacy/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Login successful!");
      localStorage.setItem("pharmacy", JSON.stringify(result.pharmacy));
      window.location.href = "../HTML/testt.html"; // Redirect
    } else {
      alert(`⚠️ ${result.message || "Login failed"}`);
    }
  } catch (error) {
    console.error("Pharmacy Login Error:", error);
    alert("❌ Something went wrong during login.");
  }
}

// Attach event listeners
document.getElementById("signupForm").addEventListener("submit", pharmacySignup);
document.getElementById("loginForm").addEventListener("submit", pharmacyLogin);
