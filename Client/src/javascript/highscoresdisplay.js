
(function () {


    document.addEventListener('DOMContentLoaded', function() {
        const highscoresContainer = document.querySelector('.highscorecontainer');
        highscoresContainer.innerHTML = '';
        let levelNummer = localStorage.getItem('levelNummer');

        fetch(`http://localhost:3000/api/v1/highscores?idlevel=${levelNummer}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                for(let i = 0; i <= data.length; i++){
                    let naam = data[i].naam
                    let tijd = data[i].tijd
                    highscoresContainer.innerHTML += `<li>${naam} - ${tijd}s</li>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });



})();