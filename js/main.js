'use strict';

// TODO:
//-Hide Start Button
//-Start Timer
//-Start Counter
//-Disperse Bugs and Carrots

// ----------------------------------------------
// Variables
const POKEMON_COUNT = 10;
const ZOMBIE_COUNT = 10;
const GAME_DURATION_SEC = 10;

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
let score = 0;
let timer = undefined;

// music
const musicBG = new Audio('./sound/pokemon-battle.mp3');
musicBG.loop = true;
const musicPokemonPull = new Audio('./sound/pokemon_pull.mp3');
const musicWin = new Audio('./sound/pokemon-found.mp3');
const musicLose = new Audio('./sound/ghetsis.mp3');

// ----------------------------------------------
// Functions
// countdown
function startCountdown(seconds) {
  playSound(musicBG);
  timer = seconds;
  const interval = setInterval(() => {
    timer--;
    updateTimerText(timer);
    if (timer == 0 || gameOver == true) {
      clearInterval(interval);
      stopSound(musicBG);
      // show game result when timer reaches 0 second
      gameResult.classList.remove('hidden');
    }
    if (timer == 0 && gameOver == false) {
      playSound(musicLose);
    }
  }, 1000);
}

// settings
function playSound(sound) {
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameCounter.innerText = POKEMON_COUNT - score;
}

// disperse zombies and pokemons
function randomPosition(e) {
  e.style.left = Math.random() * 700 + 'px';
  e.style.bottom = Math.random() * 300 + 'px';
}

// timer text update
function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes} : ${seconds}`;
}

// win or lose text
function winTextUpdate() {
  winText.classList.remove('hide');
  loseText.classList.add('hide');
}

function loseTextUpdate() {
  winText.classList.add('hide');
  loseText.classList.remove('hide');
}

// browser size
function browserSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  if (width < 810 || height < 700) {
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
  startCountdown(GAME_DURATION_SEC);
  // show zombies and pokemons on the screen
  pokemonContainer.classList.remove('hide');
  zombieContainer.classList.remove('hide');
  // place pokemon and zombies on the screen
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
  loseTextUpdate();
  // bring all pokemons back to the screen
  pokemons.forEach((e) => {
    if (e.classList.contains('hide')) {
      e.classList.remove('hide');
    }
  });
  // initiate game
  score = 0;
  updateScoreBoard();
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
    loseTextUpdate();
    playSound(musicLose);
  });
});

// click pokemons (to win)
pokemons.forEach((e) => {
  e.addEventListener('click', function (e) {
    playSound(musicPokemonPull);
    e.target.classList.add('hide');
    score++;
    updateScoreBoard();
    if (POKEMON_COUNT === score) {
      gameOver = true;
      playSound(musicWin);
      winTextUpdate();
    }
  });
});

// when browser size change
browserSize();
window.addEventListener('resize', browserSize);
