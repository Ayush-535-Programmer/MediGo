// Toggle Sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Show/Hide Add Button on Hover
function toggleAddButton(card, show) {
  const addButton = card.querySelector(".add-btn");
  addButton.style.display = show ? "block" : "none";
}

// Load User Profile
function loadUserProfileCard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("profile-card-name").innerText = user.name;
    document.getElementById("profile-card-email").innerText = user.email;
    document.getElementById("profile-card-phone").innerText = user.phone;
    document.getElementById("profile-card-address").innerText = user.address || "N/A";
    document.getElementById("profile-card-gender").innerText = user.gender || "N/A";
    document.getElementById("profile-card-dob").innerText = user.dob || "N/A";
    document.getElementById("profile-name").innerText = user.name;
  } else {
    document.getElementById("profile-card-name").innerText = "Guest";
    document.getElementById("profile-card-email").innerText = "guest@example.com";
    document.getElementById("profile-card-phone").innerText = "N/A";
    document.getElementById("profile-card-address").innerText = "N/A";
    document.getElementById("profile-card-gender").innerText = "N/A";
    document.getElementById("profile-card-dob").innerText = "N/A";
  }
}

// Get cart key based on user
function getCartKey() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? `cart_${user.email}` : "cart_guest";
}

// Logout Function
function logout() {
  localStorage.removeItem("user");
  window.location.href = "userLogin.html";
}

// Fetch and Display Medicines
// Normalize strings for consistent comparison
function normalize(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Fetch and Display Medicines
async function fetchAndDisplayMedicines(selectedCategory = "all") {
  try {
    const res = await fetch("http://localhost:5000/medicines");
    const medicines = await res.json();
    const container = document.getElementById("medicine-container");
    container.innerHTML = "";

    const normalizedCategory = normalize(selectedCategory);

    const filteredMeds = normalizedCategory === "all"
      ? medicines
      : medicines.filter(med => normalize(med.category) === normalizedCategory);

    if (filteredMeds.length === 0) {
      container.innerHTML = `<p>No medicines found for "${selectedCategory}".</p>`;
      return;
    }

    filteredMeds.forEach(med => {
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("onmouseover", "toggleAddButton(this, true)");
      card.setAttribute("onmouseout", "toggleAddButton(this, false)");

      card.innerHTML = `
        <img src="${med.image}" alt="Medicine">
        <h3>${med.name}</h3>
        <p>${med.description}</p>
        <p class="price">₹${med.price}</p>
        <button class="add-btn" style="display: none;">Add to Cart</button>
      `;

      card.querySelector(".add-btn").addEventListener("click", () => {
        addToCart(med.name, med.image, med.price);
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching medicines:", error);
  }
}

// Add to Cart
function addToCart(name, image, price) {
  const cartKey = getCartKey();
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, image, price, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
}

// Update Cart Count
function updateCartCount() {
  const cartKey = getCartKey();
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");

  cartCountElement.innerText = count;
  cartCountElement.style.display = count > 0 ? "block" : "none";
}

// Open Cart Page
function openCartPage() {
  window.location.href = "addToCart.html";
}

// Toggle Profile Card
function toggleProfileCard() {
  const profileCard = document.getElementById("profile-card");
  profileCard.style.display = (profileCard.style.display === "block") ? "none" : "block";
}

// Event Listeners
document.addEventListener("DOMContentLoaded", async function () {
  loadUserProfileCard();
  await fetchAndDisplayMedicines();
  updateCartCount();

  document.querySelector(".cart-container").addEventListener("click", openCartPage);

  // Sidebar category link handling
  document.querySelectorAll(".categories a").forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const selectedCategory = link.getAttribute("data-category");

      document.querySelectorAll(".categories a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");

      await fetchAndDisplayMedicines(selectedCategory);
    });
  });

  // Category dropdown handling
  const categorySelect = document.getElementById("medicineCategory");
  if (categorySelect) {
    categorySelect.addEventListener("change", async () => {
      const selectedValue = categorySelect.value;
      if (selectedValue) {
        await fetchAndDisplayMedicines(selectedValue);
      } else {
        await fetchAndDisplayMedicines("all");
      }
    });
  }
});
document.getElementById("medicineCategory").addEventListener("change", async () => {
  const selectedCategory = document.getElementById("medicineCategory").value;
  await fetchAndDisplayMedicines(selectedCategory || "all");
});

