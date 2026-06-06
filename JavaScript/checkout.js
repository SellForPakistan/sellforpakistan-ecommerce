document.addEventListener("DOMContentLoaded", initCheckout);

let selectedProduct = null;

async function initCheckout() {
  loadLogo();
  const productId = getProductId();
  await loadProduct(productId);
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

  selectedProduct = products.find(
    p => p["Product ID"] === productId
  );

  const box = document.getElementById("checkoutBox");

  if (!selectedProduct) {
    box.innerHTML = `<div class="error-msg">Product not found</div>`;
    return;
  }

  box.innerHTML = `
    <div class="checkout-box">

      <h2>Checkout</h2>

      <div class="order-summary">
        <p><b>Product:</b> ${selectedProduct["Product Name"]}</p>
        <p><b>Price:</b> Rs ${selectedProduct["Price"]}</p>
      </div>

      <input type="text" id="name" placeholder="Your Name" required>
      <input type="text" id="phone" placeholder="Phone Number" required>
      <input type="text" id="phone2" placeholder="Optional Phone Number">
      <input type="text" id="city" placeholder="City" required>
      <textarea id="address" placeholder="Full Address" required></textarea>

      <button class="btn" onclick="placeOrder()">
        Place Order
      </button>

      <div id="msg"></div>

    </div>
  `;
}

// ================= PLACE ORDER =================

async function placeOrder() {

  const msg = document.getElementById("msg");

  const orderData = {
    productId: selectedProduct["Product ID"],
    productName: selectedProduct["Product Name"],
    price: selectedProduct["Price"],

    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    phone2: document.getElementById("phone2").value,
    city: document.getElementById("city").value,
    address: document.getElementById("address").value
  };

  // validation
  if (!orderData.name || !orderData.phone || !orderData.city || !orderData.address) {
    msg.innerHTML = `<div class="error-msg">Please fill all required fields</div>`;
    return;
  }

  try {
    const res = await fetch(CONFIG.API_URL, {
      method: "POST",
      body: JSON.stringify(orderData)
    });

    const result = await res.json();

    if (result.success) {
      msg.innerHTML = `
        <div class="success-msg">
          🎉 Order Placed Successfully!<br>
          You will receive your product in 3–5 days.
        </div>
      `;
    } else {
      msg.innerHTML = `<div class="error-msg">Order failed</div>`;
    }

  } catch (err) {
    msg.innerHTML = `<div class="error-msg">Server Error</div>`;
  }
}