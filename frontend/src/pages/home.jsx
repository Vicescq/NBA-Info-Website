import Navbar from "../components/navbar/navbar.jsx"
import Header from "../components/home/header.jsx"
import Match from "../components/home/match.jsx"
import Nogameswrn from "../components/home/nogames_wrn.jsx"

function Home(props){
    const homedata = props.homedata
    const initload = props.initload
    
    const matches = []
    for (let i = 0; i < homedata.game_count; i++){
        matches.push(<Match key={i} homedata={homedata} index={i}/>)
    }
    
    return(
        <>
        <Navbar homedata={homedata}/>
        {(!homedata.game_count && !initload.current) ? <Nogameswrn/> : null} {/* !initload.current is required as a condition due to a bug where Nogameswrn gets rendered everytime on first load, we do not want that */}
        {homedata.game_count ? <Header/> : null }
        {matches}
        </>
    )
}

export default Home