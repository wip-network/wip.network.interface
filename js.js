// Detect mobile devices
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Show and hide popups
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

// Smooth scrolling
function smoothScroll(event) {
    event.preventDefault();
    window.scrollBy({
        top: event.deltaY,
        left: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('wheel', smoothScroll);

// Touch handling for smooth scrolling
let touchStartY = 0;

function handleTouchStart(event) {
    touchStartY = event.changedTouches[0].screenY;
}

function handleTouchMove(event) {
    const touchEndY = event.changedTouches[0].screenY;
    const delta = touchStartY - touchEndY;
    window.scrollBy({
        top: delta,
        left: 0,
        behavior: 'smooth'
    });
    touchStartY = touchEndY;
}

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

// Mute videos by default and handle mobile controls
document.querySelectorAll('video').forEach(video => {
    video.muted = true;

    video.addEventListener('play', () => {
        video.setAttribute('controls', '');
        requestFullScreen(video);
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

// Ensure video continues to play in background after closing popup
function handleVideoPlayback() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (isInViewport(video)) {
            video.play();
        } else {
            video.pause();
        }
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', handleVideoPlayback);
handleVideoPlayback();

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

// Randomize the order of video sections on page load
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const sections = Array.from(container.children);
    while (sections.length) {
        container.appendChild(sections.splice(Math.floor(Math.random() * sections.length), 1)[0]);
    }

    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        randomizeVideoStartTime(video.id);
    });
});

function randomizeVideoStartTime(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        video.muted = true;
        video.addEventListener('loadedmetadata', () => {
            const minTime = 300;
            const maxTime = video.duration - 300;
            const randomTime = Math.random() * (maxTime - minTime) + minTime;
            video.currentTime = randomTime;
        });
    } else {
        console.error('Video element not found:', videoId);
    }
}

document.querySelectorAll('.video-btn').forEach(button => {
    button.addEventListener('click', function () {
        const videoId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        playVideoFromStart(videoId);
    });
});

document.getElementById('scroll-button').addEventListener('click', function () {
    document.getElementById('community').scrollIntoView({ behavior: 'smooth' });
});

const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
    button.addEventListener('click', function () {
        const content = this.nextElementSibling;
        content.classList.toggle('active');
    });
});

// Close popups on clicking outside
window.addEventListener('click', function (event) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        if (event.target !== popup && !popup.contains(event.target)) {
            popup.style.display = 'none';
        }
    });
});

// Info and Join popup handling
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
