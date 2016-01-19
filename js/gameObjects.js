/**
 * Object to calculate and return game statistics.
 * Match Attempts: how many times two cards have been clicked to match
 * Match Accuracy: how often a match is made compared to the number of attempts
 * Match Percentage: percentage of the number matches found out of the total available
 */
var Statistics = function () {
    var stats = this;
    stats.gamesPlayed = 0;
    stats.gamesWon = 0;
    stats.cardsClicked = 0;
    stats.parisClicked = 0;
    stats.matchesMade = 0;
    stats.totalMatches = null;

    stats.matchAttempts = function () {
        return stats.parisClicked;
    };

    stats.matchAccuracyPercent = function () {
        var decimal = stats.matchesMade / stats.parisClicked;
        if (isNaN(decimal)) {
            return "0%";
        }
        return Math.round((decimal * 100)) + "%";
    };

    stats.percentMatchesMade = function () {
        var decimal = stats.matchesMade / stats.totalMatches;
        return Math.round((decimal * 100)) + "%";
    };

    stats.newGame = function () {
        stats.cardsClicked = 0;
        stats.matchesMade = 0;
        stats.totalMatches = null;
    };

    stats.resetAllStats = function () {
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
var Card = function (parent) {
    var card = this;
    card.parent = parent;
    card.id = null;
    card.face = null;
    /**
     * Create card to be placed on dom with the given back image & a random front image form array
     * @returns {*|jQuery|HTMLElement}
     */
    card.cardCreator = function (number, cardBack) {
        card.id = "#card" + number;
        // Make card back
        var $cardBack = $("<div>", {
            class: "back"
        });
        var $backImage = $("<img>", {
            src: cardBack
        });
        $($cardBack).append($backImage);

        // Make card face
        card.face = card.parent.faceSrc();
        var $cardFace = $("<div>", {
            class: "face"
        });
        var $faceImage = $("<img>", {
            src: card.face
        });
        $($cardFace).append($faceImage);
        // Append card sides to container
        var $cardContainer = $("<div>", {
            class: "card",
            id: "card" + number
        }).append($cardBack, $cardFace);
        // Assign click handler to the new card
        $($cardContainer).on("click", card.cardClicked);
        return $cardContainer;
    };

    /**
     * When a card is clicked check if it can be flipped.
     * If it can be flip the card and check if it is the first or the second card flipped.
     * Send the card to the card.parent. If it is the second card ask the card.parent if the cards match.
     */
    card.cardClicked = function () {
        //ignore card if turned over or two cards already turned over
        if (!$(this).hasClass("faceUp") && !card.parent.twoCardsTurned()) {
            card.turnCardFaceUp(this);
            //First card
            if (!card.parent.secondCard()) {
                card.parent.firstCardClicked(card);
                return;
            }
            //Second card
            card.parent.secondCardClicked(card);
            // check if cardOne and cardTwo match
            card.parent.cardsMatch();
        }
    };

    /**
     * Add faceUp class to the card to show the card's face.
     */
    card.turnCardFaceUp = function () {
        $(card.id).addClass("faceUp");
    };

    /**
     * Flip card back over to its start position (face down).
     */
    card.turnCardBack = function () {
        $(card.id).addClass("flipBack");
        setTimeout(function () {
            $(card.id).addClass("showBack");
            setTimeout(function () {
                $(card.id).removeClass("faceUp flipBack showBack");
            }, 200);
        }, 300);
    };

}; //end Card object

var MatchingGame = function (gameContainer, cardObject, winCallback) {
    var game = this;
    var container = gameContainer;
    var cardFaces = cardObject.faces.slice(0, (cardObject.faces.length));
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
    game.createGameBoard = function (totalMatches) {
        remainingMatches = totalMatches;
        game.stats.totalMatches = totalMatches;
        game.stats.gamesPlayed++;
        //Create the list of the card faces to use
        game.cardList(totalMatches);
        //Create & append all of the cards to the game board
        for (var i = (totalMatches * 2); i > 0; i--) {
            var card = new Card(game);
            var cardContainer = card.cardCreator(i, cardBack);
            $(container).prepend(cardContainer);
        }
    };
    /**
     * Create a list of the correct number of cards
     */
    game.cardList = function (totalMatches) {
        //ensure the game card array is empty
        gameCardsDouble = [];
        for (var i = totalMatches; i > 0; i--) {
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
    game.faceSrc = function () {
        var index = (Math.floor(Math.random() * gameCardsDouble.length));
        var imageSrc = gameCardsDouble[index];
        gameCardsDouble.splice(index, 1);
        return imageSrc;
    };

    game.firstCard = function () {
        return cardOne === "";
    };
    /**
     * Determine if the card clicked is the second or not.
     * Return true if cardOne is already turned over, making it the second card.
     * @returns {boolean}
     */
    game.secondCard = function () {
        //returns true if
        return cardOne !== "";
    };
    game.twoCardsTurned = function () {
        return cardOne !== "" && cardTwo !== "";
    };

    game.firstCardClicked = function (card) {
        game.stats.cardsClicked++;
        cardOne = card;
    };
    game.secondCardClicked = function (card) {
        game.stats.cardsClicked++;
        cardTwo = card;
        game.stats.parisClicked++;
    };
    /**
     * Check if the two cards turned over are a match.
     */
    game.cardsMatch = function () {
        //Check if the cards do NOT match
        if (cardOne.face !== cardTwo.face) {
            // if cards do not match wait 1.5secs before returning to start position
            setTimeout(function () {
                cardOne.turnCardBack();
                cardTwo.turnCardBack();
                setTimeout(game.resetCardsOneTwo, 700);
            }, 1500);
            return false;
        }
        game.stats.matchesMade++;
        //decrement remainingMatches, if == 0 declare win
        if (--remainingMatches == 0) {
            //PLAYER WINS
            //TODO: Win screen
            console.log("Win", remainingMatches);
            //winCallback.call();
        }
        game.resetCardsOneTwo();
        return true;
    };

    /**
     * Reset the value of the cardOne and cardTwo.
     */
    game.resetCardsOneTwo = function () {
        cardOne = "";
        cardTwo = "";
    };


    /**
     * Empty the game board & reset variables to their initial values.
     */
    game.resetGame = function () {
        $(container).text("");
        cardFaces = cardObject.faces.slice(0, (cardObject.faces.length));
        gameCardsDouble = [];
        remainingMatches = null;
        cardOne = "";
        cardTwo = "";
        game.stats.newGame();
    };

}; //end MatchingGame object