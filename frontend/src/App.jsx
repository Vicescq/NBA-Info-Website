import React, {useState, useEffect, useRef} from "react"
import Home from "./pages/home.jsx"

function App(){  
  const initload = useRef(1)


  const [homedata, setData] = useState(0)
  let ms = 3000
  
  useEffect(() => {
    
    if (initload.current){
      fetch_homedata(setData)
      initload.current = 0
    }

    else{
      const interval = setInterval(() => {
        fetch_homedata(setData)
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

export default App