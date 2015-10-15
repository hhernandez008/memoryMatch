/**
 * Created by Heather on 10/14/2015.
 */
/*
    Variables
 */
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;


$(".back").click(card_clicked());


/*
    Functions
 */

function card_clicked(element){
    if(first_card_clicked == null){
        $(element).hide();
        first_card_clicked = $(element).find("img").attr("src");
        console.log(first_card_clicked);
        return first_card_clicked;
    }

}