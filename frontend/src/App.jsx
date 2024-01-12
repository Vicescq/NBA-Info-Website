import React, {useState, useEffect, useRef} from "react"
import Home from "./pages/home.jsx"

function App(){  
  const initload = useRef(1)
  const [homedata, setData] = useState(0)
  let ms = 3000
  
  useEffect(() => {
    
    if (initload.current){
      fetch_homedata(homedata, setData)
      initload.current = 0
    }

    else{
      const interval = setInterval(() => {
        fetch_homedata(homedata, setData)
      }, ms)
      return () => clearInterval(interval)
    }
  }, []);
    
      
  return(
    <>
      <Home homedata={homedata} initload={initload}/>
    </>
  )
}

function fetch_homedata(homedata, setData){
  fetch("/homedata").then(
    res => res.json()
    ).then(
      homedata => {
        setData(homedata)
        console.log(homedata)
        // do stuff with data
      }
    )

}

export default App