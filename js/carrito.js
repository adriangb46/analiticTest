/* =============================
   Carrito Moderno - Inyectable
   ============================= */

// 1️⃣ Insertar modal y botón en el body
(function() {
  const carritoHTML = `
<button id="openCartBtn" class="btn btn-primary" style="position:fixed; bottom:20px; right:20px; z-index:9999;">🛒 Carrito</button>

<div id="cartModal" style="display:none; position:fixed; z-index:9998; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5);">
  <div style="
      background: var(--bg-card);
      max-width: 600px;
      margin: 50px auto;
      padding: var(--space-lg);
      border-radius: var(--radius-lg);
      position: relative;
      box-shadow: var(--shadow-lg);
  ">
    <h2 class="text-center mb-3">Tu Carrito</h2>
    <table style="width:100%; border-collapse: collapse; margin-bottom: var(--space-md);">
      <thead>
        <tr>
          <th style="color:var(--text-secondary); text-align:left;">Producto</th>
          <th style="color:var(--text-secondary); text-align:right;">Precio</th>
          <th style="color:var(--text-secondary); text-align:center;">Cant</th>
          <th style="color:var(--text-secondary); text-align:right;">Subtotal</th>
          <th style="color:var(--text-secondary); text-align:center;">Acciones</th>
        </tr>
      </thead>
      <tbody id="cart-body"></tbody>
    </table>
    <p style="text-align:right;"><strong>Total: $<span id="total">0.00</span></strong></p>
    <div style="text-align:center;">
      <button class="btn btn-secondary" id="clearCartBtn">Vaciar Carrito</button>
      <button class="btn btn-primary" id="checkoutBtn">Finalizar Compra</button>
      <button class="btn btn-secondary" id="closeCartBtn">Cerrar</button>
    </div>
  </div>
</div>
`;
  document.body.insertAdjacentHTML('beforeend', carritoHTML);

  // 2️⃣ Funciones de manipulación del carrito
  function getCart() {
    return JSON.parse(sessionStorage.getItem('cart')) || [];
  }

  function setCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  function renderCart() {
    const cart = getCart();
    const cartBody = document.getElementById('cart-body');
    const totalEl = document.getElementById('total');

    cartBody.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-secondary);">El carrito está vacío</td></tr>`;
      totalEl.textContent = '0.00';
      return;
    }

    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="color:var(--text-primary);">${item.name}</td>
        <td style="text-align:right; color:var(--accent);">$${item.price.toFixed(2)}</td>
        <td style="text-align:center; color:var(--text-primary);">${item.quantity}</td>
        <td style="text-align:right; color:var(--accent);">$${subtotal.toFixed(2)}</td>
        <td style="text-align:center;">
          <button class="btn btn-secondary" data-action="remove" data-id="${item.id}">Eliminar</button>
          <button class="btn btn-primary" data-action="increase" data-id="${item.id}">+</button>
          <button class="btn btn-primary" data-action="decrease" data-id="${item.id}">-</button>
        </td>
      `;
      cartBody.appendChild(row);
    });

    totalEl.textContent = total.toFixed(2);
  }

  function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    setCart(cart);
    renderCart();
  }

  function increaseQty(id) {
    const cart = getCart().map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item);
    setCart(cart);
    renderCart();
  }

  function decreaseQty(id) {
    const cart = getCart().map(item => {
      if (item.id === id) return {...item, quantity: Math.max(item.quantity - 1, 1)};
      return item;
    });
    setCart(cart);
    renderCart();
  }

  function clearCart() {
    sessionStorage.removeItem('cart');
    renderCart();
  }

  function checkout() {
    alert("Redirigiendo a la página de pago...");
    // window.location.href = "/checkout.html";
  }

  // 3️⃣ Funciones del modal
  function openCart() { 
    document.getElementById('cartModal').style.display = 'block'; 
    renderCart();
  }

  function closeCart() { document.getElementById('cartModal').style.display = 'none'; }

  // 4️⃣ Event listeners
  document.getElementById('openCartBtn').addEventListener('click', openCart);
  document.getElementById('closeCartBtn').addEventListener('click', closeCart);
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);
  document.getElementById('checkoutBtn').addEventListener('click', checkout);

  // Delegación de botones dentro del carrito
  document.getElementById('cart-body').addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const id = parseInt(e.target.dataset.id);
    if (!action || isNaN(id)) return;

    if (action === 'remove') removeItem(id);
    if (action === 'increase') increaseQty(id);
    if (action === 'decrease') decreaseQty(id);
  });

  // 5️⃣ Inicializar carrito de ejemplo si no existe
  if (!sessionStorage.getItem('cart')) {
    const sampleCart = [];
    setCart(sampleCart);
  }

    window.addItem = function addItemToCart(item) {
        console.log(item.id);
        const cart = getCart();
        const exists = cart.find(p => p.id == item.id);
        if (exists) {
            if(exists.quantity == 0) exists.quantity = 0;
            console.log("Vamos por buen lugar");
            exists.quantity += item.quantity;
        } else {
            cart.push(item);
        }
        setCart(cart);
        console.log(cartHasher(cart));
        renderCart();
    }

    window.cartHasher = function hashDelCarrito(obj) {
        const str = JSON.stringify(obj) + _satellite.getVar("randomNumberForHAshing");
        let hash = 2166136261;
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        var hashres = (hash >>> 0).toString(36);
        console.log(hashres);
        return hashres;
    }

  // Render inicial
  renderCart();
})();


