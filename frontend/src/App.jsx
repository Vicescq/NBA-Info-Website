import React, {useState, useEffect} from "react"
import Home from "./components/home/home.jsx"





function App(){
  
  // fetching data
  let init_load = 1
  const [homedata, setData] = useState(0)
  let ms = 3000
  useEffect(() => {
    if (init_load){
      fetch("/homedata").then(
        res => res.json()
      ).then(
        homedata => {
          setData(homedata)
          console.log(homedata)
          // do stuff with data
        }
      )
      init_load = 0
    }
    
    else{
      const interval = setInterval(() => {
        fetch("/homedata").then(
          res => res.json()
        ).then(
          homedata => {
            setData(homedata)
            console.log(homedata)
            // do stuff with data
          }
        )
        
      }, ms)
      return () => clearInterval(interval)
    }
  }, []);


  return(
    <>
      <Home homedata={homedata}/>
    </>
  )
}

export default App