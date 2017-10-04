'use strict';

let canvas, ctx;
let playground;
const reel_count = 3;
const row_count = 3;

// reel_strip_image on the Strip values
let topLeftX, topLeftY, spaceBetweenImages, imageWidth,
    imageHeight, spaceBetweenStrips, canvasHeight;

// 10,10,233,155
let sX = 10, sY = 10, sWidth = 233, sHeight = 153;


let reel_positions = 32;
let spinup_acceleration = 2;
let max_reel_speed = 32;

let GamePlay = true;

let reel_width, reel_height, reel_index;
let symbol_offset, symbol_index;

let interval;


let reel_strip_image = new Image();
reel_strip_image.src = "img/reel_strip.png";

let bet_line = new Image();
bet_line.src = "img/Bet_Line.png";

// set up reels

let reels = new Array(reel_count);
/*
reels[0] = new Array(2, 1, 3, 1, 2, 5, 4, 5, 3, 2, 1, 4, 1, 2, 3, 4, 3, 2, 4, 5, 0, 1, 3, 5, 4, 5, 2, 3, 0, 1, 5, 4);
reels[1] = new Array(5, 0, 1, 3, 2, 4, 0, 2, 5, 2, 3, 1, 5, 2, 1, 0, 4, 2, 5, 4, 2, 1, 0, 1, 2, 4, 3, 1, 5, 2, 0, 4);
reels[2] = new Array(1, 4, 2, 0, 5, 3, 4, 1, 0, 5, 2, 0, 3, 4, 2, 1, 0, 4, 3, 0, 5, 1, 2, 3, 5, 3, 5, 2, 1, 0, 1, 3);
*/

reels[0] = [];
reels[1] = [];
reels[2] = [];

let reel_position = new Array(reel_count);
/*for (let i = 0; i < reel_count; i++) {
    reel_position[i] = reel_positions * (30 + i);
}*/

let reel_speed = new Array(reel_count);
/*for (let i = 0; i < reel_count; i++) {
    reel_speed[i] = 0;
}*/

window.onload = function () {
    loadImg();
    init();
};

// change the canvas parameters when window size changes
window.addEventListener('resize', () => {
    // renderReel();
});

function init() {
    canvas = document.getElementById("slots");
    playground = document.getElementById("playground");
    ctx = canvas.getContext("2d");
};

function before_move_reel() {
    initReelsIndexes();
    updateReelPosition();
    initSpeed();
}

function initReelsIndexes() {
    for (let i = 0; i < reel_count; i++)
        for (let j = 0; j < 32; j++) {
            reels[i][j] = Math.floor((Math.random() * 6));
        }
}

function updateReelPosition() {
    for (let i = 0; i < reel_count; i++) {
        reel_position[i] = reel_positions * (30 + i);
    }
}

function initSpeed(){
    for (let i = 0; i < reel_count; i++) {
        reel_speed[i] = 0;
    }
}

function move_reel() {
    before_move_reel();
    renderReel();
    interval = setInterval(function () {
        logic();
        renderReel();
    }, 1000 / 60);
}


function renderReel() {
    updateCanvasSize();

    // set Clipping area of the canvas
    ctx.beginPath();
    ctx.rect(topLeftX, topLeftY, canvas.width, canvas.height);
    ctx.clip();

    let addToX = 0, addToY = 0;
    for (let i = 0; i < reel_count; i++) {
        for (let j = 0; j < row_count + 1; j++) {
            updateReel(i, j);

            addToX = i * spaceBetweenStrips + i * imageWidth;
            addToY = j * imageHeight + j * spaceBetweenImages - symbol_offset;
            drawSymbol(symbol_index, topLeftX + addToX, topLeftY + addToY);
        }
    }
}

function drawSymbol(symbolIndex, topLeftX, topLeftY) {
    let symbolPixel = sY + symbolIndex * sHeight + 2 * symbolIndex * sY;
    ctx.drawImage(reel_strip_image, sX, symbolPixel, sWidth, sHeight, topLeftX, topLeftY, imageWidth, imageHeight);
}

function updateReel(i, j) {
    reel_index = Math.floor(reel_position[i] / 32) + j;

    symbol_offset = reel_position[i] % 32;
    // reel wrap
    if (reel_index >= reel_positions) reel_index -= reel_positions;

    symbol_index = reels[i][reel_index];
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

    /*  console.log("topLeftX: " + topLeftX);
      console.log("imageWidth: " + imageWidth);
      console.log("imageHeight: " + imageHeight);
      console.log("spaceBetweenStrips: " + spaceBetweenStrips);
  */
}

// logic functions

function logic() {
    /* if(!GamePlay){
         updateReelPosition();
         GamePlay=true;
     }*/
    spin_up();

}

function spin_up() {
    for (let i = 0; i < reel_count; i++) {
        if (!checkIfStop(reel_position[i], reel_speed[i]))
            clearInterval(interval);

        reel_position[i] -= reel_speed[i];
        reel_speed[i] += spinup_acceleration;

        if (reel_position[i] < 0) {
            reel_position[i] += 32;
        }
    }
}


// TODO check when to stop

function checkIfStop(reel_pos, reel_speed) {
    if ((reel_pos - reel_speed) < 0) {
        GamePlay = false;
        return false;
    }

    return true;
}

// increase reel_position
function startMoving() {

}
