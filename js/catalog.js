// Catalog.js - Dynamic Product Catalog
document.addEventListener("DOMContentLoaded", async function () {
  const catalogContainer = document.getElementById("product-grid");

  if (!catalogContainer) {
    console.error("Catalog container not found");
    return;
  }

  try {
    // Fetch products from JSON
    const response = await fetch("products.json");
    const data = await response.json();
    const products = data.products;

    // Render products
    renderProducts(products);

    // Setup search functionality
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
      });
    }

    // Setup category filter
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
      categoryFilter.addEventListener("change", (e) => {
        const category = e.target.value.toLowerCase();

        const filteredProducts =
          category === "all"
            ? products
            : products.filter(
                (product) =>
                  product.category.toLowerCase() === category
              );

        renderProducts(filteredProducts);
      });
    }
  } catch (error) {
    console.error("Error loading products:", error);
    catalogContainer.innerHTML =
      '<p class="error-message">Error cargando productos. Por favor, intenta de nuevo.</p>';
  }
});

function renderProducts(products) {
  const catalogContainer = document.getElementById("product-grid");

  if (products.length === 0) {
    catalogContainer.innerHTML =
      '<p class="no-results">No se encontraron productos.</p>';
    return;
  }

  catalogContainer.innerHTML = products
    .map(
      (product) => `
        <div class="product-card" onclick="goToProduct('${product.id}')">
            <img src="${product.image}" alt="${
        product.name
      }" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect fill=%22%23667eea%22 width=%22600%22 height=%22600%22/%3E%3C/svg%3E'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description.substring(
                  0,
                  80
                )}...</p>
                <p class="product-price">${product.price.toFixed(2)} ${
        product.currency
      }</p>
                <span class="product-category">${product.category}</span>
            </div>
        </div>
    `
    )
    .join("");

  // Add animation to cards
  const cards = catalogContainer.querySelectorAll(".product-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add("animate-fadeInUp");
  });
}

function goToProduct(productId) {
  // Track catalog click event
  /*
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      event: "product_click",
      product_id: productId,
    });
  }
  */
  //version basica
  s.linkTrackVars ="events";  //Quiero que solo mires eventos ahora
  s.linkTrackEvents = "event1"; //Como se llama el evnto que voy a registar
  s.events = "event1";  //Este es el evento que acaba de pasar(Necesatio aunque redundante)
  s.tl(this, 'o', "Paso a Producto")
  /*
  //version con parametros
  s.linkTrackVars ="events,eVars1";  //Quiero que solo mires eventos ahora y la variable 1
  s.linkTrackEvents = "event1"; //Como se llama el evnto que voy a registar
  s.events = "event1";  //Este es el evento que acaba de pasar(Necesatio aunque redundante)
  s.eVars1 = productId;
  s.tl(this, 'o', "Paso a Producto")
  */

   setTimeout(function () {
    window.location.href = `product.html?id=${productId}`;
  }, 300);
}
