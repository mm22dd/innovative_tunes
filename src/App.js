import './App.css';
import './Style3.css'
import './Game_style.css'
import axios from "axios";
import React, {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

function App(props){
  //function that is called when the user hits new game
  function loadTopTracks(){
    getAuthKey().then(response => setToken(response.access_token))
    let i = (Math.floor(Math.random()*100))
    getTopSongs(props.artistList[i], token).then(response => setTracks(response))
    setNumGuess(1)
  }
  function changeStyle(){
    if (style === 1) {
      setStyle(2)
    } else {
      setStyle(1)
    }
  }

  //state variables that when changed will trigger the page to reload with the new values
  const [token, setToken] = useState("")
  const [topTracks, setTracks] = useState([])
  const [newGame, setNewGame] = useState(false)
  const [style, setStyle] = useState(1)
  const [guess, setGuess] = useState("")
  const [numGuess, setNumGuess] = useState(1)
  function handleGuess(e){
    e.preventDefault()
    const form = e.target
    let formData = new FormData(form)
    let formObject = Object.fromEntries(formData.entries())
    setGuess(formObject.guess)
    setNumGuess(numGuess+1)
  }
  let text, logoImage, titleImage, bodyStyle, headerStyle, centerStyle, footerStyle, buttonStyle, logoStyle, titleStyle
  if (style === 1) {
    text = "Guess the song!"
    logoImage = require("./images/temp_logo_3.png")
    titleImage = require("./images/title_logo_3.png")
    bodyStyle = "body-style1"
    buttonStyle = "button-style1"
    headerStyle = "header-style1"
    centerStyle = "center-style1"
    logoStyle = "logo-style1"
    titleStyle = "titlelogo-style1"
    footerStyle = "footer-style1"
  } else if (style === 2) {
    text = "曲を推測します~!"
    logoImage = require("./images/temp_logo_3.png")
    titleImage = require("./images/title_logo_3.png")
    bodyStyle = "body-style3"
    buttonStyle = "button-style3"
    headerStyle = "header-style3"
    centerStyle = "center-style3"
    logoStyle = "logo-style1"
    titleStyle = "titlelogo-style3"
    footerStyle = "footer-style3"
  }
  //default content shown if nothing loads
  let content = <h1>Error</h1>
  //calls function when newGame is changed
  useEffect(() => {
    loadTopTracks()
  }, [newGame]);
  //get token to start
  if(token === ""){
    getAuthKey().then(response => setToken(response.access_token))
    return
  }
  //call the api and then load the top 10 songs into the state variable
  else if(topTracks === undefined){
    let i = (Math.floor(Math.random()*100))
    getTopSongs(props.artistList[i], token).then(response => setTracks(response))
    return
  }
  //once all data is loaded in start to show the data
  else{
    console.log(guess)
    console.log(topTracks.tracks[0].artists[0].name)
    if (guess === topTracks.tracks[0].artists[0].name){
      content = (<div className={bodyStyle}>
        <div className={bodyStyle}>
          <WinScreen trackNames={topTracks.tracks} styleNumber={style}/>
        </div>
        <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
        <button className={buttonStyle} onClick={() => setNewGame(!newGame)}>New Game</button>
      </div>)
    }
    else if (numGuess <= 5){
      content = (<div className={bodyStyle}>
        <div className={bodyStyle}>
          <Table trackNames={topTracks.tracks} styleNumber={style} numGuess = {numGuess} guess = {guess}/>
        </div>
        <form className={centerStyle} onSubmit={handleGuess}>
          <label>
            <input name="guess"/>
          </label>
          <button type="submit">Submit</button>
        </form>
        <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
        <button className={buttonStyle} onClick={() => setNewGame(!newGame)}>New Game</button>
      </div>)
    }
    else{
      content = (<div className={bodyStyle}>
        <div className={bodyStyle}>
          <FailScreen trackNames={topTracks.tracks} styleNumber={style}/>
        </div>
        <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
        <button className={buttonStyle} onClick={() => setNewGame(!newGame)}>New Game</button>
      </div>)
    }
  }
  //return the content
  return (
    <div>
      {content}
      <footer className={footerStyle}>
        © 2024 Artificial Innovators
      </footer>
    </div>
  )
}

//function for getting a token from the spotify API
async function getAuthKey() {
  let token
  const response = await axios.post("https://accounts.spotify.com/api/token",
    {
      client_id: "a81e6bf18f234db29ccf41331f039e9c",
      client_secret: "cf99a5819d714dcab87e0bbf8abe09c3",
      grant_type: "client_credentials"
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  ).then((Response) => token = Response.data).catch(err => console.log(err))
  return token
}

//function to call the spotify API to get the top 10 songs
function getTopSongs(artistID, token){
  let tracks
  console.log(artistID)
  console.log(token)
    const response = axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`,
      {headers: {"Authorization": `Bearer ${token}`}}).then((Response) => tracks = Response.data).catch(err => console.log(err))
  console.log(response)
    return response
}

function Table(props){
  let titleImage, bodyStyle, headerStyle, titleStyle, tableStyle, rowStyle, columnStyle, displayStyle, heartStyle, emptyHeartStyle
  let heart1, heart2, heart3, heart4, heart5
  let artistName = (<h1>____________</h1>)
  if (props.styleNumber === 1) {
    titleImage = require("./images/title_logo_1.png")
    bodyStyle = "body-style1"
    headerStyle = "header-style1"
    titleStyle = "titlelogo-style1"
    tableStyle = "table-style1"
    rowStyle = "row-style1"
    columnStyle = "column-style1"
    displayStyle = "itemDisplayed-1"
    heartStyle = require("./images/full_heart_1.png")
    emptyHeartStyle = require("./images/empty_heart_1.png")
  } else if (props.styleNumber === 2) {
    titleImage = require("./images/title_logo_3.png")
    bodyStyle = "body-style3"
    headerStyle = "header-style3"
    titleStyle = "titlelogo-style3"
    tableStyle = "table-style3"
    rowStyle = "row-style3"
    columnStyle = "column-style3"
    displayStyle = "itemDisplayed-3"
    heartStyle = require("./images/full_heart_3.png")
    emptyHeartStyle = require("./images/empty_heart_3.png")
  }
  let rowOne = (<tr className={rowStyle}>
    <td className={columnStyle}>____________</td>
    <td className={columnStyle}>____________</td>
  </tr>)
  let rowTwo = (<tr className={rowStyle}>
    <td className={columnStyle}>____________</td>
    <td className={columnStyle}>____________</td>
  </tr>)
  let rowThree = (<tr className={rowStyle}>
    <td className={columnStyle}>____________</td>
    <td className={columnStyle}>____________</td>
  </tr>)
  let rowFour = (<tr className={rowStyle}>
    <td className={columnStyle}>____________</td>
    <td className={columnStyle}>____________</td>
  </tr>)
  let rowFive
    if (props.numGuess === 1){
      heart1 = heartStyle
      heart2 = heartStyle
      heart3 = heartStyle
      heart4 = heartStyle
      heart5 = heartStyle
      rowFive = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[8].name}</td>
        <td className={displayStyle}>{props.trackNames[9].name}</td>
      </tr>)
    }
    else if(props.numGuess === 2){
      heart1 = emptyHeartStyle
      heart2 = heartStyle
      heart3 = heartStyle
      heart4 = heartStyle
      heart5 = heartStyle
      rowFive = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[8].name}</td>
        <td className={displayStyle}>{props.trackNames[9].name}</td>
      </tr>)
      rowFour = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[6].name}</td>
        <td className={displayStyle}>{props.trackNames[7].name}</td>
      </tr>)
    }
    else if(props.numGuess === 3){
      heart1 = emptyHeartStyle
      heart2 = emptyHeartStyle
      heart3 = heartStyle
      heart4 = heartStyle
      heart5 = heartStyle
      rowFive = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[8].name}</td>
        <td className={displayStyle}>{props.trackNames[9].name}</td>
      </tr>)
      rowFour = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[6].name}</td>
        <td className={displayStyle}>{props.trackNames[7].name}</td>
      </tr>)
      rowThree = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[4].name}</td>
        <td className={displayStyle}>{props.trackNames[5].name}</td>
      </tr>)

    }
    else if(props.numGuess === 4){
      heart1 = emptyHeartStyle
      heart2 = emptyHeartStyle
      heart3 = emptyHeartStyle
      heart4 = heartStyle
      heart5 = heartStyle
      rowFive = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[8].name}</td>
        <td className={displayStyle}>{props.trackNames[9].name}</td>
      </tr>)
      rowFour = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[6].name}</td>
        <td className={displayStyle}>{props.trackNames[7].name}</td>
      </tr>)
      rowThree = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[4].name}</td>
        <td className={displayStyle}>{props.trackNames[5].name}</td>
      </tr>)
      rowTwo = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[2].name}</td>
        <td className={displayStyle}>{props.trackNames[3].name}</td>
      </tr>)
    }
    else if(props.numGuess === 5){
      heart1 = emptyHeartStyle
      heart2 = emptyHeartStyle
      heart3 = emptyHeartStyle
      heart4 = emptyHeartStyle
      heart5 = heartStyle
      rowFive = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[8].name}</td>
        <td className={displayStyle}>{props.trackNames[9].name}</td>
      </tr>)
      rowFour = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[6].name}</td>
        <td className={displayStyle}>{props.trackNames[7].name}</td>
      </tr>)
      rowThree = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[4].name}</td>
        <td className={displayStyle}>{props.trackNames[5].name}</td>
      </tr>)
      rowTwo = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[2].name}</td>
        <td className={displayStyle}>{props.trackNames[3].name}</td>
      </tr>)
      rowOne = (<tr className={displayStyle}>
        <td className={displayStyle}>{props.trackNames[0].name}</td>
        <td className={displayStyle}>{props.trackNames[1].name}</td>
      </tr>)
    }
  return (
    <div className={bodyStyle}>
      <header className={headerStyle}>
        <img src={titleImage} alt="titlelogo" className={titleStyle}/>
      </header>
      <h1>{artistName}</h1>
      <div className="hearts">
        <img id="heart1" className="heart" src={heart1} alt="Heart 1"/>
        <img id="heart2" className="heart" src={heart2} alt="Heart 2"/>
        <img id="heart3" className="heart" src={heart3} alt="Heart 3"/>
        <img id="heart4" className="heart" src={heart4} alt="Heart 4"/>
        <img id="heart5" className="heart" src={heart5} alt="Heart 5"/>
      </div>

      <table className={tableStyle}>
        <tbody>
        {rowOne}
        {rowTwo}
        {rowThree}
        {rowFour}
        {rowFive}
        </tbody>
      </table>
    </div>
  )
}

function WinScreen(props){
  return (
    <div>
      <h1>You Win!</h1>
    </div>
  )
}
function FailScreen(props){
  return (
    <div>
      <h1>You Failed the Artist was {props.trackNames[0].artists[0].name}</h1>
    </div>
  )
}
export default App;