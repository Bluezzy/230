var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/schedules');
request.responseType = 'json';
request.addEventListener('load', function(event) {
  var schedules = request.response;
  alert(schedules);
})