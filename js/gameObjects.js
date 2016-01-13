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
    stats.matchesMade = 0;

    stats.matchAttempts = function(){
        return (stats.cardsClicked/2);
    };

    stats.matchAccuracy = function(numberMatches){
        return (stats.cardsClicked/2)/numberMatches;
    };

    stats.matchPercentage = function(numberMatches){
        return stats.matchesMade/numberMatches;
    };

    stats.newGame = function(){
        stats.cardsClicked = 0;
        stats.matchesMade = 0;
    };

    stats.resetStats = function(){
        stats.gamesPlayed = 0;
        stats.gamesWon = 0;
        stats.cardsClicked = 0;
        stats.matchesMade = 0;
    };
};
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

    /**
     * Add flipping class to cards
     * @param $object
     */
    card.flipUp = function($object){
        $object.addClass(flipBack)
            .sibling("div")
            .addClass(flipFace);
    }
};

var MatchingGame = function(gameContainer, cardFaceArray, cardBack, totalMatches){
    var game = this;
    game.gameCardsDouble = [];
    game.remainingMatches = totalMatches;
    /**
     * Create a list of the correct number of cards
     */
    game.cardList = function(){
        for(var i = totalMatches; i > 0; i--){
            var index = (Math.floor(Math.random() * cardFaceArray.length));
            //create array with two each of the card images
            game.gameCardsDouble.push(cardFaceArray[index], cardFaceArray[index]);
            cardFaceArray.splice(index, 1);
        }
    };
    /**
     * Select a random index in the card array, and return the string/image source
     * @returns {*}
     */
    game.faceSrc = function(){
        var index = (Math.floor(Math.random() * game.gameCardsDouble.length));
        var imageSrc = game.gameCardsDouble[index];
        game.gameCardsDouble.splice(index, 1);
        return imageSrc;
    };

    game.createGameBoard = function(){
        //Create the list of the card faces to use
        game.cardList();

        //Make the totalMatches into a string for class assignments for the cards and game container
        var matchesString = "";
        switch (totalMatches){
            case 5:
                matchesString = "five";
                break;
            case 7:
                matchesString = "seven";
                break;
            case 9:
                matchesString = "nine";
                break;
            case 11:
                matchesString = "eleven";
                break;
            default:
                console.log(totalMatches, "is not a valid game size");
        }

        //Assign the matchesString as a class to the container
        $(gameContainer).addClass(matchesString);

        //Create & append all of the cards to the game board
        for(var i = (totalMatches * 2); i > 0; i--){
            var card = new Card(game);
            var cardContainer = card.cardCreator(cardBack);
            cardContainer.addClass(matchesString);
            $(gameContainer).prepend(cardContainer);
        }
    };

};