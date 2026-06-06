document.addEventListener("DOMContentLoaded", initCategory);

async function initCategory() {
  const categoryId = getCategoryFromURL();

  loadLogo();
  loadProducts(categoryId);
}

// ================= GET CATEGORY ID =================

function getCategoryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// ================= LOAD LOGO =================

async function loadLogo() {
  const logos = await getLogo();

  const mainLogo = logos.find(
    l => l["Logo Type"] === "MAIN_LOGO" && l.Status === "ON"
  );

  const logoImg = document.getElementById("siteLogo");

  if (mainLogo) {
    logoImg.src = mainLogo["Logo Image"];
  }
}

// ================= LOAD PRODUCTS =================

async function loadProducts(categoryId) {

  const products = await getProducts();

  const grid = document.getElementById("productsGrid");

  grid.innerHTML = "";

  const filtered = products.filter(
    p => p["Category ID"] === categoryId && p.Status === "ON"
  );

  // TITLE CHANGE
  document.getElementById("categoryTitle").innerText =
    categoryId || "Products";

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        No products found in this category
      </div>
    `;
    return;
  }

  filtered.forEach(p => {

    grid.innerHTML += `
      <a class="product-card" href="product.html?id=${p["Product ID"]}">

        <img src="${p["Main Image"] || ''}" alt="">

        <div class="product-info">
          <h3>${p["Product Name"]}</h3>
          <div class="price">Rs ${p["Price"]}</div>
        </div>

      </a>
    `;
  });
}