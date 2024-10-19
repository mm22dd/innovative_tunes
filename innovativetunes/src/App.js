import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

function App() {

  const [token, setToken] = useState("")
  const [artistList, setArtistList] = useState([])
  const [index, setIndex] = useState(-1)
  const [topTracks, setTracks] = useState([])
  let content = <h1>Error</h1>

  function loadTopTracks(){
    console.log("please rerender")
    console.log(topTracks)
    let i = (Math.floor(Math.random()*100))
    getTopSongs(artistList[i], token).then(response => setTracks(response))
    console.log(topTracks)
  }

  if (token === ""){
    console.log("Getting Token")
    content = <h1>Getting Token</h1>
    getAuthKey().then(response => setToken(response.access_token))
  }
  else if (artistList.length === 0){
    console.log("Getting Artist ID's")
    content = <h1>Getting Artist ID's</h1>
    getJSON().then(response => setArtistList(response.ID))
    console.log(artistList)
  }
  else if( index === -1){
    console.log("Generating Random Number")
    content = <h1>Generating Random Number</h1>
    setIndex(Math.floor(Math.random()*100))
  }
  else if ((topTracks === undefined) || (topTracks.length === 0)){
    console.log("Calling Spotify API")
    content = <h1>Calling Spotify API</h1>
    getTopSongs(artistList[index], token).then(response => setTracks(response))
  }
  else {
    let topNames = [""]
    for (let i = 0; i < 10; i++) {
      topNames[i] = topTracks.tracks[i].name
    }
    content = <div>
      <Header artist={topTracks.tracks[0].artists[0].name} />
      <Table trackNames={topNames} />
      <button onClick={loadTopTracks}>New Game</button>
    </div>
  }
  return(
    <div className="App">
      {content}
    </div>
  )
}

function Header({artist}) {
  return (
    <h1>{artist}</h1>
  )
}
function Table({trackNames}){
  return (
    <div>
      <table className="Table-Data">
        <tbody>
        <tr>
          <td>{trackNames[0]}</td>
          <td>{trackNames[1]}</td>
        </tr>
        <tr>
          <td>{trackNames[2]}</td>
          <td>{trackNames[3]}</td>
        </tr>
        <tr>
          <td>{trackNames[4]}</td>
          <td>{trackNames[5]}</td>
        </tr>
        <tr>
          <td>{trackNames[6]}</td>
          <td>{trackNames[7]}</td>
        </tr>
        <tr>
          <td>{trackNames[8]}</td>
          <td>{trackNames[9]}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

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
async function getJSON() {
  let list
  const response = await axios.get("topArtists.json").then
  ((Response) => list = Response.data).catch(err => console.log(err))
  return response
}
function getTopSongs(artistID, token){
  let tracks
  console.log(artistID)
  console.log(token)
    const response = axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`,
      {headers: {"Authorization": `Bearer ${token}`}}).then((Response) => tracks = Response.data).catch(err => console.log(err))
  console.log(response)
    return response
}
export default App;
