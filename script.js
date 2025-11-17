let playCount = 0;   // counts how many times speech has played
let maxPlays = 2;    // limit to 2 times
let speaking = false;

// Keep utterances alive so Chrome doesn't garbage-collect them
let utteranceRef = null;

// Load voices (required especially for Chrome)
let voicesLoaded = false;
speechSynthesis.onvoiceschanged = () => {
    voicesLoaded = true;
};

function playSpeech() {
    let textElement = document.getElementById("text");
    if (!textElement) {
        console.error("Textarea with id='text' not found.");
        return;
    }

    let text = textElement.value.trim();

    if (text === "") {
        alert("Please enter some text first!");
        return;
    }

    if (playCount >= maxPlays) {
        alert("Speech limit reached (2 times).");
        return;
    }

    // Cancel anything stuck in queue
    speechSynthesis.cancel();

    // Create new speech object
    utteranceRef = new SpeechSynthesisUtterance(text);
    utteranceRef.lang = "en-US";

    utteranceRef.onstart = () => {
        speaking = true;
    };

    utteranceRef.onend = () => {
        speaking = false;
        playCount++;
    };

    utteranceRef.onerror = (e) => {
        console.error("Speech Error:", e);
    };

    // Speak
    speechSynthesis.speak(utteranceRef);
}
