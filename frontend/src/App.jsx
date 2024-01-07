import React, {useState, useEffect} from "react"
import Header1 from "./components/home/components.jsx"

function set_api(){
  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch("/homedata").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, []);
}

function App(){
  
  set_api()
  return(
    <Header1/>
  )
}

export default App