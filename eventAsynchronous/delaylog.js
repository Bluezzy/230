function makeLogger(output) {
  return function() {
    console.log(output);
  }
}

function delayLog() {
  var i;
  for (i = 1; i <= 10; i++) {
    var output = makeLogger(i);
    setTimeout(output, i * 1000);
  }
}