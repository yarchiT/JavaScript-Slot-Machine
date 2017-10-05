# JavaScript-Slot-Machine
Slot Game build with JavaScript and HTML5

# Overview

It's a responsive slot game designed for both mobile devices and dekstop browsers. The game has 3 reels with 3 symbols each which can me spinned by pressing the play button. When the win combination occurs game has a "win" sound + line crossing 3 symbols. Also in the right down corner it has labels with amount of money won and number of successes.

# Getting started

How the game works?

  Basically in the reel.js file all the methods and behaviour of the Reel Strip is described. It creates 3 reels (which is an array of the 32 symbols randomly created after each iteration), updates and renders them until all symbols from the first reel are done. After that the result array is created and we check for the win situation.
  In slot.js file situated logic of spiining the reel, updating canvas sizes etc.
  model.js is used to load path of the symbols with GET request from the JSON file.
