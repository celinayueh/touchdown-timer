// awesome sauce

// variables
let timeRemaining = 64; // default time in seconds
let timerReady = true; // debounce for start button
let interval; // id for setInterval
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
function timerCount() {
    if ((timeRemaining == 26 || timeRemaining == 36) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <=60) {
        if (!(timerReady)) {
            timerText.innerHTML = timeRemaining.toString() + " seconds";
        }
    }
    if (timeRemaining == 10) {
        lastCount.play(); // Play end countdown
    }
}

function timerStart() {
    if (timerReady) {
        startSound.play();
        timerReady = false;
        timerCount();
        interval = setInterval(timerCount, 1000); // Run timerCount() every second
    }
}

function timerStop() {
    if (!(timerReady)) {
        timerReady = true;
        clearInterval(interval); // stop calling timerCount
    }
}

function timerReset() {
    timerReady = true;
    clearInterval(interval);
    timeRemaining = 64;
    if (timeRemaining <= 60){
        timerText.innerHTML = timeRemaining.toString() + " seconds";
    } else if (timeRemaining >= 60){
        timerText.innerHTML = "60 seconds";
    }
}

function switchCountdown() {
    if (timerReady) {
        switchSoundsEnabled = switchSoundsEnabled ? false : true;
        if (switchSoundsEnabled) {
            countdownSwitch.innerHTML = "Disable Switch Sounds"
        } else {
            countdownSwitch.innerHTML = "Enable Switch Sounds"
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
        if (inputRef.value > maxVal || inputRef.value < minVal) {
            inputRef.value = defVal;
        }
    }
	let score = 0;
	let scoreInvalid = false;
	const volcano = document.getElementById("volcano").value;
	const orangeTile = document.getElementById("orangeTile").value;
	const pipeline = document.getElementById("pipeline").value;
	const blueTile = document.getElementById("blueTile").value;
	const purpleTile = document.getElementById("purpleTile").value;
    const turbine = document.getElementById("turbine").value;
    const clam = document.getElementById("clam").value;
    const pearl = document.getElementById("pearl").value;
    const wildlife = document.getElementById("wildlife").value;
	const scoreKey = [20,5,10,5,5,5,10,10,-5];

	let matchData = [volcano, orangeTile, pipeline, blueTile, purpleTile, turbine, clam, pearl, wildlife];
	matchData = matchData.map(function (currentElement) {
		return currentElement == "" ? 0 : parseInt(currentElement);
	});

	for(let i = 0; i < 9; i++) {
		score += matchData[i] * scoreKey[i];
	}
		document.getElementById("finalScore").style.color = "black";
		document.getElementById("finalScore").innerHTML = "Score: " + score.toString();

}

function clearFields() {
	document.getElementById("volcano").value = "";
	document.getElementById("orangeTile").value = "";
	document.getElementById("pipeline").value = "";
	document.getElementById("blueTile").value = "";
	document.getElementById("purpleTile").value = "";
    document.getElementById("turbine").value = "";
    document.getElementById("clam").value = ""; 
    document.getElementById("pearl").value = "";
    document.getElementById("wildlife").value = "";
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
	const volcano = document.getElementById("volcano");
	const orangeTile = document.getElementById("orangeTile");
	const pipeline = document.getElementById("pipeline");
	const blueTile = document.getElementById("blueTile");
	const purpleTile = document.getElementById("purpleTile");
	const turbine = document.getElementById("turbine");
	const clam = document.getElementById("clam");
    const pearl = document.getElementById("pearl");
    const wildlife = document.getElementById("wildlife");

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
        volcano.addEventListener("keyup", () => {calculateScores(volcano)})
        volcano.addEventListener("change", () => {calculateScores(volcano)})
        //
        orangeTile.addEventListener("keyup", () => {calculateScores(orangeTile)})
        orangeTile.addEventListener("change", () => {calculateScores(orangeTile)})
        //
        pipeline.addEventListener("keyup", () => {calculateScores(pipeline)})
        pipeline.addEventListener("change", () => {calculateScores(pipeline)})
        //
        blueTile.addEventListener("keyup", () => {calculateScores(blueTile)})
        blueTile.addEventListener("change", () => {calculateScores(blueTile)})
        //
        purpleTile.addEventListener("keyup", () => {calculateScores(purpleTile)})
        purpleTile.addEventListener("change", () => {calculateScores(purpleTile)})
        //
        turbine.addEventListener("keyup",() => {calculateScores(turbine)})
        turbine.addEventListener("change", () => {calculateScores(turbine)})
        //
        clam.addEventListener("keyup", () => {calculateScores(clam)})
        clam.addEventListener("change", () => {calculateScores(clam)})
        //
        pearl.addEventListener("keyup", () => {calculateScores(pearl)})
        pearl.addEventListener("change", () => {calculateScores(pearl)})
        //
        wildlife.addEventListener("keyup", () => {calculateScores(wildlife)})
        wildlife.addEventListener("change", () => {calculateScores(wildlife)})

        //score buttons
        clearBtn.addEventListener("click", clearFields);
        timerSwitch.addEventListener("click", showTimer);
    }   
});