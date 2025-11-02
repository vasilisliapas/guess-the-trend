
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

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', function(){
      const answer = this.dataset.answer;
      console.log(this.dataset)
      console.log('User chose', answer);
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
  console.log(result)
};