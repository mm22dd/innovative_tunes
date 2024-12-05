import axios from "axios";
import { response } from "express";

function getHighScores() {

    let scores
    const response = axios.get('http://localhost:8080/highscores').then((Response) => scores = Response.data).catch(err => console.log(err))
    return response
  }
  

console.log(getHighScores())

