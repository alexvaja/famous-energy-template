document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.querySelector('#sidebar');
    
    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.card .card-title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price') [index].textContent.slice(1),
                ),
                quantity: 1,
            };

            const exisitingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name,
            );

            if (exisitingItem) {
                exisitingItem.quantity++;
            }
            else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });

        function updateCartUI() {
            updateCartItemCount(cartItems.length);
            updateCartItemList();
            updateCartTotal();
        }

        function updateCartItemCount(count) {
            cartItemCount.textContent = count;
        }

        function updateCartItemList() {
            cartItemsList.innerHTML = '';
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item', 'individual-cart-item');
                cartItem.innerHTML = `
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} Lei
                <button class="remove-item" data-index="${index}"><i class="fa-solid fa-times"></i></button>
                </span>
                `;
                
                cartItemsList.append(cartItem);
            });
            
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index = event.target.dataset.index;
                    removeItemFromCart(index);
                });
            });
        }

        function removeItemFromCart(index) {
            const removeItem = cartItems.splice(index, 1)[0];
            totalAmount -= removeItem.price * removeItem.quantity;
            updateCartUI(); //
        }

        function updateCartTotal() {
            cartTotal.textContent = `${totalAmount.toFixed(2)} Lei`;
        }

        cartIcon.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        const closeButton = document.querySelector('.sidebar-close');
        closeButton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    });
});