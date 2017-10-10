'use strict';

let canvas, ctx;
let playground;
let snd_win = new Audio("sounds/win.wav");
let moneyWin;


// reel_strip_image on the Strip values
let topLeftX, topLeftY, spaceBetweenImages, imageWidth,
    imageHeight, spaceBetweenStrips;

let sX = 0, sY = 0, sWidth = 235, sHeight = 155;
let interval;
let win_counter=0;
const money_for_one_win=10;

let myReel = new Reel();

window.onload = function () {
    loadImg();
    init();
};

// change the canvas parameters when window size changes
window.addEventListener('resize', () => {
    updateCanvasSize();
});

function setImageSrc() {
    myReel.reel_strip_image.src = symbolsImage.reel_strip_image;
    myReel.bet_line_image.src = symbolsImage.bet_line_image;
}

function init() {
    canvas = document.getElementById("slots");
    playground = document.getElementById("playground");
    ctx = canvas.getContext("2d");

    setTimeout(function () {
        myReel.initReel();
        myReel.renderReel();
    }, 100);

}

function move_reel() {
    if (!checkIfStop(myReel.reel_position[0]), myReel.reel_speed[0])
        myReel.initReel();

    interval = setInterval(function () {
        logic();
        myReel.renderReel();
    }, 1000 / 60);

    setTimeout(function () {
        checkResult(myReel.result);
    }, 800);

}


function clipCanvas() {
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
        if (!checkIfStop(myReel.reel_position[i], myReel.reel_speed[i])) {
            clearInterval(interval);
            setStops();
        }
        myReel.reel_position[i] -= myReel.reel_speed[i];
        myReel.reel_speed[i] += myReel.spinup_acceleration;

        if (myReel.reel_position[i] < 0) {
            myReel.reel_position[i] += 32;
        }
    }
}


function setStops() {
    myReel.defineResult();
}

function checkResult(result) {
    for (let i = 0; i < 3; i++) {
          if(checkRow(result[i][0], result[i][1], result[i][2])){
              updateMoney();
              drawBetLine(i);
              winnerSound();
          }
        }
}

function updateMoney(){
    win_counter++;
    moneyWin = document.getElementById("moneyWin");
    moneyWin.innerHTML=`Money: $ ${win_counter*money_for_one_win}<br /> Win: ${win_counter}`;
}

function drawBetLine(row_index) {
    ctx.drawImage(myReel.bet_line_image, topLeftX,
        topLeftY+row_index*(imageHeight+spaceBetweenImages)+imageHeight/2, canvas.width, 5);
}

function winnerSound(){
    try {
        snd_win.currentTime = 0;
        snd_win.play();
    }
    catch(err) {};
}

function checkRow(x, y, z){
    if((x == y && x == z) || (x == y && z==0) ||
        (x == z && y==0) || (x==0 && y == z))
        return true;
    if( (x+y+z == z) || (x+y+z == y) || (x+y+z == x)) // if two elements are 0
        return true;
    return false;
}

function checkIfStop(reel_pos, reel_speed) {
    if ((reel_pos - reel_speed) < 0) {
        return false;
    }
    return true;
}

// increase reel_position
function startMoving() {

}
