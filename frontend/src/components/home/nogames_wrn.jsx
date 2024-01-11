import "./nogames_wrn.css"

function Nogameswrn(props){
    const homedata = props.homedata
    return (
        <div className="nogames">{homedata.null}</div>
    )
}

export default Nogameswrn