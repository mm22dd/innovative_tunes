import './App.css';
import './Style3.css'
import './Style1.css'
import './Game_style.css'
import axios from "axios";
import MainMenu from "./MainMenu";
import React, {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";



function App(props){
  //state variables that when changed will trigger the page to reload with the new values
  const [token, setToken] = useState("start")
  const [topTracks, setTracks] = useState([])
  const [newGame, setNewGame] = useState(false)
  const [style, setStyle] = useState(props.styleNumber)
  const [guess, setGuess] = useState("")
  const [numGuess, setNumGuess] = useState(1)
  const [txt, setTxt] = useState("")
  const [lives, setLives] = useState(5)
  const [artist, setArtist] = useState("first")
  const [score, setScore] = useState(0)
  const [quit, setQuit] = useState(false)
  const [index, setIndex] = useState(-1)

  //function that is called when the user hits new game
  function loadTopTracks(){
    getAuthKey().then(response => setToken(response.access_token))
    let i = (Math.floor(Math.random()*100))
    getTopSongs(props.artistList[i], token).then(response => setTracks(response))
    getArtist(props.artistList[i], token).then(response => setArtist(response))
    setNumGuess(1)
    setGuess("")
  }

  function changeStyle() {
    if (style === 1) {
      setStyle(2)
    } else if (style === 2) {
      setStyle(3)
    } else {
      setStyle(1)
    }
  }

  function updateTxt(e){
    setTxt(e.target.value)
  }

  function handleGuess(e){
    e.preventDefault()
    const form = e.target
    let formData = new FormData(form)
    let formObject = Object.fromEntries(formData.entries())
    setGuess(formObject.guess)
    setNumGuess(numGuess+1)
    setTxt("")
  }

  function decrementLives(){
    setLives(lives-1)
    loadTopTracks()
  }

  function fail(){
    setLives(0)
  }

  function restart(){
    setLives(5)
    loadTopTracks()
  }

  function incrementScore(){
    switch (numGuess){
      case 2:
        setScore(score+5)
        break
      case 3:
        setScore(score+4)
        break
      case 4:
        setScore(score+3)
        break
      case 5:
        setScore(score+2)
        break
      case 6:
        setScore(score+1)
        break
      default:
        setScore(score+1)
    }
    loadTopTracks()
  }

  function skipArtist(){
    setNumGuess(6)
  }

  function mainMenu(){
    setQuit(true)
  }

  useEffect(() => {
    getAuthKey().then(response => setToken(response.access_token))
    return
  }, []);
  useEffect(() => {
    let i = (Math.floor(Math.random()*100))
    setIndex(i)
    return
  }, []);
  useEffect(() => {
    getTopSongs(props.artistList[index], token).then(response => setTracks(response))
    return
  }, []);
  useEffect(() => {
    getArtist(props.artistList[index], token).then(response => setArtist(response))
    return
  }, []);
  let text, logoImage, titleImage, bodyStyle, headerStyle, centerStyle, footerStyle, buttonStyle, logoStyle, titleStyle,
    guessStyle, appContainer, heartStyle, emptyHeartStyle, vert, big, tableStyle, rowStyle, columnStyle
    vert = "vert"
    big = "bigFont"
  if (style === 1) {
    text = "Guess the song!"
    logoImage = require("./images/temp_logo_1.png")
    titleImage = require("./images/title_logo_1.png")
    bodyStyle = "body-style1"
    buttonStyle = "button-style1"
    headerStyle = "header-style1"
    centerStyle = "center-style1"
    logoStyle = "logo-style1"
    titleStyle = "titlelogo-style1"
    footerStyle = "footer-style1"
    guessStyle = "guess_style_1"
    appContainer = "app_container_1"
    heartStyle = require("./images/full_heart_1.png")
    emptyHeartStyle = require("./images/empty_heart_1.png")
    tableStyle = "table-style1"
    rowStyle = "row-style1"
    columnStyle = "column-style1"
  } else if (style === 2) {
    text = "Guess the song!"
    logoImage = require("./images/temp_logo_2.png")
    titleImage = require("./images/title_logo_2.png")
    bodyStyle = "body-style2"
    buttonStyle = "button-style2"
    headerStyle = "header-style2"
    centerStyle = "center-style2"
    logoStyle = "logo-style1"
    titleStyle = "titlelogo-style2"
    footerStyle = "footer-style2"
    guessStyle = "guess_style_2"
    appContainer = "app_container_2"
    heartStyle = require("./images/full_heart_2.png")
    emptyHeartStyle = require("./images/empty_heart_3.png")
    tableStyle = "table-style2"
    rowStyle = "row-style2"
    columnStyle = "column-style2"
  } else if (style === 3 ) {
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
    guessStyle = "guess_style_3"
    appContainer = "app_container_3"
    heartStyle = require("./images/full_heart_3.png")
    emptyHeartStyle = require("./images/empty_heart_3.png")
    tableStyle = "table-style3"
    rowStyle = "row-style3"
    columnStyle = "column-style3"
  }

  //default content shown if nothing loads
  let content = <h1>Error</h1>
  //calls function when newGame is changed
  //get token to start
  if(quit === true){
    return (<MainMenu style={style}/>)
  }
  if (token === undefined){
    getAuthKey().then(response => setToken(response.access_token))
    return (<div className={appContainer}>
      <div className="content-wrap">
        <header className={headerStyle}>
          <img src={titleImage} alt="titlelogo" className={titleStyle}/>
        </header>
        <div className={bodyStyle}>
          <h1>Loading...</h1>
          <Hearts numHearts={5} emptyHeart={emptyHeartStyle} fullHeart={heartStyle}/>
          <Loading tableStyle={tableStyle} rowStyle={rowStyle} columnStyle={columnStyle}/>
          <button className={buttonStyle} onClick={mainMenu}>Main Menu</button>
        </div>
      </div>
      <footer className={footerStyle}>
      © 2024 Artificial Innovators
      </footer>
    </div>)
  } else if (topTracks === undefined) {
    getTopSongs(props.artistList[index], token).then(response => setTracks(response))
    return (<div className={appContainer}>
      <div className="content-wrap">
        <header className={headerStyle}>
          <img src={titleImage} alt="titlelogo" className={titleStyle}/>
        </header>
        <div className={bodyStyle}>
          <h1>Loading...</h1>
          <Hearts numHearts={5} emptyHeart={emptyHeartStyle} fullHeart={heartStyle}/>
          <Loading tableStyle={tableStyle} rowStyle={rowStyle} columnStyle={columnStyle}/>
          <button className={buttonStyle} onClick={mainMenu}>Main Menu</button>
        </div>
      </div>
      <footer className={footerStyle}>
        © 2024 Artificial Innovators
      </footer>
    </div>)
  } else if (artist === undefined) {
    getArtist(props.artistList[index], token).then(response => setArtist(response))
    return (<div className={appContainer}>
      <div className="content-wrap">
        <header className={headerStyle}>
          <img src={titleImage} alt="titlelogo" className={titleStyle}/>
        </header>
        <div className={bodyStyle}>
          <h1>Loading...</h1>
          <Hearts numHearts={5} emptyHeart={emptyHeartStyle} fullHeart={heartStyle}/>
          <Loading tableStyle={tableStyle} rowStyle={rowStyle} columnStyle={columnStyle}/>
          <button className={buttonStyle} onClick={mainMenu}>Main Menu</button>
        </div>
      </div>
      <footer className={footerStyle}>
      © 2024 Artificial Innovators
      </footer>
    </div>)
  }
  //once all data is loaded in start to show the data
  else {
    try {
      if (guess.toLowerCase() === artist.name.toLowerCase()){
      }
    }catch (e) {
      return
    }
    if (guess.toLowerCase() === artist.name.toLowerCase()) {
      content =
        (<div className={bodyStyle}>
          <div>
            <header className={headerStyle}>
              <img src={titleImage} alt="titlelogo" className={titleStyle}/>
            </header>
          </div>
          <div className={bodyStyle}>
            <Hearts numHearts={lives} fullHeart={heartStyle} emptyHeart={emptyHeartStyle}/>
            <h2>Correct!</h2>
            <FullTable trackNames={topTracks.tracks} styleNumber={style} artist={artist}/>
          </div>
          <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
          <button className={buttonStyle} onClick={incrementScore}>Continue</button>
        </div>)
    } else if (numGuess <= 5) {
      content =
        (<div className={bodyStyle}>
          <div>
            <header className={headerStyle}>
              <img src={titleImage} alt="titlelogo" className={titleStyle}/>
            </header>
          </div>
          <div className={bodyStyle}>
          <Hearts numHearts={lives} fullHeart={heartStyle} emptyHeart={emptyHeartStyle}/>
          <h2>Score: {score}</h2>
          <Table trackNames={topTracks.tracks} styleNumber={style} numGuess={numGuess} guess={guess}/>
        </div>
        <div class = "container">
          <form className={centerStyle} style={{ marginTop: '20px' }} onSubmit={handleGuess}>
            <label>
              <input name="guess" placeholder='Artist name' value={txt} onChange={updateTxt} autoComplete="off"/>
            </label>
            <button type="submit" className={guessStyle}>Guess!</button>
          </form>
        </div>
        <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
        <button className={buttonStyle} onClick={skipArtist}>Skip</button>
      </div>)
    }
    else{
      if (lives > 1){
        content =
          (<div className={bodyStyle}>
            <div>
              <header className={headerStyle}>
                <img src={titleImage} alt="titlelogo" className={titleStyle}/>
              </header>
            </div>
            <div className={bodyStyle}>
              <Hearts numHearts={lives-1} fullHeart={heartStyle} emptyHeart={emptyHeartStyle}/>
              <h2>Score: {score}</h2>
              <FullTable trackNames={topTracks.tracks} styleNumber={style} artist={artist}/>
            </div>
            <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
            <button className={buttonStyle} onClick={decrementLives}>Continue</button>
          </div>)
      }
      else if(lives === 1){
        content =
          (<div className={bodyStyle}>
            <div>
              <header className={headerStyle}>
                <img src={titleImage} alt="titlelogo" className={titleStyle}/>
              </header>
            </div>
            <div className={bodyStyle}>
              <Hearts numHearts={lives-1} fullHeart={heartStyle} emptyHeart={emptyHeartStyle}/>
              <h2>Score: {score}</h2>
              <FullTable trackNames={topTracks.tracks} styleNumber={style} artist={artist}/>
            </div>
            <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
            <button className={buttonStyle} onClick={fail}>Results</button>
          </div>)
      }
      //game over section
      else{
        content = (<div className={bodyStyle}>
          <div>
              <header className={headerStyle}>
                <img src={titleImage} alt="titlelogo" className={titleStyle}/>
              </header>
          </div>
          <div className={vert}>
            <div className={bodyStyle}>
              <h1 className={big}>Game Over!</h1>
              <Leaderboard styleNumber={style}/>
              <h2>Final Score: {score}</h2>
            </div>
            <button className={buttonStyle} onClick={mainMenu}>Main Menu</button>
            <button className={buttonStyle} onClick={restart}>Try Again</button>
          </div>
        </div>)
      }
    }
  }
  //return the content
  return (
    <div className={appContainer}>
      <div className="content-wrap">
        {content}
      </div>
      <footer className={footerStyle}>
        © 2024 Artificial Innovators
      </footer>
    </div>
  );
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
//new function to get the artist name associated with ID added to fix some bugs where a feature was the artists top song
//and this would cause the problem where the artist was not correct on the backend
function getArtist(artistID, token){
  let artist
  const response = axios.get(`https://api.spotify.com/v1/artists/${artistID}`,
    {headers: {"Authorization": `Bearer ${token}`}}).then((Response) => artist = Response.data).catch(err => console.log(err))
  console.log(response)
  return response
}

//function getHighScores() {
//
//  let scores
//  const response = axios.get('http://localhost:8080/highscores').then((Response) => scores = Response.data).catch(err => console.log(err))
//  return scores
//}



//main table of the display
function Table(props){
  let titleImage, bodyStyle, headerStyle, titleStyle, tableStyle, rowStyle, columnStyle, displayStyle
  if (props.styleNumber === 1) {
    titleImage = require("./images/title_logo_1.png")
    bodyStyle = "body-style1"
    headerStyle = "header-style1"
    titleStyle = "titlelogo-style1"
    tableStyle = "table-style1"
    rowStyle = "row-style1"
    columnStyle = "column-style1"
    displayStyle = "itemDisplayed-1"
  } else if (props.styleNumber === 2) {
    titleImage = require("./images/title_logo_2.png")
    bodyStyle = "body-style2"
    headerStyle = "header-style2"
    titleStyle = "titlelogo-style2"
    tableStyle = "table-style2"
    rowStyle = "row-style2"
    columnStyle = "column-style2"
    displayStyle = "itemDisplayed-2"
  } else if (props.styleNumber === 3) {
  titleImage = require("./images/title_logo_3.png")
  bodyStyle = "body-style3"
  headerStyle = "header-style3"
  titleStyle = "titlelogo-style3"
  tableStyle = "table-style3"
  rowStyle = "row-style3"
  columnStyle = "column-style3"
  displayStyle = "itemDisplayed-3"
}
  let rowOne = (<tr className={rowStyle}>
    <td className={columnStyle}>♪</td>
    <td className={columnStyle}>♪</td>
  </tr>)
  let rowTwo = (<tr className={rowStyle}>
    <td className={columnStyle}>♪</td>
    <td className={columnStyle}>♪</td>
  </tr>)
  let rowThree = (<tr className={rowStyle}>
    <td className={columnStyle}>♪</td>
    <td className={columnStyle}>♪</td>
  </tr>)
  let rowFour = (<tr className={rowStyle}>
    <td className={columnStyle}>♪</td>
    <td className={columnStyle}>♪</td>
  </tr>)
  let rowFive
    if (props.numGuess === 1){
      try {
        rowFive = (<tr className={displayStyle}>
          <td className={displayStyle}>{props.trackNames[8].name}</td>
          <td className={displayStyle}>{props.trackNames[9].name}</td>
        </tr>)
      } catch (e){
        return
      }
    }
    else if(props.numGuess === 2){
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
      <h1>__________________</h1>
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
//new hearts function to
function Hearts(props){
  let hearts = Array(5).fill(props.emptyHeart)
  console.log(props.numHearts)
  for (let i = 0; i < props.numHearts; i++) {
    hearts[i] = props.fullHeart
  }
  return(
    <div className="hearts">
      <img className="heart" src={hearts[0]} alt="Heart 1"/>
      <img className="heart" src={hearts[1]} alt="Heart 2"/>
      <img className="heart" src={hearts[2]} alt="Heart 3"/>
      <img className="heart" src={hearts[3]} alt="Heart 4"/>
      <img className="heart" src={hearts[4]} alt="Heart 5"/>
    </div>
  )
}

//shows the full table of results with artist name showing
function FullTable(props) {
  let titleImage, bodyStyle, headerStyle, titleStyle, tableStyle, rowStyle, columnStyle, displayStyle
  if (props.styleNumber === 1) {
    titleImage = require("./images/title_logo_1.png")
    bodyStyle = "body-style1"
    headerStyle = "header-style1"
    titleStyle = "titlelogo-style1"
    tableStyle = "table-style1"
    rowStyle = "row-style1"
    columnStyle = "column-style1"
    displayStyle = "itemDisplayed-1"
  } else if (props.styleNumber === 2) {
    titleImage = require("./images/title_logo_2.png")
    bodyStyle = "body-style2"
    headerStyle = "header-style2"
    titleStyle = "titlelogo-style2"
    tableStyle = "table-style2"
    rowStyle = "row-style2"
    columnStyle = "column-style2"
    displayStyle = "itemDisplayed-2"
  } else if (props.styleNumber === 3) {
    titleImage = require("./images/title_logo_3.png")
    bodyStyle = "body-style3"
    headerStyle = "header-style3"
    titleStyle = "titlelogo-style3"
    tableStyle = "table-style3"
    rowStyle = "row-style3"
    columnStyle = "column-style3"
    displayStyle = "itemDisplayed-3"
  }
  return (
    <div className={bodyStyle}>
      <h1>{props.artist.name}</h1>
      <table className={tableStyle}>
        <tbody>
        <tr className={displayStyle}>
          <td className={displayStyle}>{props.trackNames[0].name}</td>
          <td className={displayStyle}>{props.trackNames[1].name}</td>
        </tr>
        <tr className={displayStyle}>
          <td className={displayStyle}>{props.trackNames[2].name}</td>
          <td className={displayStyle}>{props.trackNames[3].name}</td>
        </tr>
        <tr className={displayStyle}>
          <td className={displayStyle}>{props.trackNames[4].name}</td>
          <td className={displayStyle}>{props.trackNames[5].name}</td>
        </tr>
        <tr className={displayStyle}>
          <td className={displayStyle}>{props.trackNames[6].name}</td>
          <td className={displayStyle}>{props.trackNames[7].name}</td>
        </tr>
        <tr className={displayStyle}>
          <td className={displayStyle}>{props.trackNames[8].name}</td>
          <td className={displayStyle}>{props.trackNames[9].name}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
function Loading(props){
  return (
    <table className={props.tableStyle}>
      <tbody>
      <tr className={props.rowStyle}>
        <td className={props.columnStyle}>♪</td>
        <td className={props.columnStyle}>♪</td>
      </tr>
      <tr className={props.rowStyle}>
        <td className={props.columnStyle}>♪</td>
        <td className={props.columnStyle}>♪</td>
      </tr>
      <tr className={props.rowStyle}>
        <td className={props.columnStyle}>♪</td>
        <td className={props.columnStyle}>♪</td>
      </tr>
      <tr className={props.rowStyle}>
        <td className={props.columnStyle}>♪</td>
        <td className={props.columnStyle}>♪</td>
      </tr>
      <tr className={props.rowStyle}>
        <td className={props.columnStyle}>♪</td>
        <td className={props.columnStyle}>♪</td>
      </tr>
      </tbody>
    </table>
  )
}

function Leaderboard(props){
  let titleImage, bodyStyle, headerStyle, titleStyle, tableStyle, rowStyle, columnStyle, displayStyle, tableHeaderStyle
  //const [scores, setScores] = useState("first")

  if (props.styleNumber === 1) {
    titleImage = require("./images/title_logo_1.png")
    bodyStyle = "body-style1"
    headerStyle = "header-style1"
    titleStyle = "titlelogo-style1"
    tableStyle = "table-style1"
    rowStyle = "row-style1"
    columnStyle = "column-style1"
    displayStyle = "itemDisplayed-1"
    tableHeaderStyle = "table-head1"
  } else if (props.styleNumber === 2) {
    titleImage = require("./images/title_logo_2.png")
    bodyStyle = "body-style2"
    headerStyle = "header-style2"
    titleStyle = "titlelogo-style2"
    tableStyle = "table-style2"
    rowStyle = "row-style2"
    columnStyle = "column-style2"
    displayStyle = "itemDisplayed-2"
    tableHeaderStyle = "table-head2"
  } else if (props.styleNumber === 3) {
  titleImage = require("./images/title_logo_3.png")
  bodyStyle = "body-style3"
  headerStyle = "header-style3"
  titleStyle = "titlelogo-style3"
  tableStyle = "table-style3"
  rowStyle = "row-style3"
  columnStyle = "column-style3"
  displayStyle = "itemDisplayed-3"
  tableHeaderStyle = "table-head3"
  }




//getHighScores().then(response => scores)
//console.log(highscores)

//let list
//const response = await axios.get("http://localhost:8080/highscores").then
//((Response) => list = Response.data).catch(err => console.log(err))



let rowOne = (<tr className={tableHeaderStyle}>
  <td >Rank</td>
  <td >Player</td>
  <td >Score</td>
</tr>)
let rowTwo = (<tr className={rowStyle}>
  <td className={columnStyle}>1</td>
  <td className={columnStyle}>first</td>
  <td className={columnStyle}>300</td>
</tr>)
let rowThree = (<tr className={rowStyle}>
  <td className={columnStyle}>2</td>
  <td className={columnStyle}>Second</td>
  <td className={columnStyle}>50</td>
</tr>)
let rowFour = (<tr className={rowStyle}>
  <td className={columnStyle}>3</td>
  <td className={columnStyle}>Third</td>
  <td className={columnStyle}>25</td>
</tr>
)
let rowFive = (<tr className={rowStyle}>
  <td className={displayStyle}>999</td>
  <td className={displayStyle}>Player</td>
  <td className={displayStyle}>5</td>
</tr>)
  return (
    <div className={bodyStyle}>
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
export default App;