import "./match.css"
import testlogo from "../../assets/logos/DEN.svg"

function Match(){
    return(
        <>
        <a href="" className="match_link">
            <div className="match_container">
                
                <div className="team">
                   <div className="score"></div>
                   <div className="teaminfo">
                        <div className="logo"><img src={testlogo}></img></div>
                        <div className="info">
                            <div className="abv">Lorem </div>
                            <div className="rec">Lorem </div>
                        </div>
                   </div>
                </div>
                
                <div className="middle">

                </div>
                
                <div className="team">
                    <div className="teaminfo">
                        <div className="logo"></div>
                        <div className="info"></div>
                    </div>
                    <div className="score"></div>
                </div>

            </div>
        </a>
        </>
    )
}
export default Match