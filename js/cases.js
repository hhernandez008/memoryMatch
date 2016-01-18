var CaseCreator = function(container, object){
    var self = this;
    self.caseName = object.fileName;
    self.clueFile = object.clueImageFolder;
    self.totalClues = object.numberClues;
    self.currentClue = null;

    self.createClues = function(){
        for(var i = 1; i <= self.totalClues; i++){
            var $clue = $("<div>", {
                class: "clue",
                id: "c" + i + "of" + self.totalClues
            });
            $(container).append($clue);
        }
        createSolution();
    };

    function createSolution(){
        var $solution = $("<div>",{
            class: "solution"
        });
        $(container).append($solution);
    }

    self.fillClue = function (clueNumber){
        var $clueHolder = $("#c" + clueNumber + "of" + self.totalClues);
        if(clueNumber > self.currentClue){
            var $clueImage = $("<img>",{
                src: "images/clues/" + self.clueFile + "/clue" + clueNumber +".png",
                class: "clueImage"
            });

            $($clueHolder).append($clueImage);
            if(clueNumber > 1){
                connectClues(clueNumber);
            }
            self.currentClue++;
            if(self.currentClue == self.totalClues){
                setTimeout(function(){
                    $(".solution").addClass("solved");
                }, 300);
            }
        }
    };

    function connectClues(clueNumber){
        var $shoe = $("<div>",{
            class: "shoePrint",
            id: "shoe" + self.currentClue + "to" + clueNumber
        });
        $(container).prepend($shoe);
    }


};

/**
 * Hold all of the clue information to create different game boards & fill clue section
 * @type {Array}
 */
var cases = [];
//access clue images with "images/" + clueImageFolder + "/clue" + matchNumber(ie 1, 2, 3)
cases[0] = {
    fileName: "A Study in Pink",
    clueImageFolder: "pink",
    numberClues: 5
};
cases[1] = {
    fileName: "The Blind Banker",
    clueImageFolder: "banker",
    numberClues: 7
};
cases[2] = {
    fileName: "The Great Game",
    clueImageFile: "greatGame",
    numberClues: 11
};
cases[3] = {
    fileName: "A Scandal in Belgravia",
    clueImageFile: "belgravia",
    numberClues: 9
};
cases[4] = {
    fileName: "The Hounds of Baskerville",
    clueImageFile: "hounds",
    numberClues: 7
};
cases[5] = {
    fileName: "The Reichenbach Fall",
    clueImageFile: "reichenbach",
    numberClues: 11
};