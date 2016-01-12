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

