// Initialize cart items array
let cartItems = [];

// Function to update cart total
function updateCartTotal() {
    const cartTotal = document.querySelector('.cart-total');
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to update cart icon counter
function updateCartIconCounter() {
    const cartIconCounter = document.querySelector('.cat-icon-counter');
    cartIconCounter.textContent = cartItems.length;
}

// Function to add item to cart
function addItemToCart(item) {
    cartItems.push(item);
    updateCartTotal();
    updateCartIconCounter();
    renderCartItems();
}

// Function to remove item from cart
function removeItemFromCart(item) {
    const index = cartItems.findIndex((cartItem) => {
        return cartItem.name === item.name && cartItem.price === item.price;
    });
    if (index !== -1) {
        cartItems.splice(index, 1);
        updateCartTotal();
        updateCartIconCounter();
        renderCartItems();
    }
}

// Function to clear cart
function clearCart() {
    cartItems = [];
    updateCartTotal();
    updateCartIconCounter();
    renderCartItems();
}

// Function to render cart items
function renderCartItems() {
    const cartItemsElement = document.querySelector('.cart-items');
    cartItemsElement.innerHTML = '';
    cartItems.forEach((item) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button class="remove-from-cart-button" data-item='${JSON.stringify(item)}'>Remove from Cart</button>
        `;
        cartItemsElement.appendChild(cartItemElement);
    });
}
// Add event listener to all buttons
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.querySelector('.cart-items');
    cartItemsElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart-button')) {
            const item = JSON.parse(e.target.getAttribute('data-item'));
            removeItemFromCart(item);
        }
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            // Add to cart functionality
            if (button.classList.contains('add-to-cart-button')) {
                const cakeName = button.parentNode.querySelector('h3').textContent;
                const cakePrice = button.parentNode.querySelector('p').textContent.replace('Price: $', '');
                const price = parseFloat(cakePrice);
                if (!isNaN(price)) {
                    const item = { name: cakeName, price: price.toString() };
                    addItemToCart(item);
                } else {
                    console.error('Invalid price');
                }
            }
            // Clear cart functionality
            else if (button.classList.contains('clear-cart-button')) {
                clearCart();
            }
            // Toggle dropdown menu
            else if (button.classList.contains('cart-icon')) {
                const dropdownMenu = button.parentNode.querySelector('.dropdown-menu');
                dropdownMenu.classList.toggle('visible');
            }
        });
    });
});


