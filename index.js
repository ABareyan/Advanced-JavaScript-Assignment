var inquirer = require("inquirer");

var Word = require("./word.js");

// user-chosen letter
var arrayLetter = [];

var userGuess = 10;

// count guessed words
var countWin = 0;

var persons = [
    "Jason Statham",
    "Jennifer Lopez",
    "Michelle Pfeiffer",
    "Al Pacino",
    "Denzel Washington",
    "Eva Mendez",
    "Uma Thurman"
];

var randomActor;
var chosenActor;

var red = '\x1b[31m%s\x1b[0m';
var green = "\x1b[32m%s\x1b[0m";
var separator = "\n======================================"


function newGame() {
    console.log("\x1b[36m%s\x1b[0m",
        separator + "\nTry to guess the famous actor/actress" + separator);
}

function chioseOneActor() {
    randomActor = persons[Math.floor(Math.random() * persons.length)];
    // console.log(randomActor);
    chosenActor = new Word(randomActor);
}


function guessPerson() {
    if (userGuess > 0 && countWin < 5) {
        console.log('\n' + chosenActor.show() + '\n');

        inquirer.prompt([

            {
                name: "txt",
                message: "Guess a letter",
                validate: function(str) {
                    if (str.length != 1) {
                        console.log(red, "\n\nPlease type only ONE letter\n");
                        return false;
                    }
                    var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
                    return regEx.test(str);
                }
            }

        ]).then(function(answer) {
            var guess = answer.txt;
            chosenActor.checkGues(guess);

            // if user type same letter next time
            for (var i = 0; i < arrayLetter.length; i++) {
                if (arrayLetter.includes(guess)) {
                    console.log(green, "\nYou already typed " + guess.toUpperCase() + " try another letter");
                    return guessPerson();
                }
            }
            arrayLetter.push(guess);

            if (randomActor.toLowerCase().indexOf(guess.toLowerCase()) === -1) {
                userGuess--;
                console.log(red, "\nINCORRECT!! " + userGuess + " guesses remaining");
            } else {
                if (countWin < 5) {
                    console.log("\x1b[33m%s\x1b[0m", "\n!!CORRECT!!");
                }
            }

            // console.log(randomActor);
            // console.log(chosenActor.show());


            if (randomActor === chosenActor.show()) {
                console.log('\n' + chosenActor.show());
                userGuess = 10;
                countWin++;
                arrayLetter = [];

                // no repeat actor
                persons = persons.filter(function(item) {
                    return item != randomActor;
                });

                // console.log(countWin);

                if (countWin < 5) {
                    console.log(green, "\nCORRECT! Try to guess next actor/actress");
                    chioseOneActor();
                } else {
                    gameWin();
                }
            }
            if (userGuess === 0) {
                arrayLetter = [];
                gameLose();
            }

            guessPerson();

        });

    }

}

function gameLose() {
    console.log(red, separator + "\nGAME OVER\nYOU DON'T GUESS ACTOR" + separator + '\n');

    inquirer.prompt([{
        name: "confirm",
        type: "confirm",
        message: "Try again?",
        default: true

    }]).then(function(again) {

        if (again.confirm) {
            userGuess = 10;
            countLose = 0;
            chioseOneActor();
            guessPerson()
        } else {
            console.log(green, separator + "\nSEE YOU!\nI HOPE NEXT TIME YOU WILL BE WINNER" + separator + '\n');
            process.exit();
        }
    })
}

function gameWin() {
    console.log("\x1b[36m%s\x1b[0m", separator + "\nYOU WIN!" + separator + '\n');

    inquirer.prompt([{
        name: "confirm",
        type: "confirm",
        message: "Try again?",
        default: true

    }]).then(function(again) {

        if (again.confirm) {
            userGuess = 10;
            countLose = 0;
            chioseOneActor();
            guessPerson();
        } else {
            console.log("\x1b[36m%s\x1b[0m", separator + "\nSEE YOU!" + separator + '\n');
            process.exit();
        }
    })
}

newGame();
chioseOneActor();
guessPerson();