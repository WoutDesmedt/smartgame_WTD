const timerDisplay = document.querySelector('#timer-display');

// Variable to store the start time
let startTime;
let timerInterval;

// Function to update the timer display
function updateTimerDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;

    // Convert the elapsed time to minutes, seconds, and milliseconds
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);

    // Format the time values with leading zeros
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

// Function to start the timer
export function startTimer() {
    // Clear any existing interval
    clearInterval(timerInterval);

    // Set the start time
    startTime = new Date().getTime();

    // Update the timer display
    updateTimerDisplay();

    // Start the interval to update the timer every millisecond
    timerInterval = setInterval(updateTimerDisplay, 1);
}

// Function to stop the timer
export function stopTimer() {
    clearInterval(timerInterval);
}
