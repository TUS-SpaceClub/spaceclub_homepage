const NAVBAR_HTML = `
        <div class="nav-container">
            <a href="index.html" class="logo" style="text-decoration: none;">TUS Space Club</a>
            <ul class="nav-links">
                <li><a href="index.html#about">About</a></li>
                <li><a href="contest.html">Contest</a></li>
                <li><a href="index.html#technology">Technology</a></li>
                <li><a href="teams.html">Teams</a></li>
                <li><a href="drone-show.html">Drone Show</a></li>
                <li><a href="archive.html">Archive</a></li>
                <li><a href="news.html">News</a></li>
                <li><a href="index.html#sponsorship">Sponsor Plans</a></li>
                <li><a href="index.html#contact" class="btn-primary-small">Contact Us</a></li>
            </ul>
            <button id="hamburger" class="hamburger" aria-label="Open menu" aria-controls="side-drawer" aria-expanded="false">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </div>
`;
const FOOTER_HTML = `
        <div class="footer-content">
            <div class="footer-logo">TUS Space Club</div>
            <p>東京理科大学 創域理工学部 宇宙クラブ</p>
            <p class="address">〒278-8510 千葉県野田市山崎2641</p>
            <div class="social-links">
                <a href="https://x.com/spaceclub_tus?s=11" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
                <a href="https://www.instagram.com/space_club.tus?igsh=MXgxNXUwZzljNXNwdw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://youtube.com/channel/UC8pHAkPpBAD1MzEcwkvisGw?si=9_8psHiA8lf_F2_w" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
            <div class="footer-nav">
                <a href="index.html">Home</a> &nbsp;|&nbsp; 
                <a href="contest.html">Contest</a> &nbsp;|&nbsp;
                <a href="teams.html">Teams</a> &nbsp;|&nbsp;
                <a href="news.html">News</a>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2026 TUS Space Club. All Rights Reserved.</p>
        </div>
`;

const SIDE_DRAWER_HTML = `
    <div id="side-drawer" class="side-drawer" aria-hidden="true">
        <button id="close-drawer" class="close-drawer" aria-label="Close menu">×</button>
        <ul class="drawer-links">
            <li><a href="index.html#about">About</a></li>
            <li><a href="contest.html">Contest</a></li>
            <li><a href="index.html#technology">Technology</a></li>
            <li><a href="teams.html">Teams</a></li>
            <li><a href="drone-show.html">Drone Show</a></li>
            <li><a href="archive.html">Archive</a></li>
            <li><a href="news.html">News</a></li>
            <li><a href="index.html#sponsorship">Sponsor Plans</a></li>
            <li><a href="index.html#contact">Contact Us</a></li>
        </ul>
    </div>
    <div id="drawer-overlay" class="drawer-overlay" tabindex="-1" aria-hidden="true"></div>
`;

// Inject components immediately (since script is loaded at the end of body)
const navPlaceholder = document.getElementById('navbar-placeholder');
if (navPlaceholder) navPlaceholder.innerHTML = NAVBAR_HTML;

const footerPlaceholder = document.getElementById('footer-placeholder');
if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FOOTER_HTML;
    // Add the class 'footer' if not already present on the placeholder
    footerPlaceholder.classList.add('footer');
}

// Inject side drawer to the end of the body
document.body.insertAdjacentHTML('beforeend', SIDE_DRAWER_HTML);
