// console.log("I am here");

// input actor name in terminal
var Letter = function(actor) {
    this.actor = actor;
    this.isActorGuesse = false;

    this.show = function() {
        if (this.actor === " ") {
            return (" ")
        } else
        if (this.isActorGuesse) {
            return (this.actor)
        } else
        if (!this.isActorGuesse) {
            return ("_ ");
        }
    };

    // chanmge boolean to true
    this.actorGuess = function(guess) {
        if (guess.toLowerCase() === this.actor.toLowerCase()) {
            this.isActorGuesse = true;
        }
    };

};


module.exports = Letter;