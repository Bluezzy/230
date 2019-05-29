$(document).ready(function() {
  var $ul = $('ul');
  $("form").on("submit", function(e) {
    e.preventDefault();
    var $form = $(this);
    var name = $form.find("#name").val() || "unknown";
    var quantity = $form.find("#quantity").val() || 1;
    var item = document.createElement("li");
    item.textContent = quantity + '  ' + name;
    $ul.append(item);
  });
});