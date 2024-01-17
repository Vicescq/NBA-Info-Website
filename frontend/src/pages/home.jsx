import Navbar from "../components/navbar/navbar.jsx"
import Header from "../components/home/header.jsx"
import Match from "../components/home/match.jsx"
import Nogameswrn from "../components/home/nogames_wrn.jsx"

function Home(props){
    const homedata = props.homedata
    
    const matches = []
    for (let i = 0; i < homedata.game_count; i++){
        matches.push(<Match key={i} homedata={homedata} index={i}/>)
    }
    
    if (homedata){ // {/* homedata == false) is required as a condition due to a premature rendering everytime on first load, since homedata state default is false, we do not want that! */}
        return(
            <>
            <Navbar homedata={homedata}/>
            {(!homedata.game_count) ? <Nogameswrn/> : null} 
            {homedata.game_count ? <Header/> : null }
            {matches}
            </>
        )
    }
}

export default Home