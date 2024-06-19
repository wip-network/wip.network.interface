// Function to detect mobile devices
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Existing code
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
});

// New code to handle touch events for mobile
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
        // Swipe up
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    } else if (touchEndY - touchStartY > 50) {
        // Swipe down
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    }
}

// Mute videos by default and handle mobile controls
document.querySelectorAll('video').forEach(video => {
    video.muted = true;

    // Disable controls on mobile devices
    if (isMobile()) {
        video.controls = false;
    }

    // Custom play and pause handling for mobile
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

// Add event listener for scroll event
window.addEventListener('scroll', handleVideoPlayback);

// Initial call to handle video playback on page load
handleVideoPlayback();

// Function to randomize the video timestamp
function randomizeVideoStartTime(videoId) {
    var video = document.getElementById(videoId);
    if (video) {
        video.muted = true; // Mute the video
        video.addEventListener('loadedmetadata', function() {
            var minTime = 300; // 30 seconds after the beginning
            var maxTime = video.duration - 300; // 30 seconds before the end
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
        video.currentTime = 0; // Start video from the beginning
        video.play().then(() => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) { // Firefox
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) { // Chrome, Safari & Opera
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { // IE/Edge
                video.msRequestFullscreen();
            }
        }).catch((error) => {
            console.error('Error attempting to play video:', error);
        });
    } else {
        console.error('Video element not found');
    }
}

function showPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'flex';
    } else {
        console.error('Popup element not found');
    }
}

function hidePopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    } else {
        console.error('Popup element not found');
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

// Function to handle video playback based on scroll
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

// Add event listener for scroll event
window.addEventListener('scroll', handleVideoPlayback);

// Initial call to handle video playback on page load
handleVideoPlayback();

// Randomize the order of video sections on page load
document.addEventListener('DOMContentLoaded', function() {
    var container = document.querySelector('.container');
    var sections = Array.from(container.children);
    while (sections.length) {
        container.appendChild(sections.splice(Math.floor(Math.random() * sections.length), 1)[0]);
    }

    // Randomize the start time of videos on page load
    var videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
        randomizeVideoStartTime(video.id);
    });
});

// Event listener for the "Відео" buttons
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

// Only play videos when in view
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

// Mute videos by default
document.querySelectorAll('video').forEach(video => {
    video.muted = true;
});

// Add video controls
document.querySelectorAll('video').forEach(video => {
    video.setAttribute('controls', 'controls');
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


