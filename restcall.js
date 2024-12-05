import express from 'express';

import { getHighScores, getScore, insertScore } from './database.js';

const restfunc = express()

restfunc.use(express.json())

restfunc.get("/highscores", async (req, res) => {
    const highscores = await getHighScores()
    res.send(highscores)
})

restfunc.get("/score/:id", async (req, res) => {
    const id = req.params.id
    const score = await getScore(id)
    res.send(score)
})

restfunc.post("/score", async (req, res) => {
    const {player_name, score} = req.body
    const player_score = await insertScore(player_name, score)
    res.status(201).send(player_score)
})

restfunc.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something Broke!')
})

restfunc.listen(8080, () => {
  console.log('Server is running on port 8080')
})