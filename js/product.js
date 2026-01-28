// Product.js - Product Detail Page
document.addEventListener('DOMContentLoaded', async function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'catalog.html';
        return;
    }

    try {
        // Fetch products
        const response = await fetch('products.json');
        const data = await response.json();
        const product = data.products.find(p => p.id === productId);

        if (!product) {
            document.getElementById('product-detail').innerHTML = '<p class="error-message">Producto no encontrado.</p>';
            return;
        }

        // Render product details
        renderProductDetail(product);

        // Setup buy button
        const buyButton = document.getElementById('buy-button');
        if (buyButton) {
            buyButton.addEventListener('click', () => handlePurchase(product));
        }

    } catch (error) {
        console.error('Error loading product:', error);
        document.getElementById('product-detail').innerHTML = '<p class="error-message">Error cargando producto.</p>';
    }
});

function renderProductDetail(product) {
    const detailContainer = document.getElementById('product-detail');
    
    const featuresHTML = product.features 
        ? `<ul class="feature-list">
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
           </ul>`
        : '';

    detailContainer.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-image-section">
                <img src="${product.image}" alt="${product.name}" class="product-detail-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect fill=%22%23667eea%22 width=%22600%22 height=%22600%22/%3E%3C/svg%3E'">
            </div>
            <div class="product-info-section">
                <span class="product-category-badge">${product.category}</span>
                <h1 class="product-detail-title">${product.name}</h1>
                <p class="product-detail-description">${product.description}</p>
                
                ${featuresHTML}
                
                <div class="product-price-section">
                    <p class="product-detail-price">${product.price.toFixed(2)} ${product.currency}</p>
                    <button id="buy-button" class="btn btn-primary btn-large">
                        🛒 Comprar Ahora
                    </button>
                </div>
            </div>
        </div>
    `;

    /*
    // Track product view
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            event: 'product_view',
            product_name: product.name,
            product_id: product.id,
            price: product.price,
            currency: product.currency
        });
    }
        */
}

function handlePurchase(product) {
    /*
    // Track purchase event
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            event: 'add_to_cart',
            product_name: product.name,
            product_id: product.id,
            price: product.price,
            currency: product.currency
        });
    }
    

    s.linkTrackVars ="events";  //Quiero que solo mires eventos ahora
    s.linkTrackEvents = "event1"; //Como se llama el evnto que voy a registar
    s.events = "event1";  //Este es el evento que acaba de pasar(Necesatio aunque redundante)
    s.tl(this, 'o', "producto Comprado")
*/
    // Show success message
    window.addItem({
        id:product.id;
        name:product.name,
        price:product.price,
        category:product.category
    });

    alert(`¡${product.name} agregado al carrito!`);

   

    /*
    // Optional: redirect to contact form or checkout
    // window.location.href = 'contactForm.html';
    */
}
