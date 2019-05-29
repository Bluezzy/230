$(document).ready(function() {
  var $header = $("body > header");
  var $figures = $("figure");
  var $img = $figures.eq(0).find("img").remove();

  $header.prependTo("body");
  $("main > h1").prependTo($header);

  $figures.appendTo("article");
  $figures.find("img").insertBefore($figures.eq(0).find("figcaption"));
  $figures.eq(-1).find("figcaption").before($img);
});