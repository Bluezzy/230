$(function () {
    var $blinds = $('[id^=blind]');
    var delay = 1500;
    var speed = 250;

    function startAnimation() {
        $blinds.each(function (i) {
            var $blind = $blinds.eq(i);
            $blind.delay(delay * i + speed).animate({
                top: "+=" + $blind.height(),
                height: 0
            }, speed)
        });
    }

    $("a").click(function (e) {
        //on click "start over"
        e.preventDefault();
        $blinds.finish(); // add finish() here
        $blinds.removeAttr("style");
        startAnimation(1500, 250);
    });

    startAnimation();
});