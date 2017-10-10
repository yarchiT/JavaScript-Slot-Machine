'use strict';

function Reel() {
    this.reel_positions = 32;
    this.spinup_acceleration = 2;
    const reel_count = 3;
    const row_count = 3;

    let reel_index, symbol_offset, symbol_index;

    this.reel_strip_image = new Image();
    this.bet_line_image = new Image();

    this.reelStrip = new Array(reel_count);
    this.reelStrip[0] = [], this.reelStrip[1] = [], this.reelStrip[2] = [];

    this.result = new Array(reel_count);
    this.result[0] = [], this.result[1] = [], this.result[2] = [];

    this.reel_position = new Array(reel_count);
    this.reel_speed = new Array(reel_count);

    this.getReelCount = function () {
        return reel_count
    };

    this.getRowCount = function () {
        return row_count;
    };

}

Reel.prototype.initReel = function () {
    this.initReelsIndexes();
    this.initReelPosition();
    this.initSpeed();
};

Reel.prototype.initReelsIndexes = function () {
    for (let i = 0; i < this.getReelCount(); i++)
        for (let j = 0; j < this.reel_positions; j++) {
            this.reelStrip[i][j] = Math.floor((Math.random() * 6));
        }
};

Reel.prototype.initReelPosition = function () {
    for (let i = 0; i < this.getReelCount(); i++) {
        this.reel_position[i] = this.reel_positions * (30 + i);
    }
};

Reel.prototype.initSpeed = function () {
    for (let i = 0; i < this.getReelCount(); i++) {
        this.reel_speed[i] = 0;
    }
};

Reel.prototype.renderReel = function () {
    updateCanvasSize();
    clipCanvas();

    let addToX = 0, addToY = 0;
    for (let i = 0; i < this.getReelCount(); i++) {
        for (let j = 0; j < this.getRowCount() + 1; j++) {
            this.updateReel(i, j);

            addToX = i * spaceBetweenStrips + i * imageWidth;
            addToY = j * imageHeight + j * spaceBetweenImages - this.symbol_offset;
            this.drawSymbol(this.symbol_index, topLeftX + addToX, topLeftY + addToY);
        }
    }
};

Reel.prototype.updateReel = function (i, j) {
    this.reel_index = Math.floor(this.reel_position[i] / 32) + j;
    this.symbol_offset = this.reel_position[i] % 32;

    if (this.reel_index >= this.reel_positions)
        this.reel_index -= this.reel_positions;

    this.symbol_index = this.reelStrip[i][this.reel_index];
};

Reel.prototype.drawSymbol = function (symbolIndex, topLeftX, topLeftY) {
    let symbolPixel = symbolIndex * sHeight;
    ctx.drawImage(this.reel_strip_image, sX, symbolPixel, sWidth, sHeight, topLeftX, topLeftY, imageWidth, imageHeight);
};

Reel.prototype.defineResult = function () {
    for (let i = 0; i < this.getReelCount(); i++) {
        for (let j=0; j < this.getRowCount(); j++){
            if(i==2)
                this.result[j][i] = this.reelStrip[i][j+1];
            else                            // the last reel strip has final indexes increased by one
                this.result[j][i] = this.reelStrip[i][j];
        }
    }
};
