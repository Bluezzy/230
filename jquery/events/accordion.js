
$(document).ready(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    var character = $('#key').val();

    $(document).off('keypress').on('keypress', function(e) {
      debugger;
      if (e.key !== character) { return; }
      debugger;
      $('a').trigger('click');
    })
  });

  $('a').on('click', function(e) {
    e.preventDefault();
    $('#accordion').slideToggle();
  });
});
