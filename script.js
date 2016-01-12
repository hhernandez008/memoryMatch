/**
 * Object to calculate and return game statistics.
 * Match Attempts: how many times two cards have been clicked to match
 * Match Accuracy: how often a match is made compared to the number of attempts
 * Match Percentage: percentage of the number matches found out of the total available
 */
var statistics = function(){
    var statistics = this;
    statistics.gamesPlayed = 0;
    statistics.gamesWon = 0;
    statistics.cardsClicked = 0;
    statistics.matchesMade = 0;

    statistics.matchAttempts = function(){
        return (statistics.cardsClicked/2);
    };

    statistics.matchAccuracy = function(numberMatches){
        return (statistics.cardsClicked/2)/numberMatches;
    };

    statistics.matchPercentage = function(numberMatches){
        return statistics.matchesMade/numberMatches;
    };

    statistics.newGame = function(){
        statistics.cardsClicked = 0;
        statistics.matchesMade = 0;
    };

    statistics.resetStats = function(){
        statistics.gamesPlayed = 0;
        statistics.gamesWon = 0;
        statistics.cardsClicked = 0;
        statistics.matchesMade = 0;
    };
};

var card = function(cardArray, cardBackSrc){
    var card = this;
    card.gameCards = [];
    card.gameCardsDouble = [];

    card.cardList = function(numberMatches){
        for(var i = numberMatches; i > 0; i--){
            var index = (Math.floor(Math.random() * cardArray.length));
            card.gameCards.push(cardArray[index]);
            cardArray.splice(index, 1);
        }
        //create array with two each of the card images
        card.gameCardsCopy = card.gameCards.concat(card.gameCards);
    };

    /**
     * Select a random index in the card array, and return the string/image source
     * @returns {*}
     */
    card.faceSrc = function(){
        var index = (Math.floor(Math.random() * card.gameCardsDouble.length));
        var imageSrc = card.gameCardsDouble[index];
        card.gameCardsDouble.splice(index, 1);
        return imageSrc;
    };

    /**
     * Create card to be placed on dom with the given back image & a random front image form array
     * @returns {*|jQuery|HTMLElement}
     */
    card.cardCreator = function(){
        var $cardContainer = $("<div>",{
            class: "card"
        });
        var $cardBack = $("<div>", {
            class: "back"
        });
        var $backImage = $("<img>", {
            src: cardBackSrc
        });
        $($cardBack).append($backImage);

        var $cardFront = $("<div>", {
            class: "front"
        });
        var $frontImage = $("<img>", {
            src: card.faceSrc()
        });
        $($cardFront).append($frontImage);
        $($cardContainer).append($cardBack, $cardFront);
        return $cardContainer;
    };

    /**
     * Add flipping class to cards
     * @param $object
     */
    card.flip = function($object){
        $object.addClass(flipBack)
            .sibling("div")
            .addClass(flipFront);
    }
};