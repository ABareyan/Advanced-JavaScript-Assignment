var Letter = require("./letter.js");

// console.log("ME too");

var Word = function(word) {

    this.newWord = function(word) {
        var letterInput = [];
        for (var i = 0; i < word.length; i++) {
            var correntActor = new Letter(word[i]);
            letterInput.push(correntActor);
        }
        return letterInput;
    }

    this.letter = this.newWord(word);
    this.choseActor = word;

    this.checkGues = function(guess) {

        for (var i = 0; i < this.letter.length; i++) {
            this.letter[i].actorGuess(guess);
        }
    }

    this.show = function() {
        var letterInput = '';
        for (var i = 0; i < this.letter.length; i++) {
            letterInput += this.letter[i].show()
        }
        return letterInput;
    }

}
module.exports = Word;