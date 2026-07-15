document.addEventListener('DOMContentLoaded', () => {
    // --- Component Injection ---
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) {
        const isScrolled = navPlaceholder.getAttribute('data-scrolled') === 'true';
        navPlaceholder.outerHTML = `<nav id="navbar" ${isScrolled ? 'class="scrolled" data-scrolled="true"' : ''}>${NAVBAR_HTML}</nav>`;
    }
    
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = `<footer>${FOOTER_HTML}</footer>`;
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const isAlwaysScrolled = navbar && navbar.getAttribute('data-scrolled') === 'true';
    
    window.addEventListener('scroll', () => {
        if (isAlwaysScrolled || window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with fade-in classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Trigger animations for hero section immediately on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // --- Active nav link highlighting ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        try {
            const linkUrl = new URL(link.getAttribute('href'), window.location.origin);
            const linkFile = linkUrl.pathname.split('/').pop() || 'index.html';
            if (linkFile === currentFile) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } catch (e) {
            // ignore malformed URLs
        }
    });

    // --- Side-drawer (hamburger) behavior ---
    const hamburger = document.getElementById('hamburger');
    const sideDrawer = document.getElementById('side-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer');

    function openDrawer() {
        if (!sideDrawer) return;
        sideDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        sideDrawer.setAttribute('aria-hidden', 'false');
        hamburger && hamburger.setAttribute('aria-expanded', 'true');
        // focus first link
        const firstLink = sideDrawer.querySelector('.drawer-links a');
        firstLink && firstLink.focus();
    }

    function closeDrawer() {
        if (!sideDrawer) return;
        sideDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        sideDrawer.setAttribute('aria-hidden', 'true');
        hamburger && hamburger.setAttribute('aria-expanded', 'false');
        hamburger && hamburger.focus();
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            expanded ? closeDrawer() : openDrawer();
        });
    }

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    // Mirror active state into drawer links
    const drawerLinks = document.querySelectorAll('.drawer-links a');
    drawerLinks.forEach(link => {
        try {
            const linkUrl = new URL(link.getAttribute('href'), window.location.origin);
            const linkFile = linkUrl.pathname.split('/').pop() || 'index.html';
            if (linkFile === currentFile) link.classList.add('active');
        } catch (e) {}
    });
});
