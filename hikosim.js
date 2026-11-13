(() => {
    const background = document.getElementById('hikosim-background');
    const toggle = document.getElementById('hikosim-toggle-background');
    const dialog = document.getElementById('hikosim-pv-dialog');
    const fullVideo = document.getElementById('hikosim-full-pv');
    const openPV = document.getElementById('hikosim-open-pv');
    const closePV = document.getElementById('hikosim-close-pv');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    let wantsPlayback = !reducedMotion.matches && !connection?.saveData;
    let inView = false;
    let requestId = 0;

    function labelToggle() {
        toggle.textContent = background.paused ? '背景動画を再生' : '背景動画を一時停止';
    }

    function loadVideo(video) {
        if (!video.getAttribute('src')) {
            const useMobile = window.matchMedia('(max-width: 700px)').matches;
            video.src = useMobile && video.dataset.mobileSrc ? video.dataset.mobileSrc : video.dataset.src;
        }
    }

    function updatePlayback() {
        const currentRequest = ++requestId;
        if (!wantsPlayback || !inView || document.hidden || dialog.open) {
            background.pause();
            labelToggle();
            return;
        }
        loadVideo(background);
        background.muted = true;
        background.play().catch(() => {
            if (currentRequest !== requestId) return;
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
        observer.observe(document.querySelector('.hikosim-hero'));
    } else {
        inView = true;
        updatePlayback();
    }

    openPV.addEventListener('click', () => {
        dialog.showModal();
        updatePlayback();
        loadVideo(fullVideo);
        fullVideo.play().catch(() => { /* Native controls remain available. */ });
    });
    closePV.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
        fullVideo.pause();
        updatePlayback();
        openPV.focus();
    });
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
})();
