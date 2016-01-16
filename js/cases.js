var CaseCreator = function(object){
    var self = this;
    self.caseName = object.fileName;
    self.clueFile = object.clueImageFile;
    self.matches = object.numberMatches;

};

/**
 * Hold all of the clue information to create different game boards & fill clue section
 * @type {Array}
 */
var cases = [];
//access clue images with "images/" + clueImageFolder + "/clue" matchNumber(ie 1, 2, 3)
cases[0] = {
    fileName: "A Study in Pink",
    clueImageFolder: "pink",
    numberMatches: 5
};
cases[1] = {
    fileName: "The Blind Banker",
    clueImageFolder: "banker",
    numberMatches: 7
};
cases[2] = {
    fileName: "The Great Game",
    clueImageFile: "greatGame",
    numberMatches: 11
};
cases[3] = {
    fileName: "A Scandal in Belgravia",
    clueImageFile: "belgravia",
    numberMatches: 9
};
cases[4] = {
    fileName: "The Hounds of Baskerville",
    clueImageFile: "hounds",
    numberMatches: 7
};
cases[5] = {
    fileName: "The Reichenbach Fall",
    clueImageFile: "reichenbach",
    numberMatches: 11
};