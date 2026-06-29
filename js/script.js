const plants = [
  {
    id: 1,
    name: "Snake Plant",
    price: 24,
    description: "A sculptural favorite that thrives in bright or dim rooms.",
    icon: "🌿",
  },
  {
    id: 2,
    name: "Peace Lily",
    price: 19,
    description: "Elegant leaves and soft white blooms for calm interiors.",
    icon: "🪴",
  },
  {
    id: 3,
    name: "Pothos",
    price: 16,
    description: "Trail this lush vine along shelves or desks with ease.",
    icon: "🍃",
  },
  {
    id: 4,
    name: "ZZ Plant",
    price: 22,
    description: "Glossy, easy-care foliage for busy spaces and offices.",
    icon: "🌱",
  },
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

function renderProducts() {
  productList.innerHTML = plants
    .map(
      (plant) => `
        <article class="product-card">
          <div class="plant-icon">${plant.icon}</div>
          <h3>${plant.name}</h3>
          <p>${plant.description}</p>
          <div class="cart-header">
            <span class="price">$${plant.price}</span>
            <button class="primary-btn" data-id="${plant.id}">Add</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty">Your cart is empty.</p>';
    cartCount.textContent = "0";
    cartTotal.textContent = "$0";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <span>${item.name}</span>
          <strong>$${item.price}</strong>
        </div>
      `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = cart.length;
  cartTotal.textContent = `$${total}`;
}

function addToCart(id) {
  const plant = plants.find((item) => item.id === id);
  if (plant) {
    cart.push(plant);
    renderCart();
  }
}

productList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;

  addToCart(Number(button.dataset.id));
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Add a plant to your cart before checking out.");
    return;
  }

  alert(`Thank you for your order! You picked ${cart.length} plant(s).`);
  cart = [];
  renderCart();
});

renderProducts();
renderCart();
