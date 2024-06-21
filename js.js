document.addEventListener('DOMContentLoaded', () => {
    // Function to shuffle sections
    function shuffleSections() {
        const sections = Array.from(document.querySelectorAll('section'));
        if (sections.length) {
            const container = sections[0].parentNode;
            for (let i = sections.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                container.insertBefore(sections[j], sections[i]);
            }
        } else {
            console.error('Sections not found');
        }
    }

    // Call the shuffle function
    shuffleSections();

    // Mute videos by default and handle mobile controls
    document.querySelectorAll('video').forEach(video => {
        video.muted = true;
        video.autoplay = true; // Ensure autoplay is enabled

        video.addEventListener('play', () => {
            video.setAttribute('controls', '');
        });

        video.addEventListener('pause', () => {
            video.removeAttribute('controls');
        });

        video.addEventListener('ended', () => {
            video.removeAttribute('controls');
        });
    });

    function requestFullScreen(video) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }

    // Function to play the video from the beginning when the button is clicked
    function playVideoFromStart(videoId) {
        const video = document.getElementById(videoId);
        if (video) {
            video.currentTime = 0;
            video.play().then(() => {
                requestFullScreen(video);
            }).catch(error => {
                console.error('Error attempting to play video:', error);
            });
        } else {
            console.error('Video element not found:', videoId);
        }
    }

    document.querySelectorAll('.video-btn').forEach(button => {
        button.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video-id');
            playVideoFromStart(videoId);
        });
    });

    // Ensure "Допис" button works correctly
    document.querySelectorAll('.popup-btn').forEach(button => {
        button.addEventListener('click', function () {
            const popupId = this.getAttribute('data-popup-id');
            showPopup(popupId);
        });
    });

    function showPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'flex';
        } else {
            console.error('Popup element not found:', popupId);
        }
    }

    function hidePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'none';
        } else {
            console.error('Popup element not found:', popupId);
        }
    }

    function showInfoPopup() {
        showPopup('info-popup');
    }

    function hideInfoPopup() {
        hidePopup('info-popup');
    }

    function showJoinPopup() {
        showPopup('join-popup');
    }

    function hideJoinPopup() {
        hidePopup('join-popup');
    }

    // Snap to the next section on scroll
    function snapToSection() {
        const sections = document.querySelectorAll('section');
        let currentScroll = window.scrollY;
        let closestSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = Math.abs(sectionTop - currentScroll);

            if (distance < minDistance) {
                minDistance = distance;
                closestSection = section;
            }
        });

        if (closestSection) {
            closestSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    window.addEventListener('scroll', () => {
        clearTimeout(window.snapTimeout);
        window.snapTimeout = setTimeout(snapToSection, 100);
    });

    // Attach functions to global scope
    window.showInfoPopup = showInfoPopup;
    window.hideInfoPopup = hideInfoPopup;
    window.showJoinPopup = showJoinPopup;
    window.hideJoinPopup = hideJoinPopup;
    window.showPopup = showPopup;
    window.hidePopup = hidePopup;
    window.playVideoFromStart = playVideoFromStart;
});
