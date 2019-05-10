var exo1;
var exo2;

document.addEventListener('DOMContentLoaded', function() {
  getHomePage();
  exo1 = document.getElementById('1');
  exo2 = document.getElementById('2');
  exo1.addEventListener('click', function(event) {
    document.body.innerHTML = '';
  });

  exo1.addEventListener('click', function(e) {
    e.preventDefault();
    addScript('javascripts/retrieveSchedules.js');
  });

  exo2.addEventListener('click', function(e) {
    e.preventDefault();
    addScript('javascripts/addStaff.js');
  });
});