import './App.css';
import './Style3.css'
import './Game_style.css'
import axios from "axios";
import React, {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

function App({prop}){
  //function that is called when the user hits new game
  function loadTopTracks(){
    getAuthKey().then(response => setToken(response.access_token))
    let i = (Math.floor(Math.random()*100))
    getTopSongs(artistList[i], token).then(response => setTracks(response))
  }
  function changeStyle(){
    if (style === 1) {
      setStyle(2)
    } else {
      setStyle(1)
    }
  }
  //state variables that when changed will trigger the page to reload with the new values
  const [artistList, setArtistList] = useState([])
  const [token, setToken] = useState("")
  const [topTracks, setTracks] = useState([])
  const [newGame, setNewGame] = useState(false)
  const [style, setStyle] = useState(prop)
  //default content shown if nothing loads
  let content = <h1>Error</h1>
  //calls function when newGame is changed
  useEffect(() => {
    loadTopTracks()
  }, [newGame]);
  let logoImage
  let titleImage
  let bodyStyle
  let headerStyle
  let centerStyle
  let footerStyle
  let buttonStyle
  let logoStyle
  let titleStyle
  if (style === 1) {
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
  //load the artist list might offload this to main menu component, so it loads when start is pressed and then variable is
  //passed into this component
  if (artistList.length === 0){
    getJSON().then(response => setArtistList(response.ID))
    return
  }
  //get token to start
  else if(token === ""){
    getAuthKey().then(response => setToken(response.access_token))
    return
  }
  //call the api and then load the top 10 songs into the state variable
  else if(topTracks === undefined){
    let i = (Math.floor(Math.random()*100))
    getTopSongs(artistList[i], token).then(response => setTracks(response))
    return
  }
  //once all data is loaded in start to show the data
  else{
    //frontend can change things here like normal html and the results will show up
    //this calls to another react component called table which is html with toptracks loaded into it
    content = (<div className={bodyStyle}>
      <div className={bodyStyle}>
        <Table trackNames={topTracks.tracks} styleNumber={style} />
      </div>
      <button className={buttonStyle} onClick={() => setNewGame(!newGame)}>New Game</button>
      <button className={buttonStyle} onClick={changeStyle}>Change Style</button>
    </div>)
  }
  //return the content
  return(
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
//function to read the json file
async function getJSON() {
  let list
  const response = await axios.get("topArtists.json").then
  ((Response) => list = Response.data).catch(err => console.log(err))
  return response
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
//react component that loads a table with the top 10 songs very temporary needs a lot of work
function Table(props){
  let logoImage
  let titleImage
  let bodyStyle
  let headerStyle
  let centerStyle
  let footerStyle
  let buttonStyle
  let logoStyle
  let titleStyle
  if (props.styleNumber === 1) {
    logoImage = require("./images/temp_logo_1.png")
    titleImage = require("./images/title_logo_1.png")
    bodyStyle = "body-style1"
    buttonStyle = "button-style1"
    headerStyle = "header-style1"
    centerStyle = "center-style1"
    logoStyle = "logo-style1"
    titleStyle = "titlelogo-style1"
    footerStyle = "footer-style1"
  } else if (props.styleNumber === 2) {
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
  return (
    <div className={bodyStyle}>
      <header className={headerStyle}>
        <img src={titleImage} alt="titlelogo" className={titleStyle}/>
      </header>
      <h1>{props.trackNames[0].artists[0].name}</h1>
      <div className="hearts">
        <img id="heart1" className="heart" src={require("./images/full_heart.png")} alt="Heart 1"/>
        <img id="heart2" className="heart" src={require("./images/full_heart.png")} alt="Heart 2"/>
        <img id="heart3" className="heart" src={require("./images/full_heart.png")} alt="Heart 3"/>
      </div>

      <table className="Table-Data">
        <tbody>
        <tr>
          <td>{props.trackNames[0].name}</td>
          <td>{props.trackNames[1].name}</td>
        </tr>
        <tr>
          <td>{props.trackNames[2].name}</td>
          <td>{props.trackNames[3].name}</td>
        </tr>
        <tr>
          <td>{props.trackNames[4].name}</td>
          <td>{props.trackNames[5].name}</td>
        </tr>
        <tr>
          <td>{props.trackNames[6].name}</td>
          <td>{props.trackNames[7].name}</td>
        </tr>
        <tr>
          <td>{props.trackNames[8].name}</td>
          <td>{props.trackNames[9].name}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App;