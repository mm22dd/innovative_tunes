import React, {useState} from "react";
import App from "./App";
import "./Style3.css"
//credits function that can be called don't really like this as an alert but idk other options
function credits() {
  alert("Credits\nFront End: Miguel Machado, Jonathan Whelan\nBack End: Joseph Bustamante, Adam Crump, Andrew Mack");
}
//creation of main menu component
function MainMenu(){
  //started state to change render to App after play is hit
  const [started, setStarted] = useState(false)
  function handleClick(){
    setStarted(true)
  }
  if (started){
    return(<App />)
  }
  else {
    //displays the contents of MainMenu3.html with some syntax tweaks to make it compatible with react
    return (
        <body className="body">



        <header className="header">
          <img src={require("./images/title_logo_3.png")} alt="titlelogo" className="titlelogo"></img>
        </header>


        <img src={require("./images/temp_logo_3.png")} alt="Game Logo" className="logo"></img>

          <h1 className="center">曲を推測します~!</h1>


          <div className="center">
            <button className="button" onClick={handleClick}>Play</button>
          </div>


          <div className="center">
            <button className="button" onClick={credits}>Credits</button>
          </div>


          <footer className="footer">
            © 2024 Artificial Innovators
          </footer>
        </body>
    )
  }
}
export default MainMenu