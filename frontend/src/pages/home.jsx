import Navbar from "../components/navbar/navbar.jsx"
import Header from "../components/home/header.jsx"
import Match from "../components/home/match.jsx"
import Nogameswrn from "../components/home/nogames_wrn.jsx"

function Home(props){
    const homedata = props.homedata
    if (homedata.null){
        return (
            <>
            <Navbar/>
            <Nogameswrn homedata={homedata}/>
            </>
        )
    }

    else{
        const matches = []
        for (let i = 0; i < homedata.game_count; i++){
            matches.push(<Match key={i} homedata={homedata} index={i}/>)
        }
        return (
            <>
            <Navbar homedata={homedata}/>
            <Header/>
            {matches}
            </>
        )
    }
}

export default Home