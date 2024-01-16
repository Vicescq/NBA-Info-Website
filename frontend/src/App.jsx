import React, {useState, useEffect} from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.jsx"

function App(){  
  let initload = true
  let ms = 3000
  const [homedata, setData] = useState(0)
  const [boxscore, setBoxscore] = useState(0)
  
  
  useEffect(() => {
    
    if (initload){
      fetch_homedata(setData)
      initload = false
    }

    else{
      const interval = setInterval(() => {
        fetch_homedata(setData)
      }, ms)
      return () => clearInterval(interval)
    }
  }, []);
    
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home homedata={homedata} initload={initload}/>}></Route>
    </Routes>
    </BrowserRouter>
    
  )
}



function fetch_homedata(setData){
  fetch("/homedata").then(
    response => response.json()
    ).then(
      homedata => {
        setData(homedata)
        console.log(homedata)
      }
    )
}

function fetch_boxscore(setBoxscore){
  fetch("/boxscore").then(
    response => response.json()
    ).then(
      boxscore => {
        setBoxscore(boxscore)
        console.log(boxscore)
      }
    )
}


export default App