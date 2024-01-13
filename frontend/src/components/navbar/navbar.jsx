import { useRef } from "react"
import "./navbar.css"

function Navbar(props){
    // generalize
    
    const homedata = props.homedata
    const bballprops = navitemprops_constructor("assets/navbar/bball.svg",)
    const chartprops = navitemprops_constructor("assets/navbar/chart.svg")
    const bulbprops = navitemprops_constructor("assets/navbar/bulb.svg")
    const eyeprops = navitemprops_constructor("assets/navbar/eye.svg")
    eyeprops.href = "javascript:void(0)"
    eyeprops.dropdown = 1
    const githubprops = navitemprops_constructor("assets/navbar/github.svg", "https://github.com/Vicescq/NBA-Web-Scraping", "_blank", "align_right")
    
    return (
    <nav className="navbar">
    <ul className="navlist">
        <NavItem itemprops={bballprops}/>
        <NavItem itemprops={chartprops}/>
        <NavItem itemprops={bulbprops}/>
        {homedata.game_count ? <NavItem itemprops={eyeprops} homedata={homedata}/> : null}
        <NavItem itemprops={githubprops}/>
    </ul>
    </nav>
    )
}

function navitemprops_constructor(imgsrc, href="", target="", alignment="align_left", dropdown=0){
    return {imgsrc: imgsrc, href: href, target: target, alignment: alignment, dropdown: dropdown}
}

function NavItem(props){
    const homedata = props.homedata
    const itemprops = props.itemprops
    return(
        <li className={`navitem ${itemprops.alignment}`}>
        <a href={itemprops.href} target={itemprops.target} >
        <img src={itemprops.imgsrc}></img>
        </a>
        {itemprops.dropdown ? <NavDropDown homedata={homedata}/> : null}
        </li>
    )
}

function NavDropDown(props){
    
    
    if (props.homedata != undefined){ // home, eye dropdown
        const homedata = props.homedata
        const items = []
        for (let i = 0; i < homedata.game_count; i++){
            items.push(<NavDropDownItem matchups={homedata.matchups} index={i}/>)
        }
        
        return(
        <ul className="navdropdown">
            {items}
        </ul>
        )
    }
}

function NavDropDownItem(props){
    if (props.matchups != undefined){
        const matchups = props.matchups
        const index = props.index
        const item_state = useRef(0)
        
        
        return(
            <>
            {index == 0 ? <li className="navdropdownitem navitem_eyeall">ALL</li>: null}
            <li className="navdropdownitem">
                {matchups[index][0]} vs {matchups[index][1]}
            </li>
            </>
        )
    }
}

export default Navbar
