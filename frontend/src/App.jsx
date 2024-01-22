import React, { useEffect, useState } from "react"
import { Routes, Route} from "react-router-dom";
import Home from "./pages/home.jsx"
import Boxscore from "./pages/boxscore.jsx";
import NotFound from "./pages/notfound.jsx";

function App(){
  const [gamecount, setGamecount] = useState(0)
  const [initload, setInitload] = useState(true)
  

  // useEffect(() => {
  //   fetch_gamecount(setGamecount)
  // }, []);

  // if(initload){
  //   for (let i = 0; i < gamecount; i++){
  //     sessionStorage.setItem("scorevis" + i, "visible")
  //   }
  //   setInitload(false)
  // }

    return(
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/match/:index" element={<Boxscore/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    )
}

async function fetch_gamecount(setGamecount){
  const response = await fetch("/gamecount")
  const gamecount = await response.json()
  setGamecount(gamecount)
}






export default App