const sortByScoreBtn = document.querySelector('.sortingbuttons #sortByScoreBtn');
const sortByDateBtn = document.querySelector('.sortingbuttons #sortByDateBtn');


sortByScoreBtn.addEventListener('click', () => {
    fetchReviews('score');
});

sortByDateBtn.addEventListener('click', () => {
    fetchReviews('date');
});

function fetchReviews(sortBy) {
    fetch(`http://localhost:3000/api/v1/reviews?sortBy=${sortBy}`)
        .then(response => response.json())
        .then(data => {
            let reviewContainer = document.querySelector(".reviews");
            reviewContainer.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                const reviewFirstNaam = data[i].firstname;
                const reviewNaam = data[i].name;
                const reviewMessage = data[i].message;
                const reviewScore = data[i].score;
                const reviewTime = data[i].time;

                let starsHTML = '';
                const numYellowStars = Math.min(reviewScore, 5);

                for (let j = 0; j < 5; j++) {
                    const starClass = j < numYellowStars ? 'yellowstar' : '';
                    starsHTML += `<span class="fa fa-star ${starClass}"></span>`;
                }

                reviewContainer.innerHTML += `<div class="review">
                                      <div class="score">
                                        ${starsHTML}
                                      </div>
                                      <h3>${reviewFirstNaam} ${reviewNaam}</h3>
                                      <p>${reviewMessage}</p>
                                      <p>${reviewTime}</p>
                                    </div>`;
            }
        })
        .catch(error => {
            console.error('Error fetching row:', error);
        });
}

fetchReviews();


