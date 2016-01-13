var cardFaces = [
    "images/cardFaces/andersonCard.png",
    "images/cardFaces/donovanCard.png",
    "images/cardFaces/hudsonCard.png",
    "images/cardFaces/ireneCard.png",
    "images/cardFaces/lestradCard.png",
    "images/cardFaces/maryCard.png",
    "images/cardFaces/mollyCard.png",
    "images/cardFaces/moriartyCard.png",
    "images/cardFaces/mycroftCard.png",
    "images/cardFaces/pinkCard.png",
    "images/cardFaces/sherlockCard.png",
    "images/cardFaces/watsonCard.png"
];
var cardBack = "images/cardBack.png";

$(document).ready(function(){
    var game = new MatchingGame("#gameArea", cardFaces, cardBack, 5);
    game.createGameBoard();
});
