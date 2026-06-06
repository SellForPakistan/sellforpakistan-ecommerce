async function fetchSheet(sheet) {
  try {
    const response = await fetch(
      `${CONFIG.API_URL}&sheet=${sheet}`
    );

    const result = await response.json();

    if (result.success) {
      return result.data;
    }

    return [];

  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getCategories() {
  return await fetchSheet("Categories");
}

async function getProducts() {
  return await fetchSheet("Products");
}

async function getBanners() {
  return await fetchSheet("Banners");
}

async function getLogo() {
  return await fetchSheet("Logo");
}