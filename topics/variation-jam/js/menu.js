const menuText = `
(1) DORMANT
(2) FORAGE
(3) OSCILLATE`;

function menuDraw() {
    background(200, 225, 250);

    push();
    textFont(fontRegular);
    fill(0, 150);
    textSize(22);
    textAlign(LEFT, CENTER);
    let x = width / 2 - 78;
    let y = height / 2 - 15;

    text(menuText, x, y);
    pop();

    pop();
}

function menuKeyPressed(event) {
    switch (event.keyCode) {
        case 49: // 1
            state = "red-variation";
            redSetup();
            break;

        case 50: // 2
            state = "green-variation";
            greenSetup();
            break;

        case 51: // 3
            state = "blue-variation";
            blueSetup();
            break;
    }
}

function menuMousePressed() {
    // nothing
}
