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

function randomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

var randomWord = (function () {
    var words = ['ABIBLIOPHOBIA', 'LOLLYGAG', 'BUMFUZZLE', 'CATTYWAMPUS',
        'FLIBBERTIGGIBET', 'NUDIUSTERTIAN', 'ABSQUATULATE'];
    return function () {
        if (words.length === 0) { return false };
        var idx = randomInteger(0, words.length - 1);
        return words.splice(idx, 1)[0];
    }
})();

function Game(level) {
    this.word = randomWord();
    this.guesses = [];
    this.tries = (level <= 1) ? 10 : 6;
}

Game.prototype = {
    guess: function (letterValue) {
        var letters = this.word.split('');

    }
}