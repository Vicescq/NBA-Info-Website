import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

console.log("treadasd")
fetch_gamecount()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
)


async function fetch_gamecount(){
  const response = await fetch("/gamecount")
  const gamecount = await response.json()
  for (let i = 0; i < gamecount; i++){
    sessionStorage.setItem("scorevis" + i, "visible")
    sessionStorage.setItem("classvis" + i, "eye_visible")
  }
}