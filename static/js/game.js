
document.addEventListener('DOMContentLoaded', function() {
  console.log('Game loaded!');

  const startBtn = document.getElementById('start-game');

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

});

async function loadNewQuestion() {
  console.log('Loading new question...');
  const response = await fetch('/get-question');
  const data = await response.json();
  document.getElementById('loading').style.display = 'none';
  document.getElementById('question-content').style.display = 'block';
  document.getElementById('date-range').textContent =
    // `${data.start_date} - ${data.end_date}`;
  data.start_date + " - " + data.end_date;
};

async function submitAnswer(userAnswer) {
  const response = await fetch('/submit-answer', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ answer: userAnswer})
  });
  const result = await response.json();
  console.log(result);
  showResult(result, userAnswer);

};

function showResult(result, userAnswer) {
  showScreen('result-screen');
  
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
  
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// Next Step: Implement the Play again and Back to Menu Buttons