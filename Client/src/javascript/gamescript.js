import { startTimer, stopTimer } from './timer.js'
'use strict';
(function () {
    const spaces = document.querySelectorAll('.space');
    const pieces = document.querySelectorAll('.piece');
    let draggedPiece = null;
    let rotationCounter = 0;
    let winConditionsArray;
    let levelNummer;
    let naam;


    const startButton = document.querySelector('#start-button');


    //zet game controls uit (swipe functies)
    disableGameInteraction();

    const piecesContainer = document.querySelector('.pieces-container');

    piecesContainer.addEventListener('click', function() {
        if (disableGameInteraction) {
            alert('Fill in your name and press start to play!');
        }
    });


    startButton.addEventListener('click', function() {
        const inputnaam = document.querySelector('#playername');
        if(inputnaam.value !== ""){
            enableGameInteraction();
            disableGameInteraction = false;
            startTimer();
            const nameField = document.querySelector('.nameField');
            naam = inputnaam.value;
            nameField.innerHTML = ''
        }
        else{
            alert('Fill in the name please!')
        }
    });

    function disableGameInteraction() {
        pieces.forEach(piece => {
            piece.style.pointerEvents = 'none';
        });

        spaces.forEach(space => {
            space.style.pointerEvents = 'none';
        });
    }

    function enableGameInteraction() {
        pieces.forEach(piece => {
            piece.style.pointerEvents = 'auto';
        });

        spaces.forEach(space => {
            space.style.pointerEvents = 'auto';
        });
    }


    const resetButton = document.getElementById('reset-button');

    // Add a click event listener to the reset button
    resetButton.addEventListener('click', () => {
        location.reload();
    });

    // Fetched alle data dat bij een specifiek level hoort
    fetch('./package.json')
        .then(response => response.json())
        .then(data => {
            let valuePuzzle = localStorage.getItem('valuePuzzle');
            levelNummer = valuePuzzle;
            localStorage.setItem('levelNummer', levelNummer)
            const levelGevraagd = `level${levelNummer}`;
            document.title = `Level ${levelNummer}`
            const catsPlacement = data[levelGevraagd].cats;
            const winCondition = data[levelGevraagd].winCondition;
            winConditionsArray = winCondition



            catsPlacement.forEach(cat => {
                if(cat.id === 1 && cat.position === "" || cat.id === 2 && cat.position === ""){
                    return
                }
                const catPosition = cat.position;

                // Use the catId and catPosition to select the corresponding elements
                const catElement = document.querySelector(`#${catPosition}`);
                const catImage = document.createElement('img');
                catImage.src = '../images/cat.png';
                catImage.alt = 'cat';

                // Append the cat image to the cat element
                catElement.appendChild(catImage);
            });

            const opdrachtContainer = document.querySelector('.opdrachtContainer')
            const solutionContainer = document.querySelector('.solutionContainer')

            opdrachtContainer.innerHTML = `<img src="../images/levelsopdrachten/level${levelNummer}/opdracht.png" alt="opdracht">`
            solutionContainer.innerHTML = `<img src="../images/levelsopdrachten/level${levelNummer}/solution.png" alt="opdracht">`
        });


    const solutionBtn = document.querySelector('.solutionBtn')
    const blurredImage = document.querySelector('.solutionContainer')
    solutionBtn.addEventListener('click', function () {
        blurredImage.classList.toggle('imageblur')
    })


    pieces.forEach(piece => {
        const imgElements = piece.querySelectorAll('img');
        const pieceObj = { piece: piece, imgs: imgElements };

        // Add a click event listener to each piece
        piece.addEventListener('click', () => {
            if (draggedPiece && draggedPiece.piece === pieceObj.piece && pieceObj.imgs.length > 1) {
                if (rotationCounter === 3) {
                    rotationCounter = -1;
                }
                rotationCounter++; // Increase the rotation counter
                rotatePiece(piece, rotationCounter);
            }
        });

        piece.addEventListener('mousedown', () => {
            draggedPiece = pieceObj;
        });

        imgElements.forEach(img => {
            img.addEventListener('mousedown', () => {
                draggedPiece = pieceObj;
            });
        });
    });

    spaces.forEach(space => {
        space.addEventListener('dragover', event => {
            // Prevent the default action of the browser on a drag over event
            event.preventDefault();
            // Set the drop effect to 'move' for all other spaces
            event.dataTransfer.dropEffect = 'move';
        });

        space.addEventListener('drop', event => {
            // Check if the space is empty
            if (event.target.classList.contains('space') && !event.target.hasChildNodes()) {
                if (draggedPiece && draggedPiece.piece.hasChildNodes()) {
                    const imgElements = draggedPiece.imgs;
                    const currentIndex = Array.from(spaces).indexOf(event.target);
                    let nextIndex1, nextIndex2, nextIndex3;
                    let canBePlaced = true;

                    // Check if all the required spaces are empty
                    if (imgElements.length === 4) {
                        // Calculate the next indices based on the rotation counter
                        if (
                            rotationCounter === 0 &&
                            currentIndex + 12 < spaces.length
                        ) {
                            nextIndex1 = currentIndex + 4;
                            nextIndex2 = currentIndex + 8;
                            nextIndex3 = currentIndex + 12;
                        } else if (
                            rotationCounter === 1 &&
                            currentIndex % 4 >= 2 &&
                            currentIndex % 4 !== 0 // Check if not in the second column
                        ) {
                            nextIndex1 = currentIndex - 1;
                            nextIndex2 = currentIndex - 2;
                            nextIndex3 = currentIndex - 3;
                        } else if (
                            rotationCounter === 2 &&
                            currentIndex - 12 >= 0
                        ) {
                            nextIndex1 = currentIndex - 4;
                            nextIndex2 = currentIndex - 8;
                            nextIndex3 = currentIndex - 12;
                        } else if (
                            rotationCounter === 3 &&
                            currentIndex % 4 <= 1
                        ) {
                            nextIndex1 = currentIndex + 1;
                            nextIndex2 = currentIndex + 2;
                            nextIndex3 = currentIndex + 3;
                        }

                        // Check if the next spaces are empty
                        if (
                            spaces[nextIndex1] &&
                            spaces[nextIndex2] &&
                            spaces[nextIndex3] &&
                            !spaces[nextIndex1].hasChildNodes() &&
                            !spaces[nextIndex2].hasChildNodes() &&
                            !spaces[nextIndex3].hasChildNodes()
                        ) {
                            // Append the piece to the spaces based on the rotation
                            event.target.appendChild(imgElements[0]);
                            spaces[nextIndex1].appendChild(imgElements[1]);
                            spaces[nextIndex2].appendChild(imgElements[2]);
                            spaces[nextIndex3].appendChild(imgElements[3]);
                        } else {
                            canBePlaced = false;
                        }
                    } else if (imgElements.length === 3) {
                        // Calculate the next indices based on the rotation counter
                        if (
                            rotationCounter === 0 &&
                            currentIndex + 8 < spaces.length
                        ) {
                            nextIndex1 = currentIndex + 4;
                            nextIndex2 = currentIndex + 8;
                        } else if (
                            rotationCounter === 1 &&
                            currentIndex % 4 >= 2
                        ) {
                            nextIndex1 = currentIndex - 1;
                            nextIndex2 = currentIndex - 2;
                        } else if (
                            rotationCounter === 2 &&
                            currentIndex - 8 >= 0
                        ) {
                            nextIndex1 = currentIndex - 4;
                            nextIndex2 = currentIndex - 8;
                        } else if (
                            rotationCounter === 3 &&
                            currentIndex % 4 <= 1
                        ) {
                            nextIndex1 = currentIndex + 1;
                            nextIndex2 = currentIndex + 2;
                        }

                        if (
                            spaces[nextIndex1] &&
                            spaces[nextIndex2] &&
                            !spaces[nextIndex1].hasChildNodes() &&
                            !spaces[nextIndex2].hasChildNodes()
                        ) {
                            // Append the piece to the spaces based on the rotation
                            event.target.appendChild(imgElements[0]);
                            spaces[nextIndex1].appendChild(imgElements[1]);
                            spaces[nextIndex2].appendChild(imgElements[2]);
                        } else {
                            canBePlaced = false;
                        }
                    } else if (imgElements.length === 2) {
                        // Calculate the next indices based on the rotation counter
                        if (
                            rotationCounter === 0 &&
                            currentIndex + 4 < spaces.length
                        ) {
                            nextIndex1 = currentIndex + 4;
                        } else if (
                            rotationCounter === 1 &&
                            currentIndex - 1 >= 0
                        ) {
                            nextIndex1 = currentIndex - 1;
                        } else if (
                            rotationCounter === 2 &&
                            currentIndex - 4 >= 0
                        ) {
                            nextIndex1 = currentIndex - 4;
                        } else if (
                            rotationCounter === 3 &&
                            currentIndex + 1 < spaces.length
                        ) {
                            nextIndex1 = currentIndex + 1;
                        }

                        if (
                            spaces[nextIndex1] &&
                            !spaces[nextIndex1].hasChildNodes()
                        ) {
                            // Append the piece to the space based on the rotation
                            event.target.appendChild(imgElements[0]);
                            spaces[nextIndex1].appendChild(imgElements[1]);
                        } else {
                            canBePlaced = false;
                        }
                    }
                    else if (imgElements.length === 1) {
                        const currentIndex = Array.from(spaces).indexOf(event.target);

                        if (spaces[currentIndex] && !spaces[currentIndex].hasChildNodes()) {
                            // Append the piece to the space
                            event.target.appendChild(imgElements[0]);
                            spaces[currentIndex].appendChild(imgElements[0]); // Use currentIndex instead of nextIndex1
                        } else {
                            canBePlaced = false;
                        }
                    }



                    if (canBePlaced) {
                        checkWin(winConditionsArray);
                        draggedPiece = null;
                        rotationCounter = 0;
                    }
                } else {
                    // append the piece to the current space
                    event.target.appendChild(imgElements[0]);
                    draggedPiece = null;
                    rotationCounter = 0;
                }
            }
        });
    });


    // Rotate the piece based on the rotation counter
    function rotatePiece(piece, rotation) {
        const rotationAngle = rotation * 90 + 'deg';
        piece.style.transform = `rotate(${rotationAngle})`;
    }

    let hasWon = false;

    function checkWin(winCondition) {
        let hasWon = true;

        for (const condition of winCondition) {
            const piece = document.querySelector(condition.pieceId);
            const space = document.querySelector(condition.spaceId);

            if (!space.contains(piece)) {
                hasWon = false;
                break;
            }
        }

        if (hasWon) {
            const timerDisplay = document.querySelector('#timer-display');


            alert(`Congratulations, you have won in ${timerDisplay.innerHTML} ! `);
            stopTimer();
            let tijdBehaald = timerDisplay.innerHTML;

            console.log(naam)



            const data = {
                idlevel: levelNummer,
                naam: naam,
                tijd: tijdBehaald


            }


            fetch('http://localhost:3000/api/v1/highscores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            })
                .then(response =>
                    response.json()

                )
                .then(result => {
                    window.location.href = '../';
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.error('Error:', error);
                });

        }
    }





})();