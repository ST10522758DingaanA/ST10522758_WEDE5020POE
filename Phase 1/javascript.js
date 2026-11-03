document.addEventListener('DOMContentLoaded', () => {
    const cartCountSpan = document.getElementById('cart-count');
    const cartContainer = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const cartSummary = document.getElementById('cart-summary');
    const cartTotalSpan = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    let cart = JSON.parse(localStorage.getItem('ecoHarvestCart')) || [];

    updateCartCount();

    if (cartContainer) {
        renderCartPage();
    }

    const buttons = document.querySelectorAll('.card button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const productName = card.querySelector('h3').innerText;

            const priceElement = card.querySelector('p strong') || card.querySelectorAll('p')[1];
            const productPriceText = priceElement ? priceElement.innerText : '';

            const priceNumber = extractPrice(productPriceText);

            cart.push({ name: productName, priceText: productPriceText, price: priceNumber });

            localStorage.setItem('ecoHarvestCart', JSON.stringify(cart));
            updateCartCount();

            button.innerText = "Added! ✓";
            button.style.backgroundColor = "#1b5e20";

            setTimeout(() => {
                button.innerText = 'Add to Cart';
                button.style.backgroundColor = "#2e7d32";
            }, 1500);
        });
    });

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            localStorage.removeItem('ecoHarvestCart');
            if (cartContainer) renderCartPage();
            updateCartCount();
        });
    }

    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('ecoHarvestCart', JSON.stringify(cart));
        updateCartCount();
        if (cartContainer) {
            renderCartPage();
        }
    };

    function renderCartPage() {
        if (cart.length === 0) {
            if (emptyMsg) emptyMsg.style.display = 'block';
            if (cartSummary) cartSummary.style.display = 'none';
            if (cartContainer) cartContainer.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty at the moment.</p>';
        } else {
            if (emptyMsg) emptyMsg.style.display = 'none';
            if (cartSummary) {
                cartSummary.style.display = 'block';
                
                
                if (!document.getElementById('checkout-btn')) {
                    const checkoutBtnHTML = `
                        <a href="checkout.html" id="checkout-btn" style="display: block; width: 100%; margin-top: 15px; background: #2e7d32; color: white; text-align: center; padding: 12px; text-decoration: none; border-radius: 4px; font-weight: bold; box-sizing: border-box;">
                            Proceed to Checkout
                        </a>
                    `;
                    cartSummary.insertAdjacentHTML('beforeend', checkoutBtnHTML);
                }
            }

            let html = '<ul style="list-style: none; padding: 0;">';
            let total = 0;

            cart.forEach((item, index) => {
                total += item.price || 0;
                html += `
                    <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee;">
                        <div>
                            <strong>${item.name}</strong><br>
                            <small style="color: #666;">${item.priceText}</small>
                        </div>
                        <button onclick="removeItem(${index})" style="background: #d32f2f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Remove</button>
                    </li>
                `;
            });

            html += '</ul>';
            if (cartContainer) cartContainer.innerHTML = html;
            
            if (cartTotalSpan) {
                cartTotalSpan.innerText = `R${total.toFixed(2)}`;
            }
        }
    }

    function updateCartCount() {
        if (cartCountSpan) {
            cartCountSpan.innerText = cart.length;
        }
    }

    function extractPrice(text) {
        const matches = text.replace(',', '.').match(/[\d.]+/);
        return matches ? parseFloat(matches[0]) : 0;
    }

    
const searchInput = document.getElementById('product-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            if (title.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function showToast(productName) {
    const toast = document.createElement('div');
    toast.innerText = `🛒 Added "${productName}" to your cart!`;
    toast.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; 
        background: #1b5e20; color: white; padding: 12px 20px; 
        border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
        z-index: 1000; transition: opacity 0.3s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}


document.addEventListener('DOMContentLoaded', () => {
   
});



function openLightbox(imgSrc, captionText) {
    const modal = document.getElementById('gallery-lightbox');
    const modalImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    caption.innerText = captionText;
}

function closeLightbox() {
    document.getElementById('gallery-lightbox').style.display = 'none';
}
});