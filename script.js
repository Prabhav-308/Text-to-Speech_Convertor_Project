let playCount = 0;   // counts how many times speech has played
let maxPlays = 2;    // limit to 2 times
let speaking = false;

function playSpeech() {
    let text = document.getElementById("text").value;

    if (text.trim() === "") {
        alert("Please enter some text first!");
        return;
    }

    // If already played 2 times → stop
    if (playCount >= maxPlays) {
        alert("Speech limit reached (2 times).");
        return;
    }

    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";

    speech.onstart = () => {
        speaking = true;
    };

    speech.onend = () => {
        speaking = false;
        playCount++;     // increase count only after speaking finishes
    };

    window.speechSynthesis.speak(speech);
}
