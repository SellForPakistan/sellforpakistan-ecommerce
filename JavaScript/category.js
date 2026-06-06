// 📂 JS FILE: category.js

document.addEventListener("DOMContentLoaded", loadCategoryProducts);

async function loadCategoryProducts() {

  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("id");

  const products = await getProducts();

  const filtered = products.filter(p => p["Category ID"] === categoryId);

  const grid = document.getElementById("productsGrid");

  grid.innerHTML = "";

  filtered.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p["Main Image"]}">
        <h3>${p["Product Name"]}</h3>
        <p>Rs ${p["Price"]}</p>
      </div>
    `;
  });
}