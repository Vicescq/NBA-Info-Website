import "./loading.css"
import HashLoader from "react-spinners/HashLoader"

function Loading(){
    return(
        <div id="loading">
            <HashLoader
            color="#41fc03"
            speedMultiplier={1.5}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            />
        </div>
        
    )
}

export default Loading