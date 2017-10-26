const CLASSES = makeData();

///// Game made in colors first, then with the gifs/////

//RUN ON START
function makeBoard() {
    var html = '';
    var counter = 0;
    for (var i = 0; i < 4; i++) {
        html += '<tr>';
        for (var j = 0; j < 4; j++) {
            html += '<td onclick="checkboard(' + counter + ')"></td>';
            counter++;
        }
        html += '</tr>';
    }
    $('#board').html(html);
    loadColors();
}

//MAKE DATA STRUCTURE
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function makeData() {
    var array = shuffle([
        'witch',
        'pumpkin',
        'bat',
        'ghost',
        'black-cat',
        'coffin',
        'tree',
        'haunted-house',
        'witch',
        'pumpkin',
        'bat',
        'ghost',
        'black-cat',
        'coffin',
        'tree',
        'haunted-house'
    ]);
    for (var c = 0; c < array.length; c++) {
        array[c] = { class: array[c], clicked: false, matched: false };
    }
    return array;
}

//LOAD BOARD DATA
function loadColors() {
    $('td');

    var c = 0;
    $('td').each(function() {
        $(this)
            .addClass(CLASSES[c].class)
            .addClass('dontshowcolor');
        c++;
    });
}

//CONDUCT GAME PLAY
function checkboard(index) {
    var td = $('td');
    $(td[index]).removeClass('dontshowcolor');
    var color = CLASSES[index].class;
    CLASSES[index].clicked = true;
    var reset = false;

    for (var c = 0; c < CLASSES.length; c++) {
        if (CLASSES[c].clicked && c != index) {
            if (color == CLASSES[c].class) {
                $(td[index])
                    .addClass('matched')
                    .prop('disabled', true);
                $(td[c])
                    .addClass('matched')
                    .prop('disabled', true);
                CLASSES[index].clicked = false;
                CLASSES[index].matched = true;
                CLASSES[c].clicked = false;
                CLASSES[c].matched = true;
            } else {
                reset = true;
                $(td[index]).addClass('dontshowcolor');
                $(td[c]).addClass('dontshowcolor');
            }
        }

        if (
            CLASSES.length ==
            CLASSES.slice().filter(function(cl) {
                return cl.matched;
            }).length
        ) {
            $('#winner').html('<h2>!!!WINNER!!!</h2>');
            $('td')
                .attr('class', 'matched')
                .addClass('scary');
            $('#reset').html(
                '<button id="reset" onclick="document.location.reload()">Play Again</button>'
            );
        }
    }

    if (reset) {
        for (var c = 0; c < CLASSES.length; c++) {
            CLASSES[c].clicked = false;
        }
    }

    $('.matched').removeClass('dontshowcolor');
}

function main() {
    makeBoard();
}

$(main);
