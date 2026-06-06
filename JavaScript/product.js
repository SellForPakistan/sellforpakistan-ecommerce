// 📄 JS FILE: product.js (SINGLE PRODUCT PAGE)

document.addEventListener("DOMContentLoaded", loadProduct);

async function loadProduct() {

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const products = await getProducts();

  const product = products.find(p => p["Product ID"] === productId);

  const box = document.getElementById("productContainer");

  if (!product) {
    box.innerHTML = "<h2>Product Not Found</h2>";
    return;
  }

  box.innerHTML = `
    <img src="${product["Main Image"]}">

    <h2>${product["Product Name"]}</h2>

    <p>${product["Description"] || ""}</p>

    <h3>Rs ${product["Price"]}</h3>

    <a class="buy-btn" href="checkout.html?id=${product["Product ID"]}">
      Buy Now
    </a>
  `;
}