let prevHole = 0;
const gameDuration = 10;
let timeUp = false;
let score = 0;
let highScore = localStorage.getItem("highScore");
if (highScore === null) highScore = 0;
const moles = [
  $(".mole-1"),
  $(".mole-2"),
  $(".mole-3"),
  $(".mole-4"),
  $(".mole-5"),
  $(".mole-6"),
  $(".mole-7"),
  $(".mole-8"),
  $(".mole-9"),
];

const randomHole = () => {
  let index = Math.floor(Math.random() * moles.length);
  if (prevHole === index) {
    return randomHole();
  }
  prevHole = index;
  return index;
};

const randomTime = () => {
  return Math.floor(Math.random() * 1000) + 50;
};

const startGame = () => {
  $("#start-button").css("opacity", "0.5");
  $("#start-button").css("pointer-events", "none");
  timeUp = false;
  score = 0;
  updateScore();
  setTimeout(peep, 1000);
  setTimeout(() => (timeUp = true), gameDuration * 1000);
};

const endGame = () => {
  $("#start-button").css("opacity", "1");
  $("#start-button").css("pointer-events", "auto");
};

const peep = () => {
  const time = randomTime();
  const hole = randomHole();
  moles[hole].addClass("up");
  moles[hole].css("pointer-events", "auto");
  setTimeout(() => {
    moles[hole].removeClass("up");
    if (!timeUp) peep();
    else endGame();
  }, time);
};

const hit = (e) => {
  score++;
  updateScore();
  $(e.target).removeClass("up");
  $(e.target).css("pointer-events", "none");
};

const updateScore = () => {
  $("#score").text("Score: " + score);
  $("#high-score").text("High Score: " + highScore);
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    $("#high-score").text("High Score: " + highScore);
  }
};

updateScore();
$("#start-button").click(startGame);
moles.forEach((mole) => mole.click(hit));
