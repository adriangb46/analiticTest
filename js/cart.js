let cart;

function addToCart(producto){
    cart.push(producto);
    sessionStorage.setItem("cart",cart)
    renderCart();

}

function getCart(){
    return cart;
}

function showCart(){
    var cartContainer = document.getElementById("cartModal");
    cartContainer.style.display = "block";
}

function hideCart(){
    var cartContainer = document.getElementById("cartModal");
    cartContainer.style.display = "none";
}

function renderCart(){
    var cartGrid = document.getElementById("cartGrid");
    if(cart.length === 0){
        cartGrid.innerHTML = `<p>no hay productos en el carrito</p>`
    }else{
        cartGrid.innerHTML = cart.map(
        (product) =>`
        <div class = "product-card">
            <div>
                <p class = "product-name">${product.name}</p>
                <p class = "product-price">${product.price}</p>
                <p class = "prodcut-category">${product.category}</p>
            </div>
        </div>
        <br>
        `
        ).join("");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    cart = sessionStorage.getItem("cart");
    if(cart === undefined) cart = [];
    document.getElementById("cartButton").addEventListener("click",showCart);
    document.getElementById("cartModalExit").addEventListener("click",hideCart);
    renderCart();
});
