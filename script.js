document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // 2. Shopping Cart Logic
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartUI() {
        const counts = document.querySelectorAll('.cart-count, .count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        counts.forEach(count => {
            count.textContent = totalItems;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // 3. Add to Cart Functionality
    window.addToCart = function(productId, title, price, image) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, title, price, image, quantity: 1 });
        }
        updateCartUI();
        
        // Visual Feedback
        const btn = event.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> تمت الإضافة';
        btn.style.backgroundColor = '#D4AF37';
        btn.style.color = '#1B3022';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 2000);
    };

    // 4. Content Protection
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        // F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83))) {
            e.preventDefault();
            return false;
        }
    });

    // Protect Images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Initialize UI
    updateCartUI();
});
