document.addEventListener("DOMContentLoaded", () => {
    // Riferimenti agli elementi DOM
    const audioPlayer = document.getElementById("audio-player");
    const playPauseButton = document.getElementById("play-pause-button");
    const playPauseIcon = document.getElementById("play-pause-icon");
    const progressBar = document.getElementById("progress-bar");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeButton = document.getElementById("volume-button");
    const volumeIcon = volumeButton.querySelector(".material-icons");
    const socialButtons = document.querySelectorAll(".social-button");
    const cursor = document.getElementById("custom-cursor");
    const buttons = document.querySelectorAll(".audio-button, .social-button");

    let previousVolume = 1; // Memorizza il volume precedente (default: 1)

    // Funzione per aggiornare il volume e il gradiente dello slider
    const updateVolume = (value) => {
        const percentage = value * 100;
        audioPlayer.volume = value;

        // Aggiorna il gradiente dello slider
        volumeSlider.style.background = `linear-gradient(to right, red 0%, red ${percentage}%, white ${percentage}%, white 100%)`;

        // Aggiorna l'icona del volume
        if (value === 0) {
            volumeIcon.textContent = "volume_off";
        } else if (value > 0 && value <= 0.5) {
            volumeIcon.textContent = "volume_down";
        } else {
            volumeIcon.textContent = "volume_up";
        }
    };

    // Funzione per aggiornare il cursore personalizzato
    const updateCursorPosition = (event) => {
        if (cursor) {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        }
    };

    // Play/Pause
    playPauseButton.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseIcon.textContent = "pause";
        } else {
            audioPlayer.pause();
            playPauseIcon.textContent = "play_arrow";
        }
    });

    // Aggiorna la barra di progresso durante la riproduzione
    audioPlayer.addEventListener("timeupdate", () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress || 0;
    });

    // Funzionalità di seek
    progressBar.addEventListener("input", (event) => {
        const seekTime = (event.target.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    // Slider del volume
    volumeSlider.addEventListener("input", (event) => {
        updateVolume(event.target.value);
    });

    // Pulsante del volume
    volumeButton.addEventListener("click", () => {
        if (audioPlayer.muted) {
            audioPlayer.muted = false;
            updateVolume(previousVolume);
            volumeSlider.value = previousVolume;
        } else {
            audioPlayer.muted = true;
            previousVolume = audioPlayer.volume;
            updateVolume(0);
            volumeSlider.value = 0;
        }
    });

    // Pulsanti social
    socialButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const url = button.getAttribute("data-url");
            if (url) {
                window.invokeNative("openUrl", url);
            }
        });
    });

    // Movimento del cursore personalizzato
    document.addEventListener("mousemove", updateCursorPosition);

    // Cambia il cursore quando si passa sopra i pulsanti
    buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            if (cursor) {
                cursor.style.background = "url('img/cursore.png') no-repeat center center";
                cursor.style.backgroundSize = "contain";
            }
        });

        button.addEventListener("mouseleave", () => {
            if (cursor) {
                cursor.style.background = "url('img/cursore.png') no-repeat center center";
                cursor.style.backgroundSize = "contain";
            }
        });
    });

    // Configura il cursore personalizzato
    if (cursor) {
        cursor.style.display = "block"; // Assicura che il cursore sia visibile
    }
    document.body.style.cursor = "none"; // Nasconde il cursore di default
});

// Configura il player audio
let audioPlayer = new Audio("music/song.mp3");
audioPlayer.loop = true; // Riproduzione in loop

// Gestione dei messaggi per aprire/chiudere la schermata
window.addEventListener("message", (event) => {
    const { action } = event.data;

    if (action === "open") {
        document.body.style.display = "block";
        audioPlayer.play();
        const cursor = document.getElementById("custom-cursor");
        if (cursor) {
            cursor.style.display = "block"; // Mostra il cursore personalizzato
        }
    } else if (action === "close") {
        document.body.style.display = "none";
        const cursor = document.getElementById("custom-cursor");
        if (cursor) {
            cursor.style.display = "none"; // Nasconde il cursore personalizzato
        }
    }
});