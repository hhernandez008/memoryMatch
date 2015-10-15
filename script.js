/**
 * Created by Heather on 10/14/2015.
 */
/*
    Variables
 */
var first_card_clicked = null; //to be assigned a value through function card_clicked
var second_card_clicked = null; //to be assigned a value through function card_clicked
var total_possible_matches = 2; //4 card game play only 2 possible matches
var match_counter = 0; //start of game value

/*
    Actions
 */
//Why won't this consistently work??? $("card").find(".back").click(card_clicked(this));

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
            first_card_clicked = $(element).prev().find("img").attr("src");
            //remove for final version !!!!!!!!!!!!!!!!
            console.log(first_card_clicked);
            return first_card_clicked;
        } else {
            second_card_clicked = $(element).prev().find("img").attr("src");
            //remove for final version!!!!!!!!!!!!!!!!!!
            console.log(second_card_clicked);
            //run card_match function
            card_match(first_card_clicked, second_card_clicked);
            return second_card_clicked;
        } // end if else for first card clicked == null
    } // end if else for first & second card clicked != null
}// end function card_clicked

//Check if value of first_card_clicked & second_card_clicked is equal
//2 Params
function card_match(card1, card2) {
    if (card1 == card2) {
        match_counter++;
        //remove for final version!!!!!!!!!!!!!!!!!!
        console.log(match_counter);
        //run winning function
        winning(match_counter);
        return match_counter;
    } else {
        $(".back").delay(150).fadeIn(0); //2sec delay
        first_card_clicked = null;
        second_card_clicked = null;
    }
    //remove for final version!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(first_card_clicked + " " + second_card_clicked);
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
    //Remove cards & reset card backs to show
    $(".card").fadeOut(0).delay(120).fadeIn(2).find(".back").fadeIn(0);
    //Remove win screen if activated
    $("#winner").removeClass("win");
    //reset values to those originally assigned
    first_card_clicked = null;
    second_card_clicked = null;
    match_counter = 0;
}
