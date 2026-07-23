const footerPlaceholder = document.getElementById('footer-placeholder');
if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FOOTER_HTML;
    // Add the class 'footer' if not already present on the placeholder
    footerPlaceholder.classList.add('footer');
}

// Inject side drawer to the end of the body
document.body.insertAdjacentHTML('beforeend', SIDE_DRAWER_HTML);
