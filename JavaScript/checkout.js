// 🛒 JS FILE: checkout.js

let selectedProduct = null;

document.addEventListener("DOMContentLoaded", initCheckout);

async function initCheckout() {

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const products = await getProducts();

  selectedProduct = products.find(p => p["Product ID"] === productId);

  if (!selectedProduct) {
    document.getElementById("productBox").innerHTML = "<h3>Product Not Found</h3>";
    return;
  }

  // PRODUCT DISPLAY
  document.getElementById("productBox").innerHTML = `
    <img src="${selectedProduct["Main Image"]}">
    <h3>${selectedProduct["Product Name"]}</h3>
    <p>Rs ${selectedProduct["Price"]}</p>
  `;

  // FORM
  document.getElementById("checkoutBox").innerHTML = `
    <input id="name" placeholder="Full Name">
    <input id="phone" placeholder="Phone Number">
    <input id="city" placeholder="City">
    <textarea id="address" placeholder="Address"></textarea>

    <button onclick="placeOrder()">Place Order</button>

    <p id="msg"></p>
  `;
}

// 🔥 PLACE ORDER
async function placeOrder() {

  const order = {
    productId: selectedProduct["Product ID"],
    productName: selectedProduct["Product Name"],
    price: selectedProduct["Price"],
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    city: document.getElementById("city").value,
    address: document.getElementById("address").value
  };

  const res = await fetch(CONFIG.API_URL, {
    method: "POST",
    body: JSON.stringify(order)
  });

  const data = await res.json();

  document.getElementById("msg").innerText =
    data.success ? "Order Placed Successfully ✔" : "Order Failed ❌";
}