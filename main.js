/*
    Variables
 */
var first_card_clicked = null; //to be assigned a value through function card_clicked
var second_card_clicked = null; //to be assigned a value through function card_clicked
var total_possible_matches = 9; //18 card game play, 9 possible matches[Adjust based on the # of cards at game start]
var match_counter = 0; //start of game value

/*
    Actions
 */

//Start when document is done loading
$(document).ready(function(){
    //When card is clicked run card_clicked function
    $(".back").click(function(){
        card_clicked(this);
    });
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
            //run card_match function
            var matching = card_match(first_card_clicked, second_card_clicked);
            //If the cards match add card_flipped class to keep card shown, else remove card_flipped class from the first card
            if(matching == true){
                $(element).addClass("card_flipped");
                $(".card1").removeClass("card1");
            } else {
                $(".card1").removeClass("card_flipped card1");
            };// end if else matching
        }; // end if else for first card clicked == null
    }; // end if else for first & second card clicked != null
};// end function card_clicked

/**
 * Check for matching cards; value of card1 & card2 is equal
 * @params card1 & card2 - value of first_card_clicked & second_card_clicked
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
        // activate the win screen
        $("#winner").addClass("win");
        console.log("Winner!");
    } else{
        first_card_clicked = null;
        second_card_clicked = null;
    };
}; //end function winning

/**
 * Resets the game, removes classes & resets values
 * @param none
 */
function reset( ){
    $(".card_flipped").removeClass("card_flipped card1");
    //Remove cards & reset card backs to show
    $(".card").fadeOut(0).delay(120).fadeIn(200).find(".back").fadeIn(0);
    //Remove win screen if activated
    $("#winner").removeClass("win");
    //reset values to those originally assigned
    first_card_clicked = null;
    second_card_clicked = null;
    match_counter = 0;
}; //end function reset

/**
 * Finds the clicked element's sibling's img source attribute
 * @param element - card .back
 */
function img_source(element){
    var source = $(element).prev(".front").find("img").attr("src");
    return source;
}; // end function img_source
