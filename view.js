'use strict';

let canvas, ctx;
let playground;

// reel_strip_image on the Strip values
let topLeftX, topLeftY, spaceBetweenImages, imageWidth,
    imageHeight, spaceBetweenStrips;

// 10,10,233,155
let sX = 0, sY = 0, sWidth = 235, sHeight = 155;

let myReel = new Reel();

let interval;

// set up reelStrip

window.onload = function () {
    loadImg();
    init();
};

// change the canvas parameters when window size changes
window.addEventListener('resize', () => {
    updateCanvasSize();
});

function setImageSrc(){
    myReel.reel_strip_image.src=symbolsImage.reel_strip_image;
    myReel.bet_line.src = symbolsImage.bet_line;
}
function init() {
    canvas = document.getElementById("slots");
    playground = document.getElementById("playground");
    ctx = canvas.getContext("2d");
}


function move_reel() {
    myReel.initReel();
    myReel.renderReel();
    interval = setInterval(function () {
        logic();
        myReel.renderReel();
    }, 1000 / 60);
}


function clipCanvas(){
    // set Clipping area of the canvas
    ctx.beginPath();
    ctx.rect(topLeftX, topLeftY, canvas.width, canvas.height);
    ctx.clip();
}

function updateCanvasSize() {

    topLeftX = playground.offsetWidth * 0.085;
    topLeftY = playground.offsetHeight * 0.09;
    imageWidth = playground.offsetWidth * 0.215;
    imageHeight = playground.offsetHeight * 0.22;
    spaceBetweenImages = playground.offsetWidth * 0.026;
    spaceBetweenStrips = playground.offsetWidth * 0.039;

    canvas.width = topLeftX + 3 * imageWidth + 2 * spaceBetweenStrips;
    canvas.height = topLeftY + 3 * imageHeight + 3 * spaceBetweenImages;

}

// logic functions

function logic() {
    spin_up();
}

function spin_up() {
    for (let i = 0; i < myReel.getReelCount(); i++) {
        if (!checkIfStop(myReel.reel_position[i], myReel.reel_speed[i]))
            clearInterval(interval);

        myReel.reel_position[i] -= myReel.reel_speed[i];
        myReel.reel_speed[i] += myReel.spinup_acceleration;

        if (myReel.reel_position[i] < 0) {
            myReel.reel_position[i] += 32;
        }
    }
}


// TODO check when to stop

function checkIfStop(reel_pos, reel_speed) {
    if ((reel_pos - reel_speed) < 0) {
        return false;
    }

    return true;
}

// increase reel_position
function startMoving() {

}
