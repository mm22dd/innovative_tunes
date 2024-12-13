import axios from "axios";
import React, {useEffect, useState} from "react";
import { response } from "express";

function TestFunc() {

    const [highScores, setHighScores] = useState([])
    highScores = getHighScores().then(Response => setHighScores(Response)).catch(err => console.log(err))
    console.log(highScores)

}


let scores, testdata

async function getHighScores() {

    

    const response = await axios.get('http://localhost:8080/highscores')
    console.log(scores)
    console.log(response)
    return response
  }
  

//console.log(getHighScores())

export default TestFunc