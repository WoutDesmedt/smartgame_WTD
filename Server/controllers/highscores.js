// controllers/highscoreController.js

import {setHighscore, getHighscores} from '../db.js';

export async function getAllHighscores(req, res) {
    let idlevel = req.query.idlevel; // Extract the idlevel from the query parameter

    let highscores = await getHighscores(idlevel);

    res.status(200).send(highscores);
}

export async function setAHighscore(req, res) {
    const {idlevel, naam, tijd} = req.body
    const highscore = await setHighscore(idlevel, naam, tijd);
    res.status(201).send(highscore)
}



