document.addEventListener("DOMContentLoaded", initProduct);

async function initProduct() {
  const productId = getProductId();

  loadLogo();
  loadProduct(productId);
}

// ================= GET PRODUCT ID =================

function getProductId() {
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

// ================= LOAD PRODUCT =================

async function loadProduct(productId) {

  const products = await getProducts();

  const product = products.find(
    p => p["Product ID"] === productId
  );

  const container = document.getElementById("productContainer");

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        Product not found
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="product-box">

      <!-- IMAGE -->
      <div class="product-images">
        <img src="${product["Main Image"] || ''}" alt="">
      </div>

      <!-- INFO -->
      <div class="product-info">

        <h2>${product["Product Name"]}</h2>

        <p>${product["Description"] || ''}</p>

        <div class="price">Rs ${product["Price"]}</div>

        <a href="checkout.html?id=${product["Product ID"]}" class="buy-btn">
          Buy Now
        </a>

      </div>

    </div>
  `;
}