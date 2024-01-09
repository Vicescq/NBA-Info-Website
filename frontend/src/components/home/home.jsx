import Navbar from "../global/navbar.jsx"
import Header from "./header.jsx"
import Match from "./match.jsx"


function Home(props){
    const homedata = props.homedata
    const matches = []
    for (let i = 0; i < homedata.game_count; i++){
        matches.push(<Match key={i} homedata={homedata} index={i}/>)
    }
    //console.log(matches[0].key)
    
    return (
        <>
        <Navbar/>
        <Header/>
        {matches}
        </>
    )
}

export default Home