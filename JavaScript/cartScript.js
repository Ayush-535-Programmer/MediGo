document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
});

function getCartKey() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? `cart_${user.email}` : "cart_guest";
}

function displayCartItems() {
  const cartKey = getCartKey();
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.innerText = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotalPrice = item.price * item.quantity;
    totalPrice += itemTotalPrice;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <div class="quantity-controls">
          <button class="qty-btn" onclick="updateQuantity(${index}, 'decrease')">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity(${index}, 'increase')">+</button>
        </div>
        <p>Total: ₹${itemTotalPrice.toFixed(2)}</p>
        <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  totalPriceElement.innerText = totalPrice.toFixed(2);
}

function updateQuantity(index, action) {
  const cartKey = getCartKey();
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (action === "increase") {
    cart[index].quantity += 1;
  } else if (action === "decrease") {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      return;
    }
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  displayCartItems();
}

function removeCartItem(index) {
  const cartKey = getCartKey();
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart.splice(index, 1);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  displayCartItems();
}

function clearCart() {
  const cartKey = getCartKey();
  localStorage.removeItem(cartKey);
  displayCartItems();
}
