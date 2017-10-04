'use strict';

let symbolsImage;

function loadImg() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            symbolsImage = JSON.parse(this.responseText);
            console.log(symbolsImage.reel_strip_image+symbolsImage.bet_line);
            setImageSrc();
        }
    };
    xhttp.open("GET", "JSON_symbol_images", true);
    xhttp.send();
}
