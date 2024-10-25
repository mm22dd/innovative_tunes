import './App.css';
import './Style3.css'
import './Game_style.css'
import axios from "axios";
import React, {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

function App(){
  //function that is called when the user hits new game
  function loadTopTracks(){
    getAuthKey().then(response => setToken(response.access_token))
    let i = (Math.floor(Math.random()*100))
    getTopSongs(artistList[i], token).then(response => setTracks(response))
  }
  //state variables that when changed will trigger the page to reload with the new values
  const [artistList, setArtistList] = useState([])
  const [token, setToken] = useState("")
  const [topTracks, setTracks] = useState([])
  const [newGame, setNewGame] = useState(false)
  //default content shown if nothing loads
  let content = <h1>Error</h1>
  //calls function when newGame is changed
  useEffect(() => {
    loadTopTracks()
  }, [newGame]);
  //load the artist list might offload this to mainmenu component so it loads when start is pressed and then variable is
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
    content = (<div className="body">
      <div className="body">
        <Table trackNames={topTracks.tracks} />
      </div>
      <button className="button" onClick={() => setNewGame(!newGame)}>New Game</button>
    </div>)
  }
  //return the content
  return(
    <div>
      {content}
      <footer className="footer">
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
function Table({trackNames}){
  return (
    <div className="body">
      <header className="header">
        <img src={require("./images/title_logo_3.png")} alt="titlelogo" className="titlelogo"/>
      </header>
      <h1>{trackNames[0].artists[0].name}</h1>
      <div className="hearts">
        <img id="heart1" className="heart" src={require("./images/full_heart.png")} alt="Heart 1"/>
        <img id="heart2" className="heart" src={require("./images/full_heart.png")} alt="Heart 2"/>
        <img id="heart3" className="heart" src={require("./images/full_heart.png")} alt="Heart 3"/>
      </div>

      <table className="table">
        <tbody className="tbody">
        <tr>
          <td>{trackNames[0].name}</td>
          <td>{trackNames[1].name}</td>
        </tr>
        <tr>
          <td>{trackNames[2].name}</td>
          <td>{trackNames[3].name}</td>
        </tr>
        <tr>
          <td>{trackNames[4].name}</td>
          <td>{trackNames[5].name}</td>
        </tr>
        <tr>
          <td>{trackNames[6].name}</td>
          <td>{trackNames[7].name}</td>
        </tr>
        <tr>
          <td>{trackNames[8].name}</td>
          <td>{trackNames[9].name}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App;