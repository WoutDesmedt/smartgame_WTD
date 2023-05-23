// Get the date picker element
let datePicker = document.querySelector('input[type="date"]');

// Get the submit button element
let submitBtn = document.querySelector('#submitBtn');

// Add an event listener to the submit button
submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    let selectedDate = datePicker.value;
    let valuePuzzle;

    switch(selectedDate) {
        case '2023-05-23':
            valuePuzzle = 1;
            break;
        case '2023-05-24':
            valuePuzzle = 2;
            break;
        case '2023-05-25':
            valuePuzzle = 3;
            break;
        case '2023-05-26':
            valuePuzzle = 4;
            break;
        case '2023-05-27':
            valuePuzzle = 5;
            break;
        case '2023-05-28':
            valuePuzzle = 6;
            break;
        case '2023-05-29':
            valuePuzzle = 7;
            break;
        default:
            valuePuzzle = 1;
    }

    localStorage.setItem('valuePuzzle', valuePuzzle);
    window.location.href = './game/index.html';
});
