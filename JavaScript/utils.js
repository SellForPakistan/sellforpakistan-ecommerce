// ================= URL PARAMS HELPER =================
function getParam(name) {
const url = new URLSearchParams(window.location.search);
return url.get(name);
}

// ================= LOADING UI =================
function showLoading(elementId) {
document.getElementById(elementId).innerHTML =
"<p>Loading...</p>";
}

// ================= ALERT MESSAGE =================
function showMessage(msg) {
alert(msg);
}

// ================= FORMAT PRICE =================
function formatPrice(price) {
return "Rs " + Number(price).toLocaleString();
}

// ================= SAVE TO LOCAL (optional future use) =================
function saveLocal(key, value) {
localStorage.setItem(key, JSON.stringify(value));
}

// ================= GET FROM LOCAL =================
function getLocal(key) {
return JSON.parse(localStorage.getItem(key));
}