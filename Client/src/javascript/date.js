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
        case '2023-06-01':
            valuePuzzle = 1;
            break;
        case '2023-06-02':
            valuePuzzle = 2;
            break;
        case '2023-06-03':
            valuePuzzle = 3;
            break;
        case '2023-06-04':
            valuePuzzle = 4;
            break;
        case '2023-06-05':
            valuePuzzle = 5;
            break;
        case '2023-06-06':
            valuePuzzle = 6;
            break;
        case '2023-06-07':
            valuePuzzle = 7;
            break;
        case '2023-06-08':
            valuePuzzle = 8;
            break;
        case '2023-06-09':
            valuePuzzle = 9;
            break;
        case '2023-06-10':
            valuePuzzle = 10;
            break;case '2023-06-11':
            valuePuzzle = 11;
            break;
        case '2023-06-12':
            valuePuzzle = 12;
            break;
        case '2023-06-13':
            valuePuzzle = 13;
            break;
        case '2023-06-14':
            valuePuzzle = 14;
            break;


        default:
            valuePuzzle = 1;
    }

    localStorage.setItem('valuePuzzle', valuePuzzle);
    window.location.href = './game/index.html';
});
