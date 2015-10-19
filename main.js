/*
    Variables
 */
var first_card_clicked = null; //to be assigned a value through function card_clicked
var second_card_clicked = null; //to be assigned a value through function card_clicked
var total_possible_matches = 9; //18 card game play, 9 possible matches[Adjust based on the # of cards at game start]
var match_counter = 0; //start of game value, counts # of matches during game
var attempts = 0; //counts number of times user tried to make a match
var accuracy = 0; //Percentage of matches/attempts
var games_played = 0; //number of games played
var games_won = 0; //number of games won
/*//Card variables to dynamically create cards
var cards = $("<div>", {
    class: "card start_pose"
});
var front = $("<div>", {
    class: "front"
});
var front_img = $("<img>", {
    src: "images/card-fronts/clay-card.png" //should be inputted by an array, so they are random
});
var back = $("<div>", {
    class: "back"
});
var back_img = $("<img>", {
    src: "images/penumbra-cardback.png"
});
var card_row = $("<div>")
//end Card variables*/

/*
 Actions
 */

/*//Put card elements together
$(front).append(front_img);
$(back).append(back_img);
$(cards).append(front).append(back);*/

//Start when document is done loading
$(document).ready(function(){
    /*// Dynamically add cards to page
    $("#game-area").append("<div>").append(cards);
    */

    //When card is clicked run card_clicked function
    $(".back").click(function(){
        card_clicked(this);
    });// end .back click handler

    //When reset button is clicked run reset function & move ladder
    $("#btn-reset").click(function(){
        reset();
    }); // end #btn-reset click handler

    //Assign random Member # to go in stats book
    $(".member_num").append(memberNum());

});


/*
    Functions
 */

/**
 * Accessed by clicking .back card
 * Checks if the element clicked is the first, second, or extra card
 * If extra card - nothing happens, will not allow for ad
 * If first card - shows card face
 * If second card - shows card face & checks for match to first card
 * @param element - the card that is clicked on
 * @return first_card_clicked value
 */
function card_clicked(element){
    //Ensure only 2 cards viewed at a time
    if(first_card_clicked != null && second_card_clicked != null) {
        //do nothing
        console.log("User trying to select more than two cards.");
    } else {
        //hide the back of card
        $(element).fadeOut(0);
        //Check value of first_card_clicked
        if (first_card_clicked == null) {
            first_card_clicked = img_source(element);//find & assign card front source
            //Add class to card to mark it for future functions
            $(element).addClass("card_flipped card1");
            console.log(first_card_clicked);
            return first_card_clicked;
        } else {
            second_card_clicked = img_source(element);
            console.log(second_card_clicked);
            attempts++;
            //run card_match function
            var matching = card_match(first_card_clicked, second_card_clicked);
            //If the cards match add card_flipped class to keep card shown, else remove card_flipped class from the first card
            if(matching == true){
                $(element).addClass("card_flipped").parent(".start_pose").removeClass("start_pose");
                $(".card1").removeClass("card1").parent(".start_pose").removeClass("start_pose");
            } else {
                $(".card1").removeClass("card_flipped card1");
            };// end if else matching
        }; // end if else for first card clicked == null
    }; // end if else for first & second card clicked != null
};// end function card_clicked

/**
 * Check for matching cards; value of card1 & card2 is equal
 * @params card1 & card2 - value of first_card_clicked & second_card_clicked
 * @return boolean
 */
function card_match(card1, card2) {
    if (card1 == card2) {
        match_counter++;//increment match_counter
        console.log(match_counter);
        //run winning function
        winning(match_counter);
        return true;
    } else {
        $(".back").delay(150).fadeIn(0); //2.5sec delay
        first_card_clicked = null;
        second_card_clicked = null;
    };
}; // end function card_match

/**
 * Checks if counter equals the total_possible_matches
 * @param counter - number variable for counting
 */
function winning(counter){
    if (counter == total_possible_matches){
        // hide all cards
        $(".card").hide();
        // increment number of games won
        games_won++;
        // activate the win screen
        $("#winner").addClass("win");
        console.log("Winner!");
    } else{
        first_card_clicked = null;
        second_card_clicked = null;
    };
}; //end function winning

/**
 * Finds the clicked element's sibling's img source attribute
 * @param element - card .back
 * @return source
 */
function img_source(element){
    var source = $(element).prev(".front").find("img").attr("src");
    return source;
}; // end function img_source

/**
 * Resets the game, removes classes & resets values
 * @param none
 * @return reset_stats()
 */
function reset(){
    games_played++; //increment number of games started
    //move ladder across screen
    $("#ladder").animate({right: "73vw"}, 500);
    //Remove cards & reset card backs to show
    $(".card_flipped").removeClass("card_flipped card1");
    $(".card").delay(500).fadeOut(0).delay(100).fadeIn(550).find(".back").fadeIn(200);
    $("#ladder").animate({right: "0"}, 500);
    //Remove win screen if activated
    $("#winner").removeClass("win");
    //reset values to those originally assigned
    first_card_clicked = null;
    second_card_clicked = null;
    return reset_stats();
}; //end function reset

/**
 * Display & reset game statistics, called in reset()
 * @param none
 */
function reset_stats(){
    display_stats(); //display statistics before resetting values
    //reset statistic values for new game
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
}; //end function reset_stats

/**
 * Display game statistics, called in reset_stats()
 * @param none
 */
function display_stats(){
    //calculate player accuracy in finding matches, display as percentage
    if (attempts == 0){
        accuracy = "0%"; //ensure NaN is not displayed
    } else {
        accuracy = Math.round((match_counter / attempts) * 100) + "%";//round out decimals
    }
    //display game statistics
    $(".games-played .value").replaceWith("<span class='value'>" + games_played + "</span>");
    $(".games-won .value").replaceWith("<span class='value'>" + games_won + "</span>");
    $(".attempts .value").replaceWith("<span class='value'>" + attempts + "</span>");
    $(".accuracy .value").replaceWith("<span class='value'>" + accuracy + "</span>");
};//end function display_stats

/**
 * Generate and return a random 5 character code
 * @param none
 * @return String memID
 */
function memberNum(){
    //determine the first number
    var memID = Math.round((Math.random() * 7) + 2);
    // add the letter X & find the last three numbers
    memID = memID + "X" + Math.round((Math.random() * 900) + 100);
    return memID;//to be shown on doc
}; // end function memberNum
