(() => {
    const mediaPanels = document.querySelectorAll('.festival-video-demo');
    mediaPanels.forEach(panel => {
        const video = panel.querySelector('video');
        panel.addEventListener('toggle', () => {
            if (panel.open) {
                if (!video.getAttribute('src')) {
                    video.src = video.dataset.src;
                    video.load();
                }
            } else {
                video.pause();
            }
        });
        video.addEventListener('error', () => {
            panel.querySelector('.festival-media-error').hidden = false;
        });
        video.addEventListener('play', () => {
            mediaPanels.forEach(other => {
                if (other !== panel) other.querySelector('video').pause();
            });
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) mediaPanels.forEach(panel => panel.querySelector('video').pause());
    });

    const background = document.getElementById('festival-hikosim-background');
    const toggle = document.getElementById('festival-hikosim-toggle');
    if (!background || !toggle) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    let wantsPlayback = !reducedMotion.matches && !connection?.saveData;
    let inView = false;
    let requestId = 0;

    function labelToggle() {
        toggle.textContent = background.paused ? '背景動画を再生' : '背景動画を一時停止';
    }
    function updatePlayback() {
        const request = ++requestId;
        if (!wantsPlayback || !inView || document.hidden) {
            background.pause();
            labelToggle();
            return;
        }
        if (!background.getAttribute('src')) {
            background.src = window.matchMedia('(max-width: 700px)').matches
                ? background.dataset.mobileSrc : background.dataset.src;
        }
        background.muted = true;
        background.play().catch(() => {
            if (request !== requestId) return;
            wantsPlayback = false;
            labelToggle();
        });
    }
    toggle.addEventListener('click', () => {
        wantsPlayback = background.paused;
        updatePlayback();
    });
    background.addEventListener('play', labelToggle);
    background.addEventListener('pause', labelToggle);
    background.addEventListener('error', () => {
        wantsPlayback = false;
        labelToggle();
    });
    document.addEventListener('visibilitychange', updatePlayback);
    reducedMotion.addEventListener('change', () => {
        if (reducedMotion.matches) wantsPlayback = false;
        updatePlayback();
    });
    connection?.addEventListener('change', () => {
        if (connection.saveData) wantsPlayback = false;
        updatePlayback();
    });
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            inView = entries[0].isIntersecting;
            updatePlayback();
        }, { threshold: 0.05 });
        observer.observe(document.getElementById('hikosim'));
    } else {
        inView = true;
        updatePlayback();
    }
})();
