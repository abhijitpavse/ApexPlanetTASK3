// === Interactive Quiz ===
const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Control Style System",
    ],
    correct: "Cascading Style Sheets",
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const quiz = quizData[currentQuestion];
  document.getElementById("question").innerText = quiz.question;

  const answersUl = document.getElementById("answers");
  answersUl.innerHTML = "";

  quiz.answers.forEach((answer) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = answer;
    button.onclick = () => checkAnswer(answer);
    li.appendChild(button);
    answersUl.appendChild(li);
  });

  document.getElementById("quiz-result").innerText = "";
  document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(answer) {
  const correct = quizData[currentQuestion].correct;
  const result = document.getElementById("quiz-result");

  if (answer === correct) {
    result.innerText = "✅ Correct!";
    result.style.color = "green";
    score++;
  } else {
    result.innerText = `❌ Incorrect. The correct answer is ${correct}.`;
    result.style.color = "red";
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  document.getElementById("quiz").innerHTML = `
    <h3>🎉 Quiz Completed!</h3>
    <p>Your score: ${score} / ${quizData.length}</p>
  `;
}

// Load first question on page load
loadQuestion();


// === Joke Generator API ===
function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      const joke = `${data.setup} 😂 ${data.punchline}`;
      document.getElementById("joke").innerText = joke;
    })
    .catch(err => {
      document.getElementById("joke").innerText = "Failed to fetch joke.";
    });
}
