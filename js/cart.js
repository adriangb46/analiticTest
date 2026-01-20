let cart = [];

function addToCart(producto){
    cart.push(producto);
}

function getCart(){
    return cart;
}

function showCart(){
    cartContainer.style.display = "block";
}

function hideCart(){
    cartContainer.style.display = "none";
}

function renderCart(){
    var cartContainer = document.getElementById("cartModal");
    var cartGrid = cartContainer.querySelector(".cartContent");
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
    document.getElementById("cartButton").addEventListener("click",showCart());
    renderCart();
});
