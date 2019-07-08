function randomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function letterInWord(letter, word) {
    return word.split('').indexOf(letter) >= 0;
}

var randomWord = (function () {
    var words = ['ABIBLIOPHOBIA', 'LOLLYGAG', 'BUMFUZZLE', 'CATTYWAMPUS',
        'FLIBBERTIGGIBET', 'NUDIUSTERTIAN', 'ABSQUATULATE'];
    return function () {
        if (words.length === 0) { return false; };
        var idx = randomInteger(0, words.length - 1);
        return words.splice(idx, 1)[0];
    }
})();

function formatLetters(word) {
    var letters = word.split('');
    return letters.map(function (letter) {
        return {
            value: letter,
            display: false,
        };
    });
}

function guessInGuesses(guesses, guess) {
    return guesses.some(function (currentGuess) {
        return guess === currentGuess;
    });
}

function cryptWord(formattedLetters) {
    return formattedLetters.map(function (formatLetter) {
        if (formatLetter.display) {
            return formatLetter.value;
        }
        return "_";
    })
}

function allLetersFound(formattedLetters) {
    return formattedLetters.every(function (letter) {
        return letter.display;
    });
}

function successMessage() {
    $(".container").load(function () {
        alert('Congratulations ! Word Found !');
    });
}

function Game() {
    this.word = randomWord();
    this.letters = formatLetters(this.word);
    this.guesses = [];
    this.tries = 6;
}

Game.prototype = {
    guess: function (letterValue) {

        if (guessInGuesses(this.guesses, letterValue)) { return; }
        this.guesses.push(letterValue);

        if (letterInWord(letterValue, this.word)) {
            this.displayAll(letterValue);
        } else {
            this.tries -= 1;
            if (this.tries <= 0) {
                display(this);
                this.nextWord(false);
            }
        }

        this.checkCompletion();
    },

    displayAll: function (letterValue) {
        this.letters.forEach(function (letter) {
            if (letterValue === letter.value) {
                letter.display = true;
            }
        })
    },

    nextWord: function (success) {
        if (!success) {
            var self = this;
            display(this);
            message("failure");
            setTimeout(function () { self.reboot() }, 150);
        }
    },

    reboot: function () {
        this.word = randomWord();
        if (!this.word) {
            display(this);
            message("over");
            return;
        }
        this.letters = formatLetters(this.word);
        this.tries = 6;
        this.guesses = [];
        display(this);
    },

    checkCompletion() {
        if (allLetersFound(this.letters)) {
            var self = this;
            display(self);
            message('success');
            setTimeout(function () { self.reboot() }, 150);
        }
    },
}

// display

function addIcons(n, iconName) {
    var i;
    for (i = 1; i <= n; i++) {
        var $li = $("<li></li>");
        var $icon = $("<img src=images/" + iconName + ".png></img>");
        $li.append($icon);
        $(".animation").append($li);
    }
}

function message(type) {
    if (type === "success") {
        setTimeout(function () { alert('Congratulations !') }, 100);
    } else if (type === "failure") {
        setTimeout(function () { alert('You failed !') }, 100);
    } else if (type === "over") {
        setTimeout(function () { alert('Game over ! no more word !') }, 100);
    }
}

function showLetter($letter) {
    $letter.removeClass("transparent");
}

function hideLetter($letter) {
    $letter.addClass("transparent");
}

function generateLetter(letterValue, display) {
    var $letter = $("<span class='letter'>" + letterValue + "</span>");
    if (!display) {
        hideLetter($letter);
    }
    return $letter;
}

function displayWord(cryptedWord) { // format : ['_', 'A', '_', etc...]
    cryptedWord.forEach(function (letter) {
        $(".word").append($("<span class='letter'>" + letter + "</span>"));
    });
}

function displayGuesses(guesses) {
    var guessesString = guesses.join(',  ');
    $(".guesses").text(guessesString);
}

function display(anyGame) {
    $(".animation").empty();
    $(".word").empty();
    addIcons(anyGame.tries, "cadenas");
    displayWord(cryptWord(anyGame.letters));
    displayGuesses(anyGame.guesses);
}

$(document).ready(function () {
    var game = new Game();
    display(game);
    $('body').keypress(function (e) {
        var letter = e.key.toUpperCase();
        if (/[a-z]/i.test(letter)) {
            game.guess(letter);
            display(game);
        }
    });
});