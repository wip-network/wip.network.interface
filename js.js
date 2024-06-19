// Function to detect mobile devices
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Handle scrolling with precise snapping
document.addEventListener('wheel', function(event) {
    if (event.deltaY > 0) {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    } else {
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }

    setTimeout(() => {
        const scrollPosition = Math.round(window.scrollY / window.innerHeight) * window.innerHeight;
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }, 500);
});

// Handle touch events for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture() {
    if (touchStartY - touchEndY > 50) {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    } else if (touchEndY - touchStartY > 50) {
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }

    setTimeout(() => {
        const scrollPosition = Math.round(window.scrollY / window.innerHeight) * window.innerHeight;
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }, 500);
}

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
    videos.forEach((video) => {
        if (isInViewport(video)) {
            video.play();
        } else {
            video.pause();
        }
    });
}

window.addEventListener('scroll', handleVideoPlayback);
handleVideoPlayback();

// Function to randomize the video timestamp
function randomizeVideoStartTime(videoId) {
    var video = document.getElementById(videoId);
    if (video) {
        video.muted = true;
        video.addEventListener('loadedmetadata', function() {
            var minTime = 300;
            var maxTime = video.duration - 300;
            var randomTime = Math.random() * (maxTime - minTime) + minTime;
            video.currentTime = randomTime;
        });
    } else {
        console.error('Video element not found');
    }
}

// Function to play the video from the beginning when the button is clicked
function playVideoFromStart(videoId) {
    var video = document.getElementById(videoId);
    if (video) {
        video.currentTime = 0;
        video.play().then(() => {
            requestFullScreen(video);
        }).catch((error) => {
            console.error('Error attempting to play video:', error);
        });
    } else {
        console.error('Video element not found');
    }
}

// Function to check if an element is in view
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle video playback based on scroll
function handleVideoPlayback() {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        var video = section.querySelector('video');
        if (isInViewport(section)) {
            video.play();
        } else {
            video.pause();
        }
    });
}

window.addEventListener('scroll', handleVideoPlayback);
handleVideoPlayback();

// Randomize the order of video sections on page load
document.addEventListener('DOMContentLoaded', function() {
    var container = document.querySelector('.container');
    var sections = Array.from(container.children);
    while (sections.length) {
        container.appendChild(sections.splice(Math.floor(Math.random() * sections.length), 1)[0]);
    }

    var videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
        randomizeVideoStartTime(video.id);
    });
});

document.querySelectorAll('.video-btn').forEach(button => {
    button.addEventListener('click', function() {
        var videoId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        playVideoFromStart(videoId);
    });
});

document.getElementById('scroll-button').addEventListener('click', function() {
    document.getElementById('community').scrollIntoView({ behavior: 'smooth' });
});

var accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var content = this.nextElementSibling;
        content.classList.toggle('active');
    });
});

// Close popups on clicking outside
window.addEventListener('click', function(event) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        if (event.target !== popup && !popup.contains(event.target)) {
            popup.style.display = 'none';
        }
    });
});

// Function to show the info popup
function showInfoPopup() {
    var popup = document.getElementById('info-popup');
    if (popup) {
        popup.style.display = 'flex'; // Display the popup
    } else {
        console.error('Info popup element not found');
    }
}

// Function to hide the info popup
function hideInfoPopup() {
    var popup = document.getElementById('info-popup');
    if (popup) {
        popup.style.display = 'none'; // Hide the popup
    } else {
        console.error('Info popup element not found');
    }
}

function showJoinPopup() {
    var popup = document.getElementById('join-popup');
    if (popup) {
        popup.style.display = 'flex'; // Display the popup
    } else {
        console.error('join popup element not found');
    }
}

// Function to hide the info popup
function hideJoinPopup() {
    var popup = document.getElementById('join-popup');
    if (popup) {
        popup.style.display = 'none'; // Hide the popup
    } else {
        console.error('Info popup element not found');
    }
}
