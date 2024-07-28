document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCountElement = document.querySelector('.cart-count');
    const cartItemsElement = document.querySelector('.cart-items');
    const totalCostElement = document.querySelector('.total-cost');
    const discountElement = document.querySelector('.discount');
    const viewCartButton = document.querySelector('.view-cart-button');
    const backButton = document.querySelector('.back-button');
    const cartSection = document.querySelector('.cart-section');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.productId;
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('₹', '').replace(',', ''));

            const product = cart.find(p => p.id === productId);

            if (product) {
                product.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    viewCartButton.addEventListener('click', () => {
        cartSection.style.display = 'block';
    });

    backButton.addEventListener('click', () => {
        cartSection.style.display = 'none';
    });

    function updateCart() {
        cartCountElement.textContent = cart.reduce((total, product) => total + product.quantity, 0);
        cartItemsElement.innerHTML = '';

        let totalCost = 0;

        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const productDetails = document.createElement('span');
            productDetails.textContent = `${product.name} - ₹${(product.price * product.quantity).toFixed(2)} (x${product.quantity})`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('btn');
            removeButton.addEventListener('click', () => {
                removeProductFromCart(product.id);
            });

            cartItem.appendChild(productDetails);
            cartItem.appendChild(removeButton);
            cartItemsElement.appendChild(cartItem);

            totalCost += product.price * product.quantity;
        });

        totalCostElement.textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
        discountElement.textContent = `Discount: ₹${(totalCost * 0.1).toFixed(2)}`; // Assuming a 10% discount
    }

    function removeProductFromCart(productId) {
        const productIndex = cart.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            const product = cart[productIndex];
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                cart.splice(productIndex, 1);
            }
            updateCart();
        }
    }
});
