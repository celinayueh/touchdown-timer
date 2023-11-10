// awesome sauce

// variables
let timeRemaining = 154; // default time in seconds
let timerReady = true; // debounce for start button
let switchSoundsEnabled = false;
//audio
let startSound = new Audio("audio/VEX IQ countdown.mp3");
let endSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-end-sound.mp3");
let switchSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-driver-switch-sound.mp3");
switchSound.volume = 0.7; // volume
let shortBeep = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Short-beep.mp3");
let lastCount = new Audio("audio/final countdown.mp3");

// functions

//Match timer
var interval = 1000; // ms
var expected = Date.now() + interval;
let timeoutId;

function timerCount() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)

    if ((timeRemaining == 75) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <= 150) {
        if (!timerReady) {
            timerText.innerHTML = timeRemaining.toString() + " seconds";
        }
    }
    if (timeRemaining == 10) {
        lastCount.play(); // Play end countdown
    }
    expected += interval;
    timeoutId = setTimeout(timerCount, Math.max(0, interval - dt));
}

function timerStart() {
    if (timerReady) {
        startSound.play();
        timerReady = false;
        expected = Date.now() + interval; // Reset the expected time
        timerCount();
    }
}

function timerStop() {
    if (!timerReady) {
        timerReady = true;
        clearTimeout(timeoutId); // stop calling timerCount
    }
}

function timerReset() {
    timerReady = true;
    clearTimeout(timeoutId);
    timeRemaining = 154;
    if (timeRemaining <= 150) {
        timerText.innerHTML = timeRemaining.toString() + " seconds";
    } else if (timeRemaining >= 150) {
        timerText.innerHTML = "150 seconds";
    }
}



function switchCountdown() {
    if (timerReady) {
        switchSoundsEnabled = switchSoundsEnabled ? false : true;
        if (switchSoundsEnabled) {
            countdownSwitch.innerHTML = "Disable Sound at Halfway"
        } else {
            countdownSwitch.innerHTML = "Enable Sound at Halfway"
        }
    }
}

function showScore() {
    timerContainer.style.display = "none";
    scoreContainer.style.display = "flex";
}

//Score calculator

function calculateScores(inputRef) {
    if (inputRef) { // ensure values only within the declared min and max are inputted
        const minVal = inputRef.getAttribute("min");
        const maxVal = inputRef.getAttribute("max");
        const defVal = inputRef.getAttribute("placeholder");

	var minNum = parseInt(minVal);
	var maxNum = parseInt(maxVal);
	    
        if (parseInt(inputRef.value) > maxNum || parseInt(inputRef.value) < minNum) {
            inputRef.value = defVal;
        }
    }
	let score = 0;
	let scoreInvalid = false;
	const correctLoot = document.getElementById("correct-loot").value;
	const incorrectLoot = document.getElementById("incorrect-loot").value;
	const endgameFull = document.getElementById("endgame-full").value;
	const endgame10 = document.getElementById("endgame-10").value;
	const endgame5 = document.getElementById("endgame-5").value;
	const scoreKey = [10,-1,20,10,5];

	let matchData = [correctLoot, incorrectLoot, endgameFull, endgame10, endgame5];
	matchData = matchData.map(function (currentElement) {
		return currentElement == "" ? 0 : parseInt(currentElement);
	});

	for(let i = 0; i < 5; i++) {
		score += matchData[i] * scoreKey[i];
	}

		score = Math.max(score, 0);
		document.getElementById("finalScore").style.color = "black";
		document.getElementById("finalScore").innerHTML = "Score: " + score.toString();

}

function clearFields() {
	document.getElementById("correct-loot").value = "";
	document.getElementById("incorrect-loot").value = "";
	document.getElementById("endgame-full").value = "";
	document.getElementById("endgame-10").value = "";
	document.getElementById("endgame-5").value = "";
	calculateScores();
}

function showTimer() {
    scoreContainer.style.display = "none";
    timerContainer.style.display = "flex";
}

// button events
window.addEventListener("DOMContentLoaded", function() {
    // timer variables
    const timerContainer = document.getElementById("timerContainer");
    const scoreContainer = this.document.getElementById("scoreContainer");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const countdownSwitch = document.getElementById("countdownSwitch");
    const scoreSwitch = document.getElementById("scoreSwitch");
    const timerText = this.document.getElementById("timerText");
    // score variables
	const correctLoot = document.getElementById("correct-loot");
	const incorrectLoot = document.getElementById("incorrect-loot");
	const endgameFull = document.getElementById("endgame-full");
	const endgame10 = document.getElementById("endgame-10");
	const endgame5 = document.getElementById("endgame-5");

    const clearBtn = document.getElementById("clearBtn");
    const timerSwitch = document.getElementById("timerSwitch");

    if (startBtn) { // Check if buttons loaded on browser
        // timer events
        startBtn.addEventListener("click", timerStart)
        stopBtn.addEventListener("click", timerStop)
        resetBtn.addEventListener("click", timerReset)
        countdownSwitch.addEventListener("click", switchCountdown)
        scoreSwitch.addEventListener("click", showScore)
        // score events
        //input buttons
        correctLoot.addEventListener("keyup", () => {calculateScores(correctLoot)})
        correctLoot.addEventListener("change", () => {calculateScores(correctLoot)})
        //
        incorrectLoot.addEventListener("keyup", () => {calculateScores(incorrectLoot)})
        incorrectLoot.addEventListener("change", () => {calculateScores(incorrectLoot)})
        //
        endgameFull.addEventListener("keyup", () => {calculateScores(endgameFull)})
        endgameFull.addEventListener("change", () => {calculateScores(endgameFull)})
        //
        endgame10.addEventListener("keyup", () => {calculateScores(endgame10)})
        endgame10.addEventListener("change", () => {calculateScores(endgame10)})
        //
        endgame5.addEventListener("keyup", () => {calculateScores(endgame5)})
        endgame5.addEventListener("change", () => {calculateScores(endgame5)})

        //score buttons
        clearBtn.addEventListener("click", clearFields);
        timerSwitch.addEventListener("click", showTimer);
    }   
});
