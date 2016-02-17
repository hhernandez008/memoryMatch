var cards ={
    faces: [
        "images/cardFaces/andersonCard.jpg",
        "images/cardFaces/donovanCard.jpg",
        "images/cardFaces/hudsonCard.jpg",
        "images/cardFaces/ireneCard.jpg",
        "images/cardFaces/lestradCard.jpg",
        "images/cardFaces/maryCard.jpg",
        "images/cardFaces/mollyCard.jpg",
        "images/cardFaces/moriartyCard.jpg",
        "images/cardFaces/mycroftCard.jpg",
        "images/cardFaces/pinkCard.jpg",
        "images/cardFaces/sherlockCard.jpg",
        "images/cardFaces/watsonCard.jpg"
    ],
    back: "images/cardBack.jpg"
};
// variable for the game object
var game;
// variable for the current case index number in cases object
var caseIndex;
// variable for the games ClueCreator object
var caseClues;
// variable for the number of matches in a game represented in letter form
var matchClass;
// global variables to hold stats id's
var $gamesStartedDisplay, $gamesFinishedDisplay,
    $matchesMadeDisplay, $totalMatchesDisplay, $accuracyDisplay;

$(document).ready(function(){
    // Set stats id's
    $gamesStartedDisplay = $("#casesOpened");
    $gamesFinishedDisplay = $("#casesClosed");
    $matchesMadeDisplay = $("#cluesFound");
    $totalMatchesDisplay = $("#cluesRemain");
    $accuracyDisplay = $("#clueAccuracy");

    // create new game
    game = new MatchingGame("#gameArea", cards, userWins);

    // Determine which case the user has selected & set game board accordingly
    $("#caseSelector").on("click", ".case", function(){
        var caseId = $(this).attr("id");
        for(var i = 0; i < cases.length; i++){
            if(caseId == cases[i].clueImageFolder){
                caseIndex = i;
                //Once the index is set exit out of the for loop
                i = cases.length;
            }
        }
        // hide the #caseSelector to reveal the game board
        $("#caseSelector").addClass("closed")
            .removeClass("open")
            .attr("style", "visibility: hidden");
        // Delay creation of game board for the #caseSelector object to be disabled
        setTimeout(function(){
            openCase(cases[caseIndex]);
        }, 500);
    });

    // update game stats on card clicks
    $("#gameArea").on("click", ".card", function(){
        updateGameStats();
    });

    // start current case over
    $(".resetCase").click(function(){
        game.resetGame();
        caseClues.clearClueImages();
        // if the player won hide #winWindow
        $("#winWindow").modal("hide");
        setGameClues(cases[caseIndex]);
        setTimeout(function(){
            setGameBoard(cases[caseIndex].numberClues);
        }, 500);
    });
    // select a new case to play
    $(".newCase").click(function(){
        game.resetGame();
        caseClues.clearClueImages();
        // if the player won hide the #winWindow
        $("#winWindow").modal("hide");
        $("#caseSelector").addClass("open")
            .removeClass("closed")
            .attr("style", "visibility: visible");
    });

    $("#aboutGame").click(function(){
       //TODO display about game screen
    });

});

// Start new game
function openCase(caseObject){
    matchClass = matchesToString(caseObject.numberClues);
    setGameBoard(caseObject.numberClues);
    setGameClues(caseObject);
    // Display the case name on the first file tab in navigation
    $("#currentCase").text(caseObject.fileName);
}
// Create game board
function setGameBoard(totalMatches){
    game.createGameBoard(totalMatches);
    // Update game stats
    $($gamesStartedDisplay).text(game.stats.gamesPlayed);
    $($gamesFinishedDisplay).text(game.stats.gamesWon);
    $($matchesMadeDisplay).text(0);
    $($totalMatchesDisplay).text(totalMatches);
    $($accuracyDisplay).text("0%");
    //add matchClass for css formatting
    addExtraClass("#gameArea", matchClass);
    addExtraClass(".card", matchClass);
}
// Create game clues
function setGameClues(caseObject){
    caseClues = new ClueCreator("#clueArea", caseObject);
    caseClues.createClues();
    //add matchClass for css formatting
    addExtraClass(".solution", matchClass);
}

// Update stats for the current game
function updateGameStats(){
    $($matchesMadeDisplay).text(game.stats.matchesMade);
    $($accuracyDisplay).text(game.stats.matchAccuracyPercent());
    // display clue image when a match is made
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

//Display #winWindow on game completion
function userWins(){
    enterCaseInfo();
    moveToClosedCases();
    //Delay so that all other features are displayed before being covered
    setTimeout(function(){
        $("#winWindow").modal("show");
    }, 1560);
}
// Add case title and folder to the #winWindow
function enterCaseInfo(){
    $("#winTitle").text(cases[caseIndex].fileName);
    var caseFileImage = $("#" + cases[caseIndex].clueImageFolder).find("img").attr("src");
    $(".closedCase>.caseFile").attr("src", caseFileImage);
    $(".btn>.caseTitle").text(cases[caseIndex].fileName);
}
// Move the case folder on the #caseSelector from the #openCases to the #closedCases
function moveToClosedCases(){
    var caseFile = $("#openCases>#" + cases[caseIndex].clueImageFolder).detach();
    $("#closedCases").prepend(caseFile);
}