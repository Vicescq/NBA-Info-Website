function set_homevalues(data, setup){
    // setup is a boolean val that prevents ALL scores from animating on first load
    console.log(data)
    var gameids = data.gameids
    var game_count = data.game_count
    var matchups = data.matchups
    var team_records = data.team_records
    var livescores = data.livescores
    var game_status = data.game_status
    var gamestatus_colour = data.gamestatus_colour
    var logos = data.logos;
    flush_DOM_elements(gameids, game_count)
    for (var i = 0; i < game_count; i++) {
        set_scores(i, livescores, setup)
        set_logos(i, logos)
        set_name_rec(i, matchups, team_records)
        set_status_and_color(i, game_status, gamestatus_colour)
        set_eye_matchups(i, matchups)
    }
}

function flush_DOM_elements(gameids, game_count){
    for (var i = 0; i < game_count; i++){
        console.log("YO")
        if (($("#match_container_wrapper" + i)).data('gameid') != gameids[i]){
            $("#match_container_wrapper" + i).remove()
        }
    }
}

function set_scores(i, livescores, setup){
    animate_scores(i, livescores, setup)
    $("#score_a_" + i).text(livescores[i][0])
    $("#score_h_" + i).text(livescores[i][1])
}

function animate_scores(i, livescores, setup){
    if (setup == 0){
        var $score_a = $("#score_a_" + i)
        var $score_h = $("#score_h_" + i)
    
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
    $("#match_container_wrapper" + i).css("background-color", gamestatus_colour[i]);
    $("#match_container_wrapper" + i + " div").css("background-color", gamestatus_colour[i]);
}

function set_eye_matchups(i, matchups){
    var eye_matchup_str = matchups[i][0] + " vs " + matchups[i][1]
    $("#eye_matchups_" + i).text(eye_matchup_str)
}

function toggle_scores(id_char, game_count){
    if (id_char == "NULL"){ // user clicked on All
        element_states = find_score_states(game_count)
        homogenize_states(game_count, element_states)
    }
    
    else{ // user clicked on a matchup
        var score_a = document.getElementById("score_a_" + id_char)
        var score_h = document.getElementById("score_h_" + id_char)
        if (score_a.style.display == "none"){
            score_a.style.display = "block"
            score_h.style.display = "block"
        }
        else{
            score_a.style.display = "none"
            score_h.style.display = "none"
        }
        toggle_eyecss(score_a.style.display, id_char)
    }
}

function find_score_states(game_count){
    // documenting states of each score element
    var element_states = []
    for (var i = 0; i < game_count; i++){
        var score_a = document.getElementById("score_a_" + i) // do not need score_h since both share same state
        if (score_a.style.display == "none"){
            element_states.push(0)
        }
        else{
            element_states.push(1)        
        }
    }
    return element_states
}

function array_equality(arr) {
    return new Set(arr).size == 1;
}

function homogenize_states(game_count, element_states){
    // if all are in same state
    if (array_equality(element_states)){
        for (var i = 0; i < game_count; i++){
            var score_a = document.getElementById("score_a_" + i)
            var score_h = document.getElementById("score_h_" + i)
            if (score_a.style.display == "none"){
                score_a.style.display = "block"
                score_h.style.display = "block"
                
            }
            else{
                score_a.style.display = "none"
                score_h.style.display = "none"
            }
            toggle_eyecss(score_a.style.display, i)
        }
    }
    // at least one is at different state
    else{
        for (var i = 0; i < game_count; i++){
            if (element_states[i] == 1){
                var score_a = document.getElementById("score_a_" + i)
                var score_h = document.getElementById("score_h_" + i)
                score_a.style.display = "none"
                score_h.style.display = "none"
                toggle_eyecss(score_a.style.display, i)
            }
        }
    }
}

function toggle_eyecss(init_state, index){
    var default_colour = "#242222"
    if (init_state == "none"){
        document.getElementById("eye_matchups_" + index).style.textDecoration = "line-through"
        document.getElementById("eye_matchups_" + index).style.backgroundColor = "#b3152a"
    }
    else if (init_state == "block"){
        document.getElementById("eye_matchups_" + index).style.textDecoration = "none"
        document.getElementById("eye_matchups_" + index).style.backgroundColor = default_colour
    }
}

function update_home(){
    $.get("/update_home", function(data){
        set_homevalues(data, 0)
    })
}

$(document).ready(function(){
    setInterval(update_home, 2000)
})
