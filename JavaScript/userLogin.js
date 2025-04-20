const API_URL = "http://localhost:5000"; // Backend URL

// **Signup Function**
async function signup(event) {
    event.preventDefault(); // Prevent form submission

    const userData = {
        name: document.getElementById("signup-name").value.trim(),
        phone: document.getElementById("signup-phone").value.trim(),
        email: document.getElementById("signup-email").value.trim(),
        password: document.getElementById("signup-password").value,
        address: document.getElementById("signup-address").value.trim(),
        gender: document.getElementById("signup-gender").value,
        dob: document.getElementById("signup-dob").value
    };

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Signup successful! Please log in.");
            toggleForm(); // Switch to login form
        } else {
            alert(`⚠️ ${result.message || "Signup failed"}`);
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("❌ Something went wrong during signup.");
    }
}

// **Login Function**
async function login(event) {
    event.preventDefault(); // Prevent form submission

    const loginData = {
        phone: document.getElementById("login-phone").value.trim(),
        password: document.getElementById("login-password").value
    };

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Login successful!");
            localStorage.setItem("user", JSON.stringify(result.user)); // Store user session
            window.location.href = "../HTML/userHome.html"; // Redirect to dashboard
        } else {
            alert(`⚠️ ${result.message || "Login failed"}`);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("❌ Something went wrong during login.");
    }
}

// Sidebar toggle
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

// Show add button on hover
function toggleAddButton(card, show) {
    const button = card.querySelector(".add-btn");
    button.style.display = show ? "block" : "none";
}

// **Toggle Form Between Signup & Login**
function toggleForm() {
    document.getElementById("signupForm").classList.toggle("hidden");
    document.getElementById("loginForm").classList.toggle("hidden");
}

// **Attach Event Listeners**
document.getElementById("signupForm").addEventListener("submit", signup);
document.getElementById("loginForm").addEventListener("submit", login);

document.getElementById("toggleSignup").addEventListener("click", () => {
    document.getElementById("signupForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
});

document.getElementById("toggleLogin").addEventListener("click", () => {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");
});
