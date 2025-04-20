const API_URL = "http://localhost:5000"; // Update if your server URL is different

// Admin Login Function
async function adminLogin(event) {
  event.preventDefault(); // Prevent default form submission

  const loginData = {
    email: document.getElementById("admin-email").value.trim(),
    password: document.getElementById("admin-password").value
  };

  try {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Admin login successful!");
      localStorage.setItem("admin", JSON.stringify(result.admin));
      window.location.href = "../HTML/adminDashboard.html"; // Redirect
    } else {
      alert(`⚠️ ${result.message || "Login failed"}`);
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    alert("❌ Something went wrong during login.");
  }
}

// Attach login handler
document.getElementById("loginForm").addEventListener("submit", adminLogin);
