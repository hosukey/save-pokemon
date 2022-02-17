'use strict';

// TODO:
//-Hide Start Button
//-Start Timer
//-Start Counter
//-Disperse Bugs and Carrots

// ----------------------------------------------
// Variables
const browser = document.querySelector('.browserSize');
const startBtn = document.querySelector('.game-start');
const gameTimer = document.querySelector('.timer');
const gameCounter = document.querySelector('.counter');
const gameResult = document.querySelector('.game-bottom');
const winText = document.querySelector('.win');
const loseText = document.querySelector('.lose');
const replayBtn = document.querySelector('.replayBtn');
const pokemons = document.querySelectorAll('.pokemons img');
const zombies = document.querySelectorAll('.zombies img');
const pokemonContainer = document.querySelector('.pokemons');
const zombieContainer = document.querySelector('.zombies');
let gameOver = false;
let pokemonCounter = 10;

const musicBG = new Audio('./sound/pokemon-battle.mp3');
musicBG.loop = true;
const musicPokemonPull = new Audio('./sound/pokemon_pull.mp3');
const musicWin = new Audio('./sound/pokemon-found.mp3');
const musicLose = new Audio('./sound/ghetsis.mp3');

// ----------------------------------------------
// Functions
// countdown
function startCountdown(seconds) {
  musicBG.play();
  let counter = seconds;
  const interval = setInterval(() => {
    counter--;
    gameTimer.textContent = `${counter} seconds`;
    if (counter == 0 || gameOver == true) {
      clearInterval(interval);
      musicBG.pause();
      // show game result when timer reaches 0 second
      gameResult.classList.remove('hidden');
    }
  }, 1000);
}

// disperse zombies and pokemons
function randomPosition(e) {
  e.style.left = Math.random() * 700 + 'px';
  e.style.bottom = Math.random() * 300 + 'px';
}

// win or lose text
function win() {
  winText.classList.remove('hide');
  loseText.classList.add('hide');
}

function lose() {
  winText.classList.add('hide');
  loseText.classList.remove('hide');
}

// browser size
function browserSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  if (width < 850 || height < 1005) {
    browser.classList.remove('hide');
  } else {
    browser.classList.add('hide');
  }
}

// ----------------------------------------------
// Event Listeners
// start game
startBtn.addEventListener('click', function (e) {
  // hiding start button
  e.target.classList.add('hide');
  // start counter 10 seconds
  startCountdown(10);
  // show zombies and pokemons on the screen
  pokemonContainer.classList.remove('hide');
  zombieContainer.classList.remove('hide');
  pokemons.forEach((e) => {
    randomPosition(e);
  });
  zombies.forEach((e) => {
    randomPosition(e);
  });
});

// replay game
replayBtn.addEventListener('click', function (e) {
  gameOver = false;
  lose();
  pokemons.forEach((e) => {
    if (e.classList.contains('hide')) {
      e.classList.remove('hide');
    }
  });
  pokemonCounter = 10;
  gameCounter.textContent = `${pokemonCounter}`;

  gameResult.classList.add('hidden');
  startCountdown(10);
  pokemons.forEach((e) => {
    randomPosition(e);
  });
  zombies.forEach((e) => {
    randomPosition(e);
  });
});

// click zombie (gameover)
zombies.forEach((e) => {
  e.addEventListener('click', function (e) {
    gameOver = true;
    lose();
    musicLose.play();
  });
});

// click pokemons to win
pokemons.forEach((e) => {
  e.addEventListener('click', function (e) {
    musicPokemonPull.play();
    e.target.classList.add('hide');
    pokemonCounter--;
    gameCounter.textContent = `${pokemonCounter}`;
    if (pokemonCounter === 0) {
      gameOver = true;
      musicWin.play();
      win();
    }
  });
});

// when browser size change
window.addEventListener('resize', browserSize);
