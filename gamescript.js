'use-strict';
(function () {
    export function initializePuzzel(){

    }
    const spaces = document.querySelectorAll('.space');
    const pieces = document.querySelectorAll('.piece');
    let draggedPiece = null;

    pieces.forEach(piece => {
        const imgElements = piece.querySelectorAll('img');
        const pieceObj = { piece: piece, imgs: imgElements };

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
                    const nextIndex1 = currentIndex + 4;
                    const nextIndex2 = currentIndex + 8;
                    const nextIndex3 = currentIndex + 12;
                    let canBePlaced = true;

                    // Check if all the required spaces are empty
                    if (imgElements.length === 4) {
                        if (
                            spaces[nextIndex1] &&
                            spaces[nextIndex2] &&
                            spaces[nextIndex3] &&
                            !spaces[nextIndex1].hasChildNodes() &&
                            !spaces[nextIndex2].hasChildNodes() &&
                            !spaces[nextIndex3].hasChildNodes()
                        ) {
                            // append the piece to all four spaces
                            event.target.appendChild(imgElements[0]);
                            spaces[nextIndex1].appendChild(imgElements[1]);
                            spaces[nextIndex2].appendChild(imgElements[2]);
                            spaces[nextIndex3].appendChild(imgElements[3]);
                        } else {
                            canBePlaced = false;
                        }
                    } else if (imgElements.length === 3) {
                        if (
                            spaces[nextIndex1] &&
                            spaces[nextIndex2] &&
                            !spaces[nextIndex1].hasChildNodes() &&
                            !spaces[nextIndex2].hasChildNodes()
                        ) {
                            // append the piece to all three spaces
                            event.target.appendChild(imgElements[0]);
                            spaces[nextIndex1].appendChild(imgElements[1]);
                            spaces[nextIndex2].appendChild(imgElements[2]);
                        } else {
                            canBePlaced = false;
                        }
                    } else if (imgElements.length === 2) {
                        if (spaces[nextIndex1] && !spaces[nextIndex1].hasChildNodes()) {
                            // append the piece to both spaces
                            event.target.appendChild(imgElements[0]);
                            spaces[nextIndex1].appendChild(imgElements[1]);
                        } else {
                            canBePlaced = false;
                        }
                    } else {
                        // append the piece to the current space
                        event.target.appendChild(imgElements[0]);
                    }

                    if (canBePlaced) {
                        checkWin();
                    }
                }
            }

            draggedPiece = null; // add this line to reset the value of draggedPiece
        });
    });


    let hasWon = false;

    function checkWin() {
        const piece1 = document.querySelector('#piece-1');
        const piece2 = document.querySelector('#piece-2');
        const piece3 = document.querySelector('#piece-3');
        const piece4 = document.querySelector('#piece-4');
        const bord2 = document.querySelector('#bord-2');
        const bord9 = document.querySelector('#bord-9');
        const bord12 = document.querySelector('#bord-12');
        const bord15 = document.querySelector('#bord-15');

        if (bord2.contains(piece1) && bord9.contains(piece2) && bord12.contains(piece4) && bord15.contains(piece3)) {
            if (!hasWon) {
                alert('Gefeliciteerd, je hebt gewonnen!');
                hasWon = true;
            }
        }
    }
})();