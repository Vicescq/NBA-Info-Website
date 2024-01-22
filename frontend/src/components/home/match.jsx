import { Link } from "react-router-dom"
import "./match.css"
import { useEffect, useState } from "react"

function Match({homedata, index}){

    const scorestate = "visible"
    
    return(
       
        <Link to={"match/" + index} className="match_link">
            <div id={"match/" + index} className={homedata.gamestatus_class[index]}>
                
                <div className="team">
                   <div className="score" style={{visibility: scorestate}}>{homedata.livescores[index][0]}</div>
                   <div className="teaminfo">
                        <div className="logo"><img src={homedata.logos[index][0]}></img></div>
                        <div className="info">
                            <div className="abv">{homedata.matchups[index][0]}</div>
                            <div className="rec">{homedata.team_records[index][0]}</div>
                        </div>
                   </div>
                </div>
                
                <div className="middle">
                    <div className="status">{homedata.game_status[index]}</div>
                    <div className="location"><img src="assets/misc/at-loc.svg"></img></div>
                </div>
                
                <div className="team">
                    <div className="teaminfo">
                        <div className="logo"><img src={homedata.logos[index][1]}></img></div>
                        <div className="info">
                            <div className="abv">{homedata.matchups[index][1]}</div>
                            <div className="rec">{homedata.team_records[index][1]}</div>
                        </div>
                    </div>
                    <div className="score" style={{visibility: scorestate}}>{homedata.livescores[index][1]}</div>
                </div>

            </div>
        </Link>

        
        
    )
}
export default Match