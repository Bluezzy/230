setAddingStaffForm();

var request = new XMLHttpRequest();
request.open('POST', 'http://localhost:3000/api/staff_members');

var button = document.querySelectorAll('INPUT')[2];
var email = document.getElementById('email');
var name = document.getElementById('name');
var form = document.querySelector('FORM');

button.addEventListener('click', function(e) {
  e.preventDefault();
  debugger;
});