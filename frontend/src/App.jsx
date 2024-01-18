import React, {useState, useEffect} from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.jsx"
import Boxscore from "./pages/boxscore.jsx";
import NotFound from "./pages/notfound.jsx";

function App(){  
  let ms = 3000
  const [initload, setInitload] = useState(true)
  const [homedata, setData] = useState(false)

  useEffect(() => {
    
    if (initload){
      fetch_homedata(setData)
      setInitload(false)
    }
    
    else{
      const interval = setInterval(() => {
      fetch_homedata(setData)
      }, ms)
      return () => clearInterval(interval)
    }
  }, [initload]);
  
  return(
    <Routes>
      <Route path="/" element={<Home homedata={homedata}/>}></Route>
      <Route path="/match/:id" element={<Boxscore homedata={homedata}/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
  )
}

async function fetch_homedata(setData){
  const response = await fetch("/homedata")
  const homedata =  await response.json()
  setData(homedata)
  console.log(homedata)
}


export default App