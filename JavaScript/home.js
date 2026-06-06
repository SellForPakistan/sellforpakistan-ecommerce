document.addEventListener("DOMContentLoaded", initHome);

async function initHome() {
  loadLogo();
  loadCategories();
  loadBanners();
}

// ================= LOGO =================

async function loadLogo() {
  const logos = await getLogo();

  const mainLogo = logos.find(l => l["Logo Type"] === "MAIN_LOGO" && l.Status === "ON");

  const logoImg = document.getElementById("siteLogo");

  if (mainLogo && mainLogo["Logo Image"]) {
    logoImg.src = mainLogo["Logo Image"];
  } else {
    logoImg.style.display = "none";
  }
}

// ================= CATEGORIES =================

async function loadCategories() {
  const categories = await getCategories();

  const menu = document.getElementById("categoriesMenu");
  const grid = document.getElementById("categoriesGrid");

  menu.innerHTML = "";
  grid.innerHTML = "";

  categories.forEach(cat => {

    if (cat.Status !== "ON") return;

    // MENU
    menu.innerHTML += `
      <a href="category.html?id=${cat["Category Link"]}">
        ${cat["Category Name"]}
      </a>
    `;

    // IMAGE HANDLING
    let imageHTML = "";

    if (cat["Category Image"]) {
      imageHTML = `<img src="${cat["Category Image"]}" alt="">`;
    } else {
      imageHTML = `<div class="category-placeholder">No Image</div>`;
    }

    // GRID CARD
    grid.innerHTML += `
      <a class="category-card" href="category.html?id=${cat["Category Link"]}">
        
        <div class="category-image">
          ${imageHTML}
        </div>

        <div class="category-info">
          <h3>${cat["Category Name"]}</h3>
        </div>

      </a>
    `;
  });
}

// ================= BANNERS =================

async function loadBanners() {
  const banners = await getBanners();

  const hero = document.getElementById("heroBanner");

  hero.innerHTML = "";

  const activeBanners = banners.filter(b => b.Status === "ON");

  if (activeBanners.length === 0) {
    hero.innerHTML = `
      <div class="banner-placeholder">
        <h2>Sell For Pakistan</h2>
        <p>Premium Cosmetics Store</p>
      </div>
    `;
    return;
  }

  // SIMPLE SLIDER (AUTO ROTATE)
  let index = 0;

  function showBanner(i) {
    hero.innerHTML = `
      <img src="${activeBanners[i]["Banner Image"]}" alt="banner">
    `;
  }

  showBanner(index);

  setInterval(() => {
    index = (index + 1) % activeBanners.length;
    showBanner(index);
  }, 3000);
}