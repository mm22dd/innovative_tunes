import mysql from 'mysql2';


//create database connection
const pool = mysql.createPool ({
    host: process.env.host,
    user: 'root',
    password: 'Butter12!',
    database: 'innovative_tunes'
}).promise();


//query to return the user's placement
export async function getUserPlacement(score) {
    const [rows] = await pool.query(`
        SELECT *, ROW_NUMBER() OVER(ORDER BY score desc) as 'rank' 
        FROM high_scores
        WHERE score >= ?
        `, [score]);
    
    return rows[rows.length - 1].rank + 1;
};

//query to insert new score at the end of a game
export async function insertScore(player_name, score) {
    const [result] = await pool.query(`
        INSERT INTO high_scores (player_name, score)
        VALUES (?,?)
        `, [player_name, score]);
    const id = result.insertId;
    return getScore(id);
};

export async function getScore(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM high_scores
        WHERE id = ?
        `, [id]);
        return rows[0];
};

//query to return high scores
export async function getHighScores() {
    const [rows] = await pool.query(`
        SELECT *, ROW_NUMBER() OVER(ORDER BY score desc) as 'rank' 
        FROM high_scores
        `);
    return rows;
}



const rank = await getUserPlacement(3)
console.log(rank)