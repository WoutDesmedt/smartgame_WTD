// routers/reviewRouter.js

import express from 'express';
import { getAllHighscores, setAHighscore } from '../controllers/highscores.js';


const highscoreRouter = express.Router();


highscoreRouter.route('/')
    .get(getAllHighscores)
    .post(setAHighscore)

export default highscoreRouter;