// awesome sauce

// variables
let timeRemaining = 64; // default time in seconds
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
    var dt = Date.now() - expected;

    if (((timeRemaining == 35) || (timeRemaining == 25)) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <= 60) {
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
    timeRemaining = 64;
    if (timeRemaining <= 60) {
        timerText.innerHTML = timeRemaining.toString() + " seconds";
    } else if (timeRemaining >= 60) {
        timerText.innerHTML = "60 seconds";
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
	let redScore = 0;
    let blueScore = 0;
	let scoreInvalid = false;
    // const oneRed = document.getElementById("one-point-r").value;
    // const twoRed = document.getElementById("two-point-r").value;
    // const threeRed = document.getElementById("three-point-r").value;
    // const fourRed = document.getElementById("four-point-r").value;
    // const oneRedPlus = document.getElementById("one-point-r-plus").value;
    // const twoRedPlus = document.getElementById("two-point-r-plus").value;
    // const threeRedPlus = document.getElementById("three-point-r-plus").value;
    // const fourRedPlus = document.getElementById("four-point-r-plus").value;

    const getElementValue = (id) => {
        const element = document.getElementById(id);
        return element ? parseInt(element.value) || 0 : 0;
    };

    const oneRed = getElementValue("one-point-r");
    const twoRed = getElementValue("two-point-r");
    const threeRed = getElementValue("three-point-r");
    const fourRed = getElementValue("four-point-r");
    const oneRedPlus = getElementValue("one-point-r-plus");
    const twoRedPlus = getElementValue("two-point-r-plus");
    const threeRedPlus = getElementValue("three-point-r-plus");
    const fourRedPlus = getElementValue("four-point-r-plus");
    const oneBlue = getElementValue("one-point-b");
    const twoBlue = getElementValue("two-point-b");
    const threeBlue = getElementValue("three-point-b");
    const fourBlue = getElementValue("four-point-b");
    const oneBluePlus = getElementValue("one-point-b-plus");
    const twoBluePlus = getElementValue("two-point-b-plus");
    const threeBluePlus = getElementValue("three-point-b-plus");
    const fourBluePlus = getElementValue("four-point-b-plus");
	const scoreKey = [1, 2, 3, 4, 1, 2, 3, 4];

	let matchData = [oneRed, twoRed, threeRed, fourRed, oneBlue, twoBlue, threeBlue, fourBlue];
    let plusPoints = [oneRedPlus, twoRedPlus, threeRedPlus, fourRedPlus, oneBluePlus, twoBluePlus, threeBluePlus, fourBluePlus];

	matchData = matchData.map(function (currentElement) {
        return currentElement == "" ? 0 : parseInt(currentElement);
    });

	for(let i = 0; i < 4; i++) {
		redScore += (scoreKey[i] + plusPoints[i]) * matchData[i];
	}
    for(let j = 4; j < 8; j++) {
		blueScore += (scoreKey[j] + plusPoints[j]) * matchData[j];
	}
    score = Math.max(redScore, 0);
    document.getElementById("finalScoreRed").style.color = "red";
    document.getElementById("finalScoreBlue").style.color = "blue";
    document.getElementById("finalScoreRed").innerHTML = "Red Team Score: " + redScore.toString();
    document.getElementById("finalScoreBlue").innerHTML = "Blue Team Score: " + blueScore.toString();

}

function clearFields() {
    document.getElementById("one-point-r").value = "";
	document.getElementById("two-point-r").value= "";
    document.getElementById("three-point-r").value= "";
	document.getElementById("four-point-r").value= "";
    document.getElementById("one-point-r-plus").value= "";
	document.getElementById("two-point-r-plus").value= "";
    document.getElementById("three-point-r-plus").value= "";
	document.getElementById("four-point-r-plus").value = "";
    document.getElementById("one-point-b").value = "";
	document.getElementById("two-point-b").value= "";
    document.getElementById("three-point-b").value= "";
	document.getElementById("four-point-b").value= "";
    document.getElementById("one-point-b-plus").value= "";
	document.getElementById("two-point-b-plus").value= "";
    document.getElementById("three-point-b-plus").value= "";
	document.getElementById("four-point-b-plus").value = "";
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
    const oneRed = document.getElementById("one-point-r");
    const twoRed = document.getElementById("two-point-r");
    const threeRed = document.getElementById("three-point-r");
    const fourRed = document.getElementById("four-point-r");
    const oneRedPlus = document.getElementById("one-point-r-plus");
    const twoRedPlus = document.getElementById("two-point-r-plus");
    const threeRedPlus = document.getElementById("three-point-r-plus");
    const fourRedPlus = document.getElementById("four-point-r-plus");
    const oneBlue = document.getElementById("one-point-b");
    const twoBlue = document.getElementById("two-point-b");
    const threeBlue = document.getElementById("three-point-b");
    const fourBlue = document.getElementById("four-point-b");
    const oneBluePlus = document.getElementById("one-point-b-plus");
    const twoBluePlus = document.getElementById("two-point-b-plus");
    const threeBluePlus = document.getElementById("three-point-b-plus");
    const fourBluePlus = document.getElementById("four-point-b-plus");


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
        oneRed.addEventListener("keyup", () => {calculateScores(oneRed)})
        oneRed.addEventListener("change", () => {calculateScores(oneRed)})
        //
        twoRed.addEventListener("keyup", () => {calculateScores(twoRed)})
        twoRed.addEventListener("change", () => {calculateScores(twoRed)})
        //
        threeRed.addEventListener("keyup", () => {calculateScores(threeRed)})
        threeRed.addEventListener("change", () => {calculateScores(threeRed)})
        //
        fourRed.addEventListener("keyup", () => {calculateScores(fourRed)})
        fourRed.addEventListener("change", () => {calculateScores(fourRed)})
        //
        oneRedPlus.addEventListener("keyup", () => {calculateScores(oneRedPlus)})
        oneRedPlus.addEventListener("change", () => {calculateScores(oneRedPlus)})
        //
        twoRedPlus.addEventListener("keyup", () => {calculateScores(twoRedPlus)})
        twoRedPlus.addEventListener("change", () => {calculateScores(twoRedPlus)})
        //
        threeRedPlus.addEventListener("keyup", () => {calculateScores(threeRedPlus)})
        threeRedPlus.addEventListener("change", () => {calculateScores(threeRedPlus)})
        //
        fourRedPlus.addEventListener("keyup", () => {calculateScores(fourRedPlus)})
        fourRedPlus.addEventListener("change", () => {calculateScores(fourRedPlus)})
        //
        oneBlue.addEventListener("keyup", () => {calculateScores(oneBlue)})
        oneBlue.addEventListener("change", () => {calculateScores(oneBlue)})
        //
        twoBlue.addEventListener("keyup", () => {calculateScores(twoBlue)})
        twoBlue.addEventListener("change", () => {calculateScores(twoBlue)})
        //
        threeBlue.addEventListener("keyup", () => {calculateScores(threeBlue)})
        threeBlue.addEventListener("change", () => {calculateScores(threeBlue)})
        //
        fourBlue.addEventListener("keyup", () => {calculateScores(fourBlue)})
        fourBlue.addEventListener("change", () => {calculateScores(fourBlue)})
        //
        oneBluePlus.addEventListener("keyup", () => {calculateScores(oneBluePlus)})
        oneBluePlus.addEventListener("change", () => {calculateScores(oneBluePlus)})
        //
        twoBluePlus.addEventListener("keyup", () => {calculateScores(twoBluePlus)})
        twoBluePlus.addEventListener("change", () => {calculateScores(twoBluePlus)})
        //
        threeBluePlus.addEventListener("keyup", () => {calculateScores(threeBluePlus)})
        threeBluePlus.addEventListener("change", () => {calculateScores(threeBluePlus)})
        //
        fourBluePlus.addEventListener("keyup", () => {calculateScores(fourBluePlus)})
        fourBluePlus.addEventListener("change", () => {calculateScores(fourBluePlus)})
        //score buttons
        clearBtn.addEventListener("click", clearFields);
        timerSwitch.addEventListener("click", showTimer);
    }   
});
