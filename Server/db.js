// db.js

import mysql from 'mysql2';

// Create a connection pool
export const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'express',
    password: 'Azerty123',
    database: 'smartgame',
}).promise();

export async function getReviews(){
    const [rows] = await pool.query(`SELECT * FROM reviews`)
    return rows;
}

export async function getReview(id){
    const [rows] = await pool.query(`SELECT * FROM reviews WHERE idreviews = ?`, [id])
    return rows
}

export async function createReview(fname, name, email, message, score) {
    const result = await pool.query(`
    INSERT INTO reviews (firstname, name, email, message, score, time) VALUES (?,?,?,?,?,?)`,
        [fname, name, email, message, score, new Date().toISOString().slice(0,19).replace('T', ' ')])
    return result[0]
}

export async function setHighscore(idlevel, naam, tijd){
    const result = await pool.query(`
    INSERT INTO highscores(idlevel, naam, tijd) VALUES (?,?,?)`,
        [idlevel, naam, tijd])
    return result[0]
}

export async function getHighscores(idlevel) {
    const [rows] = await pool.query(`
        SELECT *
        FROM highscores
        WHERE idlevel = ?
        ORDER BY tijd ASC
        LIMIT 3
    `, [idlevel]);

    return rows;
}
