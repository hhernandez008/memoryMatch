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

var game;
var caseIndex;
var caseClues;
var matchClass;
// global variables to hold stats id's
var $gamesPlayedDisplay, $matchesMadeDisplay, $totalMatchesDisplay, $accuracyDisplay;


$(document).ready(function(){
    $gamesPlayedDisplay = $("#casesClosed");
    $matchesMadeDisplay = $("#cluesFound");
    $totalMatchesDisplay = $("#cluesRemain");
    $accuracyDisplay = $("#clueAccuracy");

    game = new MatchingGame("#gameArea", cards, userWins);

    $("#caseSelector").on("click", ".case", function(){
        var caseId = $(this).attr("id");
        for(var i = 0; i < cases.length; i++){
            if(caseId == cases[i].clueImageFolder){
                caseIndex = i;
                i = cases.length;
            }
        }
        $("#caseSelector").addClass("closed")
            .removeClass("open")
            .attr("style", "visibility: hidden");
        setTimeout(function(){
            openCase(cases[caseIndex]);
        }, 500);
    });

    $("#gameArea").on("click", ".card", function(){
        setTimeout(updateGameStats(), 500);
    });

    $(".resetCase").click(function(){
        game.resetGame();
        setTimeout(function(){
            setGameBoard(cases[caseIndex].numberClues);
        }, 500);
        caseClues.clearClueImages();
        setGameClues(cases[caseIndex]);
        $("#winWindow").addClass("closed")
            .removeClass("open")
            .attr("style", "visibility: hidden");
    });

    $(".newCase").click(function(){
        game.resetGame();
        caseClues.clearClueImages();
        $("#winWindow").addClass("closed")
            .removeClass("open")
            .attr("style", "visibility: hidden");
        $("#caseSelector").addClass("open")
            .removeClass("closed")
            .attr("style", "visibility: visible");
    });

    $("#aboutGame").click(function(){
       //TODO display about game screen
    });

});


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
function setGameClues(caseObject){
    caseClues = new CaseCreator("#clueArea", caseObject);
    caseClues.createClues();
    addExtraClass(".solution", matchClass);
}
function openCase(caseObject){
    matchClass = matchesToString(caseObject.numberClues);
    setGameBoard(caseObject.numberClues);
    setGameClues(caseObject);
    $("#currentCase").text(caseObject.fileName);
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

function userWins(){
    enterCaseInfo();
    moveToClosedCases();
    setTimeout(function(){
        $("#winWindow").addClass("open")
            .removeClass("closed")
            .attr("style", "visibility: visible");
    }, 1560);
}

function enterCaseInfo(){
    $("#winTitle").text(cases[caseIndex].fileName);
    var caseFileImage = $("#" + cases[caseIndex].clueImageFolder).find("img").attr("src");
    console.log(caseFileImage);
    $(".closedCase>.caseFile").attr("src", caseFileImage);
    $(".btn>.caseTitle").text(cases[caseIndex].fileName);
}

function moveToClosedCases(){
    var caseFile = $("#openCases>#" + cases[caseIndex].clueImageFolder).detach();
    $("#closedCases").prepend(caseFile);
}