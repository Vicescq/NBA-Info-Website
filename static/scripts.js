function set_homevalues(data){
    console.log(data)
    var game_count = data.game_count;
    var matchups = data.matchups;
    var team_records = data.team_records;
    var livescores = data.livescores;
    var game_status = data.game_status;
    var gamestatus_split = data.gamestatus_split
    var logos = data.logos;
    
    for (var i = 0; i < game_count; i++) {
        $("#score_a_" + i).text(livescores[i][0]);
        $("#score_h_" + i).text(livescores[i][1]);
        
        $("#logo_a_" + i).attr("src", logos[i][0])
        $("#logo_h_" + i).attr("src", logos[i][1])

        $("#abv_a_" + i).text(matchups[i][0])
        $("#abv_h_" + i).text(matchups[i][1])
        $("#rec_a_" + i).text(team_records[i][0])
        $("#rec_h_" + i).text(team_records[i][1])
        
        $("#match_status_" + i).text(game_status[i])
        var color = "#1e162f"
        if ((game_status[i] == "END") || (game_status[i] == "Final/OT")){ // ++
            color = "#590b0b";
        }
        else if (gamestatus_split[i] == 3){
            color = "#22272b";
        }
        $("#match_container_" + i).css("background-color", color);
        $("#match_container_" + i + " div").css("background-color", color);

    }
    
}


function update_home(){
    $.get("/update_home", set_homevalues)
}

$(document).ready(function(){
    setInterval(update_home, 2000)
})