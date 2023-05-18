'use strict';
//Puzzel: 6
(function () {
    const spaces = document.querySelectorAll('.space');
    const pieces = document.querySelectorAll('.piece');
    let draggedPiece = null;
    let rotationCounter = 0;

    const resetButton = document.getElementById('reset-button');

    // Add a click event listener to the reset button
    resetButton.addEventListener('click', () => {
        location.reload();
    });

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
                        checkWin();
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

    function checkWin() {
        const piece1 = document.querySelector('#piece-1');
        const piece2 = document.querySelector('#piece-2');
        const piece3 = document.querySelector('#piece-3');
        const piece4 = document.querySelector('#piece-4');
        const bord3 = document.querySelector('#bord-3');
        const bord4 = document.querySelector('#bord-4');
        const bord12 = document.querySelector('#bord-12');
        const bord15 = document.querySelector('#bord-15');
        if(bord4.contains(piece1)){
            console.log('bord4 ok')
        }

        if(bord3.contains(piece2)){
            console.log('bord3 ok')
        }
        if(bord12.contains(piece4)){
            console.log('bord12 ok')
        }
        if(bord15.contains(piece3)){
            console.log('bord15 ok')
        }

        if (bord4.contains(piece1) && bord3.contains(piece2) && bord12.contains(piece4) && bord15.contains(piece3)) {
            if (!hasWon) {
                alert('Congratulations, you have won!');
                hasWon = true;
            }
        }
    }
})();