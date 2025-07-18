const clockEl = document.getElementById('clock');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const questionEl = document.querySelector('.question');
const answersEl = document.querySelector('.answers');
const resultEl = document.querySelector('.result');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// ✅ Real-Time Clock Function
function updateClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// ✅ Fetch Questions from API
async function fetchQuestions() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
  const data = await response.json();
  questions = data.results;
  startQuiz();
}

// ✅ Start Quiz
function startQuiz() {
  startBtn.style.display = 'none';
  questionEl.style.display = 'block';
  answersEl.style.display = 'flex';
  resultEl.innerHTML = '';
  restartBtn.style.display = 'none';
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion();
}

// ✅ Display Question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerHTML = decodeHTML(currentQuestion.question);

  answersEl.innerHTML = '';
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    .sort(() => Math.random() - 0.5);

  answers.forEach(answer => {
    const button = document.createElement('button');
    button.classList.add('answer');
    button.innerHTML = decodeHTML(answer);
    button.addEventListener('click', () => checkAnswer(answer, currentQuestion.correct_answer));
    answersEl.appendChild(button);
  });
}

// ✅ Decode HTML Entities
function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// ✅ Check Answer
function checkAnswer(selected, correct) {
  if (selected === correct) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// ✅ Show Result
function showResult() {
  questionEl.style.display = 'none';
  answersEl.style.display = 'none';
  resultEl.innerHTML = `You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.`;
  restartBtn.style.display = 'inline-block';
}

// ✅ Restart Quiz
restartBtn.addEventListener('click', () => {
  fetchQuestions();
});

// ✅ Start Button Click
startBtn.addEventListener('click', () => {
  fetchQuestions();
});
