// ⚙️ JS FILE: api.js

async function fetchSheet(sheet) {
  try {
    const res = await fetch(`${CONFIG.API_URL}?sheet=${sheet}`);
    const data = await res.json();

    if (data.success) return data.data;
    return [];

  } catch (err) {
    console.log(err);
    return [];
  }
}

// API FUNCTIONS
const getCategories = () => fetchSheet("Categories");
const getProducts   = () => fetchSheet("Products");
const getBanners    = () => fetchSheet("Banners");
const getLogo       = () => fetchSheet("Logo");