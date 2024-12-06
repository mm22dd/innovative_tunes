import React, {useEffect, useState} from "react";
import App from "./App";
import "./Style3.css"
import "./Style2.css"
import "./Style1.css"
import "./Popup.css"
import Popup from "./Popup";
import axios from "axios";

//creation of main menu component
function MainMenu(props) {
  //started state to change render to App after play is hit
  const [started, setStarted] = useState(false)
  const [style, setStyle] = useState(props.style)
  const [artistList, setArtistList] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false)
  const [playerName, setPlayerName] = useState("")

  function updatePlayerName(e){
    if(e.target.value != "")
      setPlayerName(e.target.value)
    else
      setStarted(false)
  }

  function handleClick() {
    getJSON().then(response => setArtistList(response.ID))
    setStarted(true)
    getJSON().then(response => setArtistList(response.ID))
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

  useEffect(() => {
    if (props.style === undefined){
      setStyle(1)
    }
    return
  }, []);
  let text, logoImage, titleImage, bodyStyle, headerStyle, centerStyle, footerStyle, buttonStyle, logoStyle, titleStyle, appContainer, popup, guessStyle
  popup = "popup"
  if (style === 1) {
    text = "Guess the artist!"
    logoImage = require("./images/temp_logo_1.png")
    titleImage = require("./images/title_logo_1.png")
    bodyStyle = "body-style1"
    buttonStyle = "button-style1"
    headerStyle = "header-style1"
    centerStyle = "center-style1"
    logoStyle = "logo-style1"
    titleStyle = "titlelogo-style1"
    footerStyle = "footer-style1"
    appContainer = "app_container_1"
    guessStyle = "guess_style_1"
  } else if (style === 2) {
    text = "Guess the artist!"
    logoImage = require("./images/temp_logo_2.png")
    titleImage = require("./images/title_logo_2.png")
    bodyStyle = "body-style2"
    buttonStyle = "button-style2"
    headerStyle = "header-style2"
    centerStyle = "center-style2"
    logoStyle = "logo-style2"
    titleStyle = "titlelogo-style2"
    footerStyle = "footer-style2"
    appContainer = "app_container_2"
    guessStyle = "guess_style_2"
  } else if (style === 3) {
    text = "曲を推測します~!"
    logoImage = require("./images/temp_logo_3.png")
    titleImage = require("./images/title_logo_3.png")
    bodyStyle = "body-style3"
    buttonStyle = "button-style3"
    headerStyle = "header-style3"
    centerStyle = "center-style3"
    logoStyle = "logo-style3"
    titleStyle = "titlelogo-style3"
    footerStyle = "footer-style3"
    appContainer = "app_container_3"
    guessStyle = "guess_style_3"
  }
  if (started) {
    return (<App styleNumber={style} artistList = {artistList} playerName = {playerName}/>)
  } else {
    //displays the contents of MainMenu3.html with some syntax tweaks to make it compatible with react
    return (
      <div className={appContainer}>
      <body className={bodyStyle}>

      <header className={headerStyle}>
        <img src={titleImage} alt="titlelogo" className={titleStyle}></img>
      </header>

      <img src={logoImage} alt="Game Logo" className={logoStyle}></img>

      <h1 className={centerStyle}>{text}</h1>

      <div class = "container">
          <form className={centerStyle} style={{ marginTop: '20px' }} onSubmit={handleClick}>
            <label>
              <input name="player" placeholder='Player name' value={playerName} onChange={updatePlayerName} autoComplete="off"/>
            </label>
            <button type="submit" className={guessStyle}>Play Endless</button>
          </form>
      </div>

      <div className={centerStyle}>
        <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
      </div>


      <div className={centerStyle}>
        <button className={buttonStyle} onClick={() => setButtonPopup(true)}>Credits</button>

        <Popup className={popup} trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h2>Credits</h2>
          <p>Front End: Miguel Machado, Jonathan Whelan</p>
          <p>Back End: Joseph Bustamante, Adam Crump, Andrew Mack</p>
          <button className={buttonStyle} onClick={() => setButtonPopup(false)}>Close</button>
        </Popup>
      </div>


      <footer className={footerStyle}>
        © 2024 Artificial Innovators
      </footer>
      </body>
      </div>
    )
  }
}
//function to read the json file
async function getJSON() {
  let list
  const response = await axios.get("topArtists.json").then
  ((Response) => list = Response.data).catch(err => console.log(err))
  return response
}

export default MainMenu