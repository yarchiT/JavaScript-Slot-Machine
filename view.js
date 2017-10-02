'use strict';

let canvas, ctx;
let playground;
const reel_count = 3;
const row_count = 3;

// image on the Strip values
let topLeftX ,topLeftY, spaceBetweenImages, imageWidth ,imageHeight, spaceBetweenStrips;

window.onload = function () {
    loadImg();
    init();
};

// change the canvas parameters when window size changes
window.addEventListener('resize', () => {
    drawImages();
});

function init() {
    canvas = document.getElementById("slots");
    playground = document.getElementById("playground");
    ctx = canvas.getContext("2d");
};

function drawImages() {
    updateCanvasSize();

    let addToX = 0, addToY = 0;
    for (let i = 0; i < reel_count; i++) {
        for (let j = 0; j < row_count; j++) {
           drawImage(topLeftX+addToX, topLeftY+addToY);
            addToY+=spaceBetweenImages+imageHeight;
        }
        addToY=0;
        addToX+=imageWidth+spaceBetweenStrips;
    }
}


function drawImage(topLeftX, topLeftY) {
    let randomImageIndex = Math.floor((Math.random() * 6));
    ctx.drawImage(symbolImages[randomImageIndex], topLeftX, topLeftY, imageWidth, imageHeight);
}


function updateCanvasSize() {
    canvas.width = playground.offsetWidth;
    canvas.height = playground.offsetHeight;

    topLeftX = playground.offsetWidth * 0.085;
    topLeftY = playground.offsetHeight * 0.09;
    imageWidth = playground.offsetWidth * 0.215;
    imageHeight = playground.offsetHeight * 0.22;
    spaceBetweenImages = playground.offsetWidth * 0.026;
    spaceBetweenStrips = playground.offsetWidth * 0.039;

}
