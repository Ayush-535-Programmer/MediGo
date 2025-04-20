const API_URL = "http://localhost:5000";

const medicineForm = document.getElementById("medicineForm");
const imageInput = document.getElementById("medicineImage");
const imagePreview = document.getElementById("imagePreview");

let imageBase64 = "";

// Convert image to Base64
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imageBase64 = reader.result;
      imagePreview.src = imageBase64;
      imagePreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
});

// Submit form
medicineForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const medicine = {
    image: imageBase64,
    name: document.getElementById("medicineName").value.trim(),
    description: document.getElementById("medicineDescription").value.trim(),
    category: document.getElementById("medicineCategory").value.trim(),  // 👈 Add this line
    price: parseFloat(document.getElementById("medicinePrice").value),
    needPrescription: document.getElementById("needPrescription").value,
  };
  

  try {
    const res = await fetch(`${API_URL}/admin/add-medicine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medicine),
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Medicine added successfully!");
      medicineForm.reset();
      imagePreview.classList.add("hidden");
    } else {
      alert(`❌ ${result.message}`);
    }
  } catch (error) {
    console.error("Add Medicine Error:", error);
    alert("Something went wrong!");
  }
});
