/**
 * Object to calculate and return game statistics.
 * Match Attempts: how many times two cards have been clicked to match
 * Match Accuracy: how often a match is made compared to the number of attempts
 * Match Percentage: percentage of the number matches found out of the total available
 */
var Statistics = function(){
    var stats = this;
    stats.gamesPlayed = 0;
    stats.gamesWon = 0;
    stats.cardsClicked = 0;
    stats.parisClicked = 0;
    stats.matchesMade = 0;
    stats.totalMatches = null;

    stats.matchAttempts = function(){
        return stats.parisClicked;
    };

    stats.matchAccuracyPercent = function(){
        var decimal = stats.matchesMade/stats.parisClicked;
        if(isNaN(decimal)){
            return "0%";
        }
        return Math.round((decimal * 100)) + "%";
    };

    stats.percentMatchesMade = function(){
        var decimal = stats.matchesMade/stats.totalMatches;
        return Math.round((decimal * 100)) + "%";
    };

    stats.newGame = function(){
        stats.cardsClicked = 0;
        stats.matchesMade = 0;
        stats.totalMatches = null;
    };

    stats.resetAllStats = function(){
        stats.gamesPlayed = 0;
        stats.gamesWon = 0;
        stats.cardsClicked = 0;
        stats.matchesMade = 0;
        stats.totalMatches = null;
    };
}; // end Statistics object
/**
 *
 * @param parent
 */
var Card = function(parent){
    var card = this;
    card.parent = parent;
    /**
     * Create card to be placed on dom with the given back image & a random front image form array
     * @returns {*|jQuery|HTMLElement}
     */
    card.cardCreator = function(cardBack){
        // Make card back
        var $cardBack = $("<div>", {
            class: "back"
        });
        var $backImage = $("<img>", {
            src: cardBack
        });
        $($cardBack).append($backImage);

        // Make card face
        var $cardFace = $("<div>", {
            class: "face"
        });
        var $faceImage = $("<img>", {
            src: card.parent.faceSrc()
        });
        $($cardFace).append($faceImage);

        // Append card sides to container and return
        return $cardContainer = $("<div>", {
            class: "card"
        }).append($cardBack, $cardFace);
    };
}; //end Card object

var MatchingGame = function(gameContainer, cardObject, winCallback){
    var game = this;
    var container = gameContainer;
    var cardFaces = cardObject.faces;
    var cardBack = cardObject.back;
    var gameCardsDouble = [];
    var remainingMatches = null;
    var cardOne = "";
    var cardTwo = "";
    game.stats = new Statistics();
    /**
     * Create cards and set game board.
     * @param totalMatches
     */
    game.createGameBoard = function(totalMatches){
        remainingMatches = totalMatches;
        game.stats.totalMatches = totalMatches;
        game.stats.gamesPlayed++;
        //Create the list of the card faces to use
        game.cardList(totalMatches);
        //Create & append all of the cards to the game board
        for(var i = (totalMatches * 2); i > 0; i--){
            var card = new Card(game);
            var cardContainer = card.cardCreator(cardBack);
            $(container).prepend(cardContainer);
        }
        //Add click handler to cards
        game.cardClickHandler();
    };
    /**
     * Create a list of the correct number of cards
     */
    game.cardList = function(totalMatches){
        //ensure the game card array is empty
        gameCardsDouble = [];
        for(var i = totalMatches; i > 0; i--){
            var index = (Math.floor(Math.random() * cardFaces.length));
            //create array with two each of the card images
            gameCardsDouble.push(cardFaces[index], cardFaces[index]);
            cardFaces.splice(index, 1);
        }
    };
    /**
     * Select a random index in the card array, and return the string/image source
     * @returns {*}
     */
    game.faceSrc = function(){
        var index = (Math.floor(Math.random() * gameCardsDouble.length));
        var imageSrc = gameCardsDouble[index];
        gameCardsDouble.splice(index, 1);
        return imageSrc;
    };
    /**
     * Assign click handler to cards
     */
    game.cardClickHandler = function(){
        $(container).on("click", ".card", game.cardClicked);
    };
    /**
     * Determine if the card clicked is the second or not.
     * Return true if it is the second card.
     * @returns {boolean}
     */
    game.secondCard = function(){
        //returns true cardOne is already turned over
        return cardOne !== "";
    };
    /**
     * Add faceUp class to the passed in card
     * @param card
     */
    game.turnCardFaceUp = function(card){
        $(card).addClass("faceUp");
    };
    /**
     * Flip card back to start position
     */
    game.turnCardBack = function(){
        $(cardOne).addClass("flipBack");
        $(cardTwo).addClass("flipBack");
        setTimeout(function(){
            $(cardOne).addClass("showBack");
            $(cardTwo).addClass("showBack");
            setTimeout(function(){
                $(cardOne).removeClass("faceUp flipBack showBack");
                $(cardTwo).removeClass("faceUp flipBack showBack");
                // wait 0.1 seconds before resetting cardOne & cardTwo, & re-adding click handler
                setTimeout(function(){
                    game.resetCardsOneTwo();
                    game.cardClickHandler();
                }, 100);
            }, 200);
        }, 300);
    };
    /**
     * Save the card clicked. If the second card check for a match.
     * @param card
     */
    game.cardClicked = function(card){
        card = card.currentTarget;
        //ignore card if already flipped over
        if(!$(card).hasClass("faceUp")) {
            game.stats.cardsClicked++;
            game.turnCardFaceUp(card);
            //First card
            if (!game.secondCard()) {
                cardOne = $(card);
                return;
            }
            //Second card
            $(container).off("click", ".card");
            cardTwo = $(card);
            game.stats.parisClicked++;
            // check if cardOne and cardTwo match
            game.cardsMatch();
        }
    };
    /**
     * Check if the two cards turned over are a match.
     */
    game.cardsMatch = function(){
        var cardOneSrc = $(cardOne).find(".face>img").attr("src");
        var cardTwoSrc = $(cardTwo).find(".face>img").attr("src");
        //Check if the cards do NOT match
        if(cardOneSrc !== cardTwoSrc){
            // if cards do not match wait 1.5secs before returning to start position
            setTimeout(function(){
                game.turnCardBack();
            }, 1500);
            return;
        }
        game.stats.matchesMade++;
        //decrement remainingMatches, if == 0 declare win
        if(--remainingMatches == 0){
            game.stats.gamesPlayed++;
            //PLAYER WINS
            //TODO: Win screen
            console.log("Win", remainingMatches);
            winCallback.call();
        }
        game.resetCardsOneTwo();
        //Re-assign click handler
        game.cardClickHandler();
    };

    /**
     * Reset the value of the cardOne and cardTwo.
     */
    game.resetCardsOneTwo = function(){
        cardOne = "";
        cardTwo = "";
    };

    /**
     * Reset the game board.
     */
    game.resetGame = function(callback){
        $(container).text("");
        gameCardsDouble = [];
        remainingMatches = null;
        cardOne = "";
        cardTwo = "";
        game.stats.newGame();
        //User callback for game reset
        callback.call();
    };

}; //end MatchingGame object