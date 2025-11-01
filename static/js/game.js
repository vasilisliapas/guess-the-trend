
document.addEventListener('DOMContentLoaded', function() {
  console.log('Game loaded!');

  const startBtn = document.getElementById('start-game');
  const welcomeScreen = document.getElementById('welcome-screen');
  const gameScreen = document.getElementById('game-screen');

  startBtn.addEventListener('click', function() {
    console.log('Start game clicked');
    welcomeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    loadNewQuestion();
  });

});

function loadNewQuestion() {
  console.log('Loading new question...');
};