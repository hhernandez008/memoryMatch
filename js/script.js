var cards ={
    faces: [
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
    ],
    back: "images/cardBack.png"
};

// global variable to hold the game object
var game;
// String representing the number of matches in the game
var matchClass;
// global variables to hold stats id's
var $gamesPlayedDisplay, $matchesMadeDisplay, $totalMatchesDisplay, $accuracyDisplay;


$(document).ready(function(){
    $gamesPlayedDisplay = $("#casesClosed");
    $matchesMadeDisplay = $("#cluesFound");
    $totalMatchesDisplay = $("#cluesRemain");
    $accuracyDisplay = $("#clueAccuracy");

    game = new MatchingGame("#gameArea", cards);
    setGameBoard(7);

    $(".card").click(function(){
        setTimeout(function(){
            $($matchesMadeDisplay).text(game.stats.matchesMade);
            $($accuracyDisplay).text(game.stats.matchAccuracyPercent());
        }, 500);

    });

});

// TODO:adjust file font size to enlarge or shrink font to fit on tab

// Create game board
function setGameBoard(totalMatches){
    game.createGameBoard(totalMatches);
    $($gamesPlayedDisplay).text(game.stats.gamesPlayed);
    $($matchesMadeDisplay).text(0);
    $($totalMatchesDisplay).text(totalMatches);
    $($accuracyDisplay).text("0%");
    matchClass = matchesToString(totalMatches);
    additionalClasses(matchClass);
}

//Make the totalMatches into a string for class assignments for the cards and game container
function matchesToString(totalMatches){
    switch (totalMatches){
        case 5:
            return "five";
        case 7:
            return "seven";
        case 9:
            return "nine";
        case 11:
            return "eleven";
        default:
            console.log(totalMatches, "is not a valid game size");
            return;
    }
}

//Assign the className to the game board & card containers for formatting
function additionalClasses(className){
    $("#gameArea").addClass(className);
    $(".card").addClass(className);
}