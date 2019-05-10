var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/schedules');
request.responseType = 'json';

request.addEventListener('load', function(event) {
  var schedules = request.response;
  var schedulePresentation;
  var text;
  var id;
  var staffId;
  var studentEmail;
  var date;
  var time;

  schedules.forEach(function(schedule) {
    schedulePresentation = document.createElement('UL');
    document.body.appendChild(schedulePresentation);
    for (var prop in schedule) {
      var text = prop + ' : ' + schedule[prop];
      var textNode = document.createTextNode(text);
      var scheduleInfo = document.createElement('LI');
      scheduleInfo.appendChild(textNode);
      schedulePresentation.appendChild(scheduleInfo);
    }
  });
});

request.send();