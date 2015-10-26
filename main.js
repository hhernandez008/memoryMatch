/*
    Variables
 */
var first_card_clicked = null; //to be assigned a value through function card_clicked
var second_card_clicked = null; //to be assigned a value through function card_clicked
var total_possible_matches = 9; //18 card game play, 9 possible matches[Adjust based on the # of cards at game start]
var match_counter = 0; //start of game value is 0, counts # of matches during game
var attempts = 0; //counts number of times user tried to make a match
var accuracy = 0; //Percentage of matches/attempts
var games_played = 0; //number of games played
var games_won = 0; //number of games won

//Images for the card fronts
var front_images = [
     "images/card-fronts/clay-card.png",
     "images/card-fronts/deckle-card.png",
     "images/card-fronts/kat-card.png",
     "images/card-fronts/lapin-card.png",
     "images/card-fronts/maldavis-card.png",
     "images/card-fronts/mat-card.png",
     "images/card-fronts/member-card.png",
     "images/card-fronts/neel-card.png",
     "images/card-fronts/sanfran-card.png"
 ];



/*
 Actions
 */

//Start
$(function(){
    var gameArea = $("#game-area");

    // Dynamically add cards to page
    gameArea.prepend(place_cards());

    // Click handler to flip cards
    gameArea.on('click','.back', function(){
        card_clicked(this);
    });

    //When reset button is clicked run reset function & move ladder
    $("#btn-reset").click(function(){
        reset();

    });

    //Assign random Member # to display in stats book
    $(".member_num").append(memberNum());

});


/*
    Functions
 */

/**
 * Dynamically add cards to board, 18 card game w/ 9 matches
 */
function place_cards() {
    // array with two of each card front image (18 cards total)
    var front_images_copy = front_images.concat(front_images);

    for (var i = 0; i < 18; i++) {
        var $card_container = $("<div>", {
                class: "card wiggle"
            });
        var $card_front = $("<div>", {
                class: "front"
            });
        var img_index = Math.floor(Math.random() * front_images_copy.length);
        var $front_img = $("<img>", {
                src: front_images_copy[img_index] //inputted from front_images array
            });
        front_images_copy.splice(img_index, 1);
        var $card_back = $("<div>", {
                class: "back"
            });
        var $back_img = $("<img>", {
                src: "images/penumbra-cardback.png"
            });

        $($card_front).append($front_img);
        $($card_back).append($back_img);
        $($card_container).append($card_front, $card_back);
        $("div#game-area").prepend($card_container);

    } //end for loop
} // end function place_cards


/**
 * Accessed by clicking .back card
 * Checks if the element clicked is the first, second, or extra card
 * If extra card - nothing happens, will not allow for ad
 * If first card - shows card face
 * If second card - shows card face & checks for match to first card
 * @param element
 * @returns {*}
 */
function card_clicked(element){
    //Ensure only 2 cards viewed at a time
    if(first_card_clicked != null && second_card_clicked != null) {
        return;
    }
        //hide the back of card
        $(element).fadeOut(0);
        //Check value of first_card_clicked
        if (first_card_clicked == null) {
            first_card_clicked = img_source(element);//find & assign card front source
            //Add class to card to mark it for future functions
            $(element).addClass("card_flipped card1").parent().removeClass("wiggle");
            return first_card_clicked;
        } else {
            second_card_clicked = img_source(element);
            attempts++;
            //run card_match function
            var matching = card_match(first_card_clicked, second_card_clicked);
            //If the cards match add card_flipped class to keep card shown, else remove card_flipped class from the first card
            if(matching == true){
                $(element).addClass("card_flipped").parent(".wiggle").removeClass("wiggle");
                $(".card1").removeClass("card1");
            } else {
                $(".card1").removeClass("card_flipped card1").parent().addClass("wiggle");
            } // end if else matching
        } // end if else for first card clicked == null
} // end function card_clicked

/**
 * Check for matching cards; value of card1 & card2 is equal
 * @param card1
 * @param card2
 * @returns {boolean}
 */
function card_match(card1, card2) {
    if (card1 == card2) {
        match_counter++;//increment match_counter
        //run winning function
        winning(match_counter);
        return true;
    } else {
        $(".back").delay(300).fadeIn(0);
        first_card_clicked = null;
        second_card_clicked = null;
    }
} // end function card_match

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
    } else{
        first_card_clicked = null;
        second_card_clicked = null;
    }
} //end function winning

/**
 * Finds the clicked element's sibling's img source attribute
 * @param element - card .back
 * @return source
 */
function img_source(element){
    var source = $(element).prev(".front").find("img").attr("src");
    return source;
} // end function img_source

/**
 * Resets the game, removes classes & resets values
 * @returns {*}
 */
function reset(){
    games_played++; //increment number of games started
    //Remove win screen if activated
    $("#winner").removeClass("win");
    //move ladder across screen & insert new cards
    $("#ladder").animate({right: "73vw"}, 500).delay(100).animate({right: "0"}, 500, (function(){
        $(".card").remove();
        place_cards();
    }));
    //Remove cards & reset card backs to show
    $(".card_flipped").removeClass("card_flipped card1");
    $(".card").delay(200).fadeOut(200).delay(100).fadeIn(550).find(".back").fadeIn(200);

    //reset values to those originally assigned
    first_card_clicked = null;
    second_card_clicked = null;
    return reset_stats();
} //end function reset

/**
 * Display & reset game statistics, called in reset()
 */
function reset_stats(){
    display_stats(); //display statistics before resetting values
    //reset statistic values for new game
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
} //end function reset_stats

/**
 * Display game statistics, called in reset_stats()
 */
function display_stats(){
    //calculate player accuracy in finding matches, display as percentage
    if (attempts == 0){
        accuracy = "0%"; //ensure NaN is not displayed
    } else {
        //adjust accuracy if full game not played
        if (match_counter < total_possible_matches){
            var matches = match_counter / total_possible_matches;
            accuracy = Math.round((matches / attempts) * 100) + "%";//round out decimals
        } else {
            accuracy = Math.round((match_counter / attempts) * 100) + "%";//round out decimals
        }
    }
    //display game statistics
    $(".games-played .value").replaceWith("<span class='value'>" + games_played + "</span>");
    $(".games-won .value").replaceWith("<span class='value'>" + games_won + "</span>");
    $(".attempts .value").replaceWith("<span class='value'>" + attempts + "</span>");
    $(".accuracy .value").replaceWith("<span class='value'>" + accuracy + "</span>");
}//end function display_stats

/**
 * Generate and return a random 5 character code
 * @returns {number}
 */
function memberNum(){
    //determine the first number
    var memID = Math.round((Math.random() * 7) + 2);
    // add the letter X & find the last three numbers
    memID = memID + "X" + Math.round((Math.random() * 900) + 100);
    return memID;//to be shown on doc
} // end function memberNum
