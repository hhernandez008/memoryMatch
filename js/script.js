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
var caseClues;
var matchClass;
// global variables to hold stats id's
var $gamesPlayedDisplay, $matchesMadeDisplay, $totalMatchesDisplay, $accuracyDisplay;


$(document).ready(function(){
    $gamesPlayedDisplay = $("#casesClosed");
    $matchesMadeDisplay = $("#cluesFound");
    $totalMatchesDisplay = $("#cluesRemain");
    $accuracyDisplay = $("#clueAccuracy");

    game = new MatchingGame("#gameArea", cards, winCallback);
    openCase(cases[0]);

    $(".card").click(function(){
        setTimeout(updateGameStats(), 500);

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
    addExtraClass("#gameArea", matchClass);
    addExtraClass(".card", matchClass);
}
function openCase(caseObject){
    matchClass = matchesToString(caseObject.numberClues);
    setGameBoard(caseObject.numberClues);
    caseClues = new CaseCreator("#clueArea", caseObject);
    caseClues.createClues();
    addExtraClass(".solution", matchClass);
}

function updateGameStats(){
    $($matchesMadeDisplay).text(game.stats.matchesMade);
    $($accuracyDisplay).text(game.stats.matchAccuracyPercent());
    setTimeout(function(){
        caseClues.fillClue(game.stats.matchesMade);
        addExtraClass(".shoePrint", matchClass);
    }, 500);

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

//Assign the className to the game board, card containers, & clue solution for formatting
function addExtraClass(location, className){
    $(location).addClass(className);
}

//TODO: winning function
function winCallback(){

}

