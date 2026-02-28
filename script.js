document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll reveal animation using Intersection Observer
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after it becomes visible
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Form submission mock
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> بھیجا جا رہا ہے...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> پیغام موصول ہو گیا';
                btn.style.background = '#10b981'; // Success color
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // Field Loading Function (Editing locked per user request)
    const loadSavedField = (textElementId, storageKey) => {
        const textElement = document.getElementById(textElementId);
        if (!textElement) return;

        // Load saved value on startup
        const savedValue = localStorage.getItem(storageKey);
        if (savedValue) {
            textElement.textContent = savedValue;
        }
    };

    // Initialize all contact fields
    loadSavedField('companyProprietor', 'companyProprietor');
    loadSavedField('companyEmail', 'companyEmail');
    loadSavedField('companyPhone', 'companyPhone');
    loadSavedField('companyAddress', 'companyAddress');

});
