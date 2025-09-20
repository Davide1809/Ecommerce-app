// Assumes products.js is loaded before this script

// Cart array to store added products
const cart = [];

function displayProducts(products) {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    card.querySelector('button').addEventListener('click', function() {
      addToCart(product);
    });
    grid.appendChild(card);
  });

function addToCart(product) {
  cart.push(product);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartSection = document.querySelector('.cart');
  if (!cartSection) return;
  if (cart.length === 0) {
    cartSection.innerHTML = '<h2>Cart</h2><p>Your cart is empty.</p>';
    return;
  }
  let html = '<h2>Cart</h2><ul style="padding-left:1em">';
  cart.forEach((item, idx) => {
    html += `<li>${item.name} - $${item.price.toFixed(2)} <button data-idx="${idx}" style="margin-left:10px; background:#e74c3c; color:#fff; border:none; border-radius:3px; padding:2px 8px; cursor:pointer;">Remove</button></li>`;
  });
  html += '</ul>';
  html += `<p><strong>Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</strong></p>`;
  cartSection.innerHTML = html;
  // Add event listeners for remove buttons
  cartSection.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(btn.getAttribute('data-idx'));
      removeFromCart(idx);
    });
  });
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartDisplay();
}
}

// Example usage (if products is globally available)
if (typeof products !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartDisplay();
    // Search bar functionality
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
      searchBar.addEventListener('input', function() {
        const query = searchBar.value.trim().toLowerCase();
        console.log('Search query:', query);
        const filtered = products.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
        displayProducts(filtered);
      });
    }
  });
}
