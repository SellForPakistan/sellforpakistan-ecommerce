// 🏠 JS FILE: home.js

document.addEventListener("DOMContentLoaded", initHome);

async function initHome() {
  loadBanners();
  loadCategories();
  loadProducts();
}

// 🔵 BANNERS (SLIDER)
async function loadBanners() {
  const banners = await getBanners();
  const hero = document.getElementById("heroBanner");

  let i = 0;

  function show() {
    hero.innerHTML = `
      <img src="${banners[i]["Banner Image"]}">
    `;
  }

  show();

  setInterval(() => {
    i = (i + 1) % banners.length;
    show();
  }, 3000);
}

// 🔵 CATEGORIES
async function loadCategories() {
  const categories = await getCategories();
  const grid = document.getElementById("categoriesGrid");

  grid.innerHTML = "";

  categories.forEach(c => {
    grid.innerHTML += `
      <div class="category-card">
        <img src="${c["Category Image"]}">
        <p>${c["Category Name"]}</p>
      </div>
    `;
  });
}

// 🔵 PRODUCTS
async function loadProducts() {
  const products = await getProducts();
  const grid = document.getElementById("productsGrid");

  grid.innerHTML = "";

  products.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p["Main Image"]}">
        <p>${p["Product Name"]}</p>
        <p>Rs ${p["Price"]}</p>
      </div>
    `;
  });
}