/**
 * Created by Heather on 10/14/2015.
 */
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

//Why won't this work??? $("div.back").click(card_clicked(this));


/*
    Functions
 */

//Accessed by clicking .back card
//Checks if the card clicked is the first or second card
// 1 param
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
            //If the cards match set class to remain shown, else remove hiding class from the first card
            if(matching == true){
                $(element).addClass("card_flipped");
                $(".card1").removeClass("card1");
            } else {
                $(".card1").removeClass("card_flipped card1");
            }
            return second_card_clicked;
        } // end if else for first card clicked == null
    } // end if else for first & second card clicked != null
}// end function card_clicked

//Check if value of first_card_clicked & second_card_clicked is equal
//2 Params
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
    }
}// end function card_match

//Checks if counter equals the total possible matches
// 1 Param
function winning(counter){
    if (counter == total_possible_matches){
        $(".card").hide();
        // activate the win screen
        $("#winner").addClass("win");
        console.log("Winner!");
    } else{
        first_card_clicked = null;
        second_card_clicked = null;
    }
}//end function winning

//Resets the game
//0 param
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
}//end function reset

//finds the clicked elements sibling .front source attribute
//1 param
function img_source(element){
    var source = $(element).prev(".front").find("img").attr("src");
    return source;
}// end function img_source
