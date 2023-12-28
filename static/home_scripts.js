function set_homevalues(data){
    console.log(data)
    var game_count = data.game_count;
    var matchups = data.matchups;
    var team_records = data.team_records;
    var livescores = data.livescores;
    var game_status = data.game_status;
    var gamestatus_colour = data.gamestatus_colour
    var logos = data.logos;
    for (var i = 0; i < game_count; i++) {
        set_scores(i, livescores)
        set_logos(i, logos)
        set_name_rec(i, matchups, team_records)
        set_status_and_color(i, game_status, gamestatus_colour)
        
    }
}

function set_scores(i, livescores){
    animate_scores(i, livescores)
    $("#score_atxt_" + i).text(livescores[i][0])
    $("#score_htxt_" + i).text(livescores[i][1])
}
function animate_scores(i, livescores){
    var $score_a = $("#score_atxt_" + i)
    var $score_h = $("#score_htxt_" + i)
    // console.log($score_a.text())
    // console.log(livescores[i][0])

    if ($score_a.text() != livescores[i][0]){
        $score_a.addClass("changed_score")
        setTimeout(function(){
            $score_a.removeClass("changed_score")
        }, 2600)
    }
    if ($score_h.text() != livescores[i][1]){
        $score_h.addClass("changed_score")
        setTimeout(function(){
            $score_h.removeClass("changed_score")
        }, 2600)
        
    }
}

function set_logos(i, logos){
    $("#logo_a_" + i).attr("src", logos[i][0])
    $("#logo_h_" + i).attr("src", logos[i][1])
}

function set_name_rec(i, matchups, team_records){
    $("#abv_a_" + i).text(matchups[i][0])
    $("#abv_h_" + i).text(matchups[i][1])
    $("#rec_a_" + i).text(team_records[i][0])
    $("#rec_h_" + i).text(team_records[i][1])
}

function set_status_and_color(i, game_status, gamestatus_colour){
    $("#match_status_" + i).text(game_status[i])
    $("#match_container_" + i).css("background-color", gamestatus_colour[i]);
    $("#match_container_" + i + " div").css("background-color", gamestatus_colour[i]);
}


function update_home(){
    $.get("/update_home", set_homevalues)
}

$(document).ready(function(){
    setInterval(update_home, 2000)
})