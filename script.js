// Get all audio and play buttons
const audioElements = document.querySelectorAll('.audio');
const playButtons = document.querySelectorAll('.play-sound');
const mainPlayPauseButton = document.querySelector('.player button:nth-child(3)');
const nextButton = document.querySelector('.nextButton');
const previousButton = document.querySelector('.player button:nth-child(2)');
const progressBar = document.getElementById('progress-bar');
const discoImg = document.querySelector('.myimg');
const everyHover = document.getElementById('every-style')

// Array of song images to match the tracks
const songImages = [
    "img-sound/every break you take music.jpg",
    "img-sound/your love.jpg", 
    "img-sound/Take On me.avif",
    "img-sound/maniac.webp",
    "img-sound/bon jovi - livin on a prayer.jpg",
    "img-sound/please dont go.jpg",
    "img-sound/time after a time.jpg"
];

let currentAudioIndex = 0;
let currentAudio = null;

// Function to play a specific audio track
function playTrack(index) {
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
    }
    
    // Set the current audio to the selected song
    currentAudio = audioElements[index];
    currentAudioIndex = index;
    
    // Reset the audio to the beginning
    currentAudio.currentTime = 0;
    
    // Play the selected audio
    currentAudio.play();
    
    // Update disco image
    discoImg.classList.add('disco-gira');
    discoImg.classList.add('img-active');
    discoImg.src = songImages[index];
    
    // Update play/pause main button
    mainPlayPauseButton.querySelector('i').classList.remove('fa-play');
    mainPlayPauseButton.querySelector('i').classList.add('fa-pause');
}

// Individual song play functions
function playEvery() {
    playTrack(0);
    everyHover.classList.add('sound-active')
    
}

function playYour() {
    playTrack(1);
}

function playAha() {
    playTrack(2);
}

function playManiac() {
    playTrack(3);
}

function playBonjovi() {
    playTrack(4);
}

function playPleasedontogo() {
    playTrack(5);
}

function playCindy() {
    playTrack(6);
}

// Main play/pause functionality
function playPause() {
    const playIcon = mainPlayPauseButton.querySelector('i');
    
    if (!currentAudio) {
        // If no audio is selected, play the first song
        playTrack(0);
        return;
    }
    
    if (currentAudio.paused) {
        currentAudio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        
        // Restart disco animation
        discoImg.classList.add('disco-gira');
        discoImg.classList.add('img-active');
    } else {
        currentAudio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        
        // Stop disco animation
        discoImg.classList.remove('disco-gira');
        discoImg.classList.remove('img-active');
    }
}

// Next song functionality
function tocarProximaMusica() {
    // Move to next song, loop back to start if at end
    const nextIndex = (currentAudioIndex + 1) % audioElements.length;
    playTrack(nextIndex);
}

// Previous song functionality
function tocarMusicaAnterior() {
    // Move to previous song, loop to end if at start
    const prevIndex = (currentAudioIndex - 1 + audioElements.length) % audioElements.length;
    playTrack(prevIndex);
}

// Progress bar update
audioElements.forEach(audio => {
    // Reset progress bar when a new song starts loading
    audio.addEventListener('loadstart', () => {
        progressBar.value = 0;
    });

    // Update progress bar during playback
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    });

    // Reset progress bar when song ends
    audio.addEventListener('ended', () => {
        progressBar.value = 0;
        discoImg.classList.remove('disco-gira');
        discoImg.classList.remove('img-active');
        tocarProximaMusica(); // Automatically play next song
    });
});

// Allow seeking through progress bar
progressBar.addEventListener('input', () => {
    if (currentAudio) {
        const time = (progressBar.value / 100) * currentAudio.duration;
        currentAudio.currentTime = time;
    }
});

// Ensure progress bar starts at 0
progressBar.value = 0;

// Add click event listeners to buttons without onclick
document.querySelectorAll('.sound .play-sound').forEach((button, index) => {
    if (!button.getAttribute('onclick')) {
        button.addEventListener('click', () => {
            switch(index) {
                case 3: // Maniac
                    playManiac();
                    break;
                case 4: // Bon Jovi
                    playBonjovi();
                    break;
            }
        });
    }
});