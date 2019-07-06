// ----------------- HELPERS -----------------------------

// EXPECTED DATA INPUTS
// any data input below should be a JSON type of format with 5 data entries,
// obtained by calling jQuery's method serializeArray on a jQuery's form object.

/* DATA SAMPLE ()
[
 {name: "shape_type", value: ""},
 {name: "start_x", value: ""},
 {name: "start_Y", value: ""},
 {name: "end_x", value: ""},
 {name: "end_Y", value: ""}
]
*/

// DATA MANIPULATION

function formatData(formData) { // expected input format seen above, when submit event is triggered.
    return {
        "type": getValueByName(formData, "shape_type"),
        "startingPoint": {
            x: getValueByName(formData, "start_x"),
            y: getValueByName(formData, "start_y"),
        },
        "endingPoint": {
            x: getValueByName(formData, "end_x"),
            y: getValueByName(formData, "end_y"),
        },
    }
}

function getValueByName(formData, name) { //data : [{name: "", value: ""}, {...}]
    var dataSet = formData.filter(function (dataSet) {
        return dataSet.name === name;
    });
    return dataSet.length > 0 ? dataSet[0].value : "";
}

// FIXING USER INPUT

function isIntoCanvas(coordinates) {
    return coordinates.y <= 570 &&
        coordinates.y >= 0 &&
        coordinates.x <= 772 &&
        coordinates.x >= 0;
}

function areIntoCanvas(arrayOfCoordinates) {
    return arrayOfCoordinates.every(function (coordinates) {
        return isIntoCanvas(coordinates);
    });
}

function keepIntoCanvas(coordinates) {
    if (Number(coordinates.y) > 570) {
        coordinates.y = "570";
    }
    if (Number(coordinates.x) > 772) {
        coordinates.x = "772";
    }
    if (Number(coordinates.y) < 0) {
        coordinates.x = "0";
    }
    if (Number(coordinates.x) < 0) {
        coordinates.x = "0";
    }
    return coordinates;
}

function fixUserInput(shapeInfo) {
    if (!areIntoCanvas([shapeInfo.startingPoint, shapeInfo.endingPoint])) {
        keepIntoCanvas(shapeInfo.startingPoint);
        keepIntoCanvas(shapeInfo.endingPoint);
        alert('Shape coordinates fixed to fit into the canvas');
    }
}

function initializePosition($shape, shapeInfo) {
    $shape.css({
        "top": shapeInfo.startingPoint.y + "px",
        "left": shapeInfo.startingPoint.x + "px",
    });
}

function setShape($container, shapeInfo) {
    var $shape = $("<div></div>");
    $shape.appendTo($container);
    $shape.addClass(shapeInfo.type);
    initializePosition($shape, shapeInfo);
    $shape.data('animation', {
        "startingPoint": shapeInfo.startingPoint,
        "endingPoint": shapeInfo.endingPoint,
    });
}

// ANIMATION

function resetPositions($container) {
    $container.children().each(function () {
        var x = $(this).data('animation').startingPoint.x;
        var y = $(this).data('animation').startingPoint.y;
        $(this).css({
            "top": y + "px",
            "left": x + "px",
        });
    });
}

function startAnimation($container) {
    $container.children().each(function () {
        var endPoint = {
            x: $(this).data('animation').endingPoint.x,
            y: $(this).data('animation').endingPoint.y,
        }
        $(this).animate({
            "top": endPoint.y + "px",
            "left": endPoint.x + "px",
        }, 1000);
    });
}

$(document).ready(function () {

    var $canvas = $("#canvas");

    $('form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray(); // see DATA SAMPLE
        var shapeInfo = formatData(data); // shapeInfo.type, shapeInfo.startingPoint(.x or .y), shapeInfo.endingPoint(.x or .y)
        fixUserInput(shapeInfo); // make sure to keep shapes into the container, before and after animation.
        setShape($canvas, shapeInfo);
    });

    $('#animate').on('click', function (e) {
        e.preventDefault();
        $canvas.children().stop();
        resetPositions($canvas);
        startAnimation($canvas);
    });

    $("#stop").on('click', function (e) {
        e.preventDefault();
        $canvas.children().stop();
    });
});
