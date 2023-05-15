'use-strict';
(function () {
    const spaces = document.querySelectorAll('.space');
    const pieces = document.querySelectorAll('.piece');
    let draggedPiece = null;
    let rotationCounter = 0;

    pieces.forEach(piece => {
        const imgElements = piece.querySelectorAll('img');
        const pieceObj = { piece: piece, imgs: imgElements };

        // Add a click event listener to each piece
        piece.addEventListener('click', () => {
            if (draggedPiece && draggedPiece.piece === pieceObj.piece) {
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
            // prevent the default action of the browser on a drag over event
            event.preventDefault();

            // check if the dragged piece is currently over bord4 or bord7
            if (draggedPiece) {
                // do nothing and return early
                return;
            }

            // set the drop effect to move for all other spaces
            event.dataTransfer.dropEffect = 'move';
        });

        space.addEventListener('drop', event => {
            // check if the space is empty
            if (event.target.classList.contains('space') && !event.target.hasChildNodes()) {
                if (draggedPiece && draggedPiece.piece.hasChildNodes()) {
                    const imgElements = draggedPiece.imgs;
                    const currentIndex = Array.from(spaces).indexOf(event.target);
                    let nextIndex1, nextIndex2, nextIndex3;
                    let canBePlaced = true;

                    // Check if all the required spaces are empty
                    if (imgElements.length === 4) {
                        if (rotationCounter === 0) {
                            nextIndex1 = currentIndex + 4;
                            nextIndex2 = currentIndex + 8;
                            nextIndex3 = currentIndex + 12;
                        } else if (rotationCounter === 1) {
                            nextIndex1 = currentIndex - 1;
                            nextIndex2 = currentIndex - 2;
                            nextIndex3 = currentIndex - 3;
                        } else if (rotationCounter === 2) {
                            nextIndex1 = currentIndex - 4;
                            nextIndex2 = currentIndex - 8;
                            nextIndex3 = currentIndex - 12;
                        } else if (rotationCounter === 3) {
                            nextIndex1 = currentIndex + 1;
                            nextIndex2 = currentIndex + 2;
                            nextIndex3 = currentIndex + 3;
                        }

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
                        if (rotationCounter === 0) {
                            nextIndex1 = currentIndex + 4;
                            nextIndex2 = currentIndex + 8;
                        } else if (rotationCounter === 1) {
                            nextIndex1 = currentIndex - 1;
                            nextIndex2 = currentIndex - 2;
                        } else if (rotationCounter === 2) {
                            nextIndex1 = currentIndex - 4;
                            nextIndex2 = currentIndex - 8;
                        } else if (rotationCounter === 3) {
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
                        if (rotationCounter === 0) {
                            nextIndex1 = currentIndex + 4;
                        } else if (rotationCounter === 1) {
                            nextIndex1 = currentIndex - 1;
                        } else if (rotationCounter === 2) {
                            nextIndex1 = currentIndex - 4;
                        } else if (rotationCounter === 3) {
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
                    else {
                        // append the piece to the current space
                        event.target.appendChild(imgElements[0]);
                    }

                    if (canBePlaced) {
                        checkWin();
                    }
                }
            }

            draggedPiece = null; // reset the value of draggedPiece
        });
    });


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
        const bord4 = document.querySelector('#bord-4');
        const bord3 = document.querySelector('#bord-3');
        const bord12 = document.querySelector('#bord-12');
        const bord15 = document.querySelector('#bord-15');

        if (bord4.contains(piece1) && bord3.contains(piece2) && bord12.contains(piece4) && bord15.contains(piece3)) {
            if (!hasWon) {
                alert('Gefeliciteerd, je hebt gewonnen!');
                hasWon = true;
            }
        }
    }
})();