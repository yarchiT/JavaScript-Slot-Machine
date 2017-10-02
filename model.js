'use strict';

let symbols, symbolImages =[];

function loadImg() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            symbols = JSON.parse(this.responseText);
            makeSymbolImgArr();
        }
    };
    xhttp.open("GET", "JSON_symbol_images", true);
    xhttp.send();
}

function makeSymbolImgArr(){
   for (let imageSrc in symbols.filenames){
       let image = new Image();
       image.src = symbols.filenames[imageSrc];
       symbolImages.push(image);
   }
    console.log(symbolImages);
}