import "./table.css"


function Table({players}){
    const rows = []
    for (let i = 0; i < players.length; i++){
        const {
            points,
            reboundsTotal,
            assists,
            minutes,
            fieldGoalsMade,
            fieldGoalsAttempted,
            fieldGoalsPercentage,
            threePointersMade,
            threePointersAttempted,
            threePointersPercentage,
            freeThrowsMade,
            freeThrowsAttempted,
            freeThrowsPercentage,
            reboundsOffensive,
            reboundsDefensive,
            steals,
            blocks,
            turnovers,
            foulsPersonal,
            plusMinusPoints,

        } = players[i].statistics
        
        let class_status
        if (players[i].oncourt == "1"){
            class_status = "active"
        }


        rows.push(
            

            <tr key={i}  className={class_status}>
            <td className="test">{players[i].name}</td>
            <td>{points ? points : null}</td>
            <td>{reboundsTotal ? reboundsTotal : null}</td>
            <td>{assists ? assists : null}</td>
            <td>{minutes != "00:00" ? minutes : null}</td>
            <td>{fieldGoalsMade ? fieldGoalsMade : null}</td>
            <td>{fieldGoalsAttempted ? fieldGoalsAttempted : null}</td>
            <td>{fieldGoalsPercentage ? fieldGoalsPercentage : null}</td>
            <td>{threePointersMade ? threePointersMade : null}</td>
            <td>{threePointersAttempted ? threePointersAttempted : null}</td>
            <td>{threePointersPercentage ? threePointersPercentage : null}</td>
            <td>{freeThrowsMade ? freeThrowsMade : null}</td>
            <td>{freeThrowsAttempted ? freeThrowsAttempted : null}</td>
            <td>{freeThrowsPercentage ? freeThrowsPercentage : null}</td>
            <td>{reboundsOffensive ? reboundsOffensive : null}</td>
            <td>{reboundsDefensive ? reboundsDefensive : null}</td>
            <td>{steals ? steals : null}</td>
            <td>{blocks ? blocks : null}</td>
            <td>{turnovers ? turnovers : null}</td>
            <td>{foulsPersonal ? foulsPersonal : null}</td>
            <td>{plusMinusPoints ? plusMinusPoints : null}</td>
            </tr>
        ) 
    }
    
    return(
        
        <table>
        <thead>
        <tr>
            <th>NAME</th>
            <th>PTS</th>
            <th>REB</th>
            <th>A</th>
            <th>MIN</th>
            <th>FGM</th>
            <th>FGA</th>
            <th>FG%</th>
            <th>3PM</th>
            <th>3PA</th>
            <th>3P%</th>
            <th>FTM</th>
            <th>FTA</th>
            <th>FT%</th>
            <th>OREB</th>
            <th >DREB</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TO</th>
            <th>PF</th>
            <th>+/-</th>
        </tr>
        </thead>
        <tbody>
        {rows}

        </tbody>
        </table>

       
    )
}

export default Table