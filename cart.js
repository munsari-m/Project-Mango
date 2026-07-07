// Get cart from storage or create empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(button) {
    // Get the product box that contains this button
    const productBox = button.closest('.product-box');
    
    // Get product information
    const productName = productBox.querySelector('h3').textContent;
    const productPrice = productBox.querySelector('.price').textContent;
    
    // Create item object
    const item = {
        name: productName,
        price: productPrice
    };
    
    // Add to cart array
    cart.push(item);
    
    // Save to localStorage so it persists across pages
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Give user feedback
    button.textContent = "Added!";
    button.style.backgroundColor = "#27ae60";
    
    // Reset button after 1 second
    setTimeout(function() {
        button.textContent = "Add to Cart";
        button.style.backgroundColor = "#3498db";
    }, 1000);
}

// Function to display cart items (only runs on cart.html page)
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    
    // Check if we're on the cart page
    if (!cartContainer) return;
    
    // If cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; font-size: 1.5em; padding: 50px;">Your cart is empty</p>';
        return;
    }
    
    // Build the cart display
    let cartHTML = '<div class="cart-items">';
    
    cart.forEach(function(item, index) {
        cartHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });
    
    cartHTML += '</div>';
    
    cartContainer.innerHTML = cartHTML;
}

// Function to remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your order! (This is a frontend project - no actual payment processed)");
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Run displayCart when page loads
displayCart();