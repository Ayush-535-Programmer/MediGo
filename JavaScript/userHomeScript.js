// Toggle Sidebar
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }
  
// Show/Hide Add Button on Hover
function toggleAddButton(card, show) {
  const addButton = card.querySelector('.add-btn');
  addButton.style.display = show ? 'block' : 'none';
}

// Function to load user profile from localStorage
function loadUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
      document.getElementById("profile-name").innerText = user.name;
      
      // If user has a profile picture, update it
      if (user.profileImage) {
          document.getElementById("profile-img").src = user.profileImage;
      }
  } else {
      document.getElementById("profile-name").innerText = "Guest";
  }
}

// Function to load user profile from localStorage
function loadUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
      document.getElementById("profile-card-name").innerText = user.name;
      document.getElementById("profile-card-email").innerText = user.email;
      
      if (user.profileImage) {
          document.getElementById("profile-card-img").src = user.profileImage;
      }
  } else {
      document.getElementById("profile-card-name").innerText = "Guest";
      document.getElementById("profile-card-email").innerText = "guest@example.com";
  }
}

// Function to toggle profile card visibility
function toggleProfileCard() {
  const profileCard = document.getElementById("profile-card");
  profileCard.style.display = (profileCard.style.display === "block") ? "none" : "block";
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

  