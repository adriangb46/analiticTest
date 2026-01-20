let cart = [];

function addToCart(producto){
    cart.push(producto);
}

function getCart(){
    return cart;
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

    cartContainer.style.display = "block";

}
