document.addEventListener('DOMContentLoaded', function() {
  var answer;
  var form = document.querySelector('form');
  var input = document.getElementById('guess');
  var link = document.querySelector('a');
  var paragraph = document.querySelector('p');

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    paragraph.textContent = 'Guess a number from 1 to 100';
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var guess = parseInt(input.value, 10);
    var message;
    if (guess === answer) {
      message = 'You guessed it!';
    } else if (guess > answer) {
      message = 'My number is lower than ' + String(guess);
    } else {
      message = 'My number is higher than ' + String(guess);
    }
    paragraph.textContent = message;
  });

  link.addEventListener('click', function(event) {
    event.preventDefault();
    newGame();
  });

  newGame();
});