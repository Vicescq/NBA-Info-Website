import React, { useEffect, useState } from "react"
import { Routes, Route} from "react-router-dom";
import Home from "./pages/home.jsx"
import Boxscore from "./pages/boxscore.jsx";
import NotFound from "./pages/notfound.jsx";
import HomeProvider from "./pages/home_provider.jsx";
import Loading from "./pages/loading.jsx";

function App(){
  
    return(
    <Routes>
      <Route path="/" element={<HomeProvider/>}></Route>
      <Route path="/match/:index" element={<Boxscore/>}></Route>
      <Route path="/abc" element={<Loading/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    )
}






export default App