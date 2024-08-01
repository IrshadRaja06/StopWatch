const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const lapButton = document.getElementById('lap');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapsDisplay = document.getElementById('laps');

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

function updateTimer() {
    const currentTime = new Date();
    const elapsedMilliseconds = currentTime - startTime;
    elapsedTime += elapsedMilliseconds;

    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    const formattedTime = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
    timerDisplay.textContent = formattedTime;

    startTime = currentTime;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    timerDisplay.textContent = '00:00:00';
    lapsDisplay.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = timerDisplay.textContent;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsDisplay.appendChild(lapElement);
    }
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
