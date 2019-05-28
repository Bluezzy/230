function calculate(numerator, operator, denominator) {
  if (operator === '+') { return numerator + denominator; }
  if (operator === '-') { return numerator - denominator; }
  if (operator === '/') { return numerator / denominator; }
  if (operator === '*') { return numerator * denominator; }
}

$(document).ready(function() {
  $("form").on('submit', function(e) {
    var numerator = Number($("#numerator").val());
    var operator = $("#operator").val();
    var denominator = Number($("#denominator").val());
    var result = calculate(numerator, operator, denominator);
    e.preventDefault();
    $("h1").text(result);
  });
});