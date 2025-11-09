
document.addEventListener('DOMContentLoaded', function() {
  console.log('Game loaded!');

  const startBtn = document.getElementById('start-game');
  const playAgainBtn = document.getElementById('play-again');
  const backToMenuBtn = document.getElementById('back-to-menu');
  const resetScoreBtn = document.getElementById('reset-score');

  showScreen('welcome-screen');

  startBtn.addEventListener('click', function() {
    console.log('Start game clicked');
    showScreen('game-screen');
    loadNewQuestion();
  });

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', function(){
      const answer = this.dataset.answer;
      submitAnswer(answer);
    });
  });

  playAgainBtn.addEventListener('click', function() {
    showScreen('game-screen');
    loadNewQuestion();
  });

  backToMenuBtn.addEventListener('click', () => showScreen('welcome-screen'));
  resetScoreBtn.addEventListener('click', () => resetScore());

  // Error buttons are not defined 
  document.getElementById('back-to-menu-error').addEventListener('click', () => showScreen('welcome-screen'));
  document.getElementById('retry-btn').addEventListener('click', () => loadNewQuestion());  

});


async function loadNewQuestion() {
  console.log('Loading new question...');

  document.getElementById('loading').style.display = 'block';
  document.getElementById('question-content').style.display = 'none';

  try {
    const response = await fetch('/get-question');
    const data = await response.json();
    displayQuestion(data);

  } catch(error) {
    console.error('Error loading question:', error)
    showError(error.message)
  }
};

function displayQuestion(data) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('question-content').style.display = 'block';
  document.getElementById('date-range').textContent =
    // `${data.start_date} - ${data.end_date}`;
  data.start_date + " - " + data.end_date;
};

async function submitAnswer(userAnswer) {
  try {
    const response = await fetch('/submit-answer', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ answer: userAnswer})
    });
    const result = await response.json();
    console.log(result);
    showResult(result, userAnswer);

  } catch(error) {
      console.error('Error submitting answer:', error);
      this.showError(error.message);
  }
};

function showResult(result, userAnswer) {
  showScreen('result-screen');
  
  document.getElementById('victory-content').style.display = 'none';
  document.getElementById('defeat-content').style.display = 'none';

  let explanation;
  if (result.correct) {
    document.getElementById('victory-content').style.display = 'block';
    explanation = `Correct! Bitcoin was actually ${result.correct_answer}.`;
  } else {
    document.getElementById('defeat-content').style.display = 'block';
    explanation = `Incorrect. Bitcoin was actually ${result.correct_answer}.`;
  }

  document.getElementById('result-explanation').textContent = explanation;

  const changeDirection = result.price_change_percent > 0 ? 'increased' : 'descreased';
  const priceChangeText = `Bitcoin ${changeDirection} by 
    ${Math.abs(result.price_change_percent)}% this period.`;
  document.getElementById('price-change-info').textContent = priceChangeText;

  document.getElementById('score-display').textContent = `Score: ${result.score}/${result.games_played}`
  
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

async function resetScore() {
  try {
    const response = await fetch('/reset-score');
    const result = await response.json();
    if (result.success) {
      document.getElementById('score-display').textContent = `Score: ${result.score}/${result.games_played}`;
      alert('Score reset successfully!');
    }

  } catch(error) {
    console.error('Error resetting score:', error);
    showError(error.message);
  }
}

function showError(message) {
  document.getElementById('error-message').textContent = message;
  showScreen('error-screen');
}