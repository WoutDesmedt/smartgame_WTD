// controllers/reviewController.js

import {getReviews, getReview, createReview} from '../db.js';

export async function getAllReviews(req, res) {
    const sortBy = req.query.sortBy; // Get the sort parameter from the query string
    let reviews = await getReviews();

    if (sortBy === 'score') {
        reviews.sort((a, b) => b.score - a.score); // Sort reviews by score in descending order
    } else if (sortBy === 'date') {
        reviews.sort((a, b) => new Date(b.review) - new Date(a.review)); // Sort reviews by date in descending order
    }
    else if(sortBy === ''){
        res.status(200).send(reviews);
    }

    res.status(200).send(reviews);
}

export async function getSingleReview(req, res) {
    const id = +req.params.id;
    const note = await getReview(id);

    if (note) {
        res.status(200).send(note);
    } else {
        res.status(404).send({ error: 'Review not found' });
    }
}

export async function postAReview(req, res) {
    const {fname, name, email, message, score} = req.body
    const review = await createReview(fname, name, email, message, score);
    res.status(201).send(review)
}



