document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const cartCountElement = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalCostElement = document.querySelector('.total-cost');

    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Clear current items in the cart
        let totalCost = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name}</p>
                <p>${item.price}</p>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalCost += item.price;
        });

        totalCostElement.textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
        cartCountElement.textContent = cart.length;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('₹', '').replace(',', ''));

            cart.push({ id: productId, name: productName, price: productPrice });
            updateCart();
            document.querySelector('.cart-section').style.display = 'block';
        });
    });

    document.querySelector('.cart-button').addEventListener('click', () => {
        document.querySelector('.cart-section').style.display = 'block';
        document.querySelector('.checkout-section').style.display = 'none';
    });

    document.querySelector('.back-button').addEventListener('click', () => {
        document.querySelector('.cart-section').style.display = 'none';
    });

    document.querySelector('.checkout-button').addEventListener('click', () => {
        document.querySelector('.cart-section').style.display = 'none';
        document.querySelector('.checkout-section').style.display = 'block';
    });

    document.querySelector('.back-to-cart-button').addEventListener('click', () => {
        document.querySelector('.checkout-section').style.display = 'none';
        document.querySelector('.cart-section').style.display = 'block';
    });

    document.querySelector('#help-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Help form submitted!');
    });

    document.querySelector('#login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login form submitted!');
    });
});
