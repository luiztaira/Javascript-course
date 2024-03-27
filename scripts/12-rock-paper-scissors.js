let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScoreElement();

/*if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}
*/
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
  intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1500);
  isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock');
  });

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});

function playGame(playerMove) {

const computerMove = pickComputerMove();

let result = ''; 

if (playerMove === 'Rock') {
  if (computerMove === 'Rock') {
    result = 'Tie';
  } else if (computerMove === 'Paper') {
    result = 'Loss';
  } else if (computerMove === 'Scissors') {
    result = 'Win';
  }

} else if (playerMove === 'Paper') {   
  if (computerMove === 'Rock') {
    result = 'Win';
  } else if (computerMove === 'Paper') {
    result = 'Tie';
  } else if (computerMove === 'Scissors') {
    result = 'Loss';
  }

} else if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
    result = 'Loss';
  } else if (computerMove === 'Paper') {
    result = 'Win';
  } else if (computerMove === 'Scissors') {
    result = 'Tie';
  }
}

document.querySelector('.js-moveLog').innerHTML = `You 
<img src="images/${playerMove}-emoji.png" class="css-move-icon">
<img src="images/${computerMove}-emoji.png" class="css-move-icon">
Computer`;

function resultChange() {
  document.querySelector('.js-result').innerHTML = `You ${result}`;
}

if (result === 'Win') {
  score.wins = score.wins + 1; 
  resultChange(); 
}
else if (result === 'Loss') {
  score.losses += 1;
  document.querySelector('.js-result').innerHTML = `You Lose`
}
else if (result === 'Tie') {
  score.ties += 1;
  resultChange();
}
updateScoreElement();
}

function updateScoreElement() {
localStorage.setItem('score', JSON.stringify(score));
document.querySelector('.js-score').innerHTML = 
`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove() {

const randomNumber = Math.random();
let computerMove = '';

if (0 <= randomNumber && randomNumber <= 1 / 3) {
  computerMove = 'Rock';
} else if (1 / 3 < randomNumber && randomNumber <= 2 / 3) {
  computerMove = 'Paper';
} else if (2 / 3 < randomNumber && randomNumber <= 1) {
  computerMove = 'Scissors';
}

return computerMove;
}
