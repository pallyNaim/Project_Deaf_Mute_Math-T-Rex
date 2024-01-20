const quizData = [
  {
    question: 'Apakah nama alat yang digunakan untuk melihat masa yang biasanya kita pakai di tangan?',
    options: ['Kalender', 'Jam', 'Komputer', 'Televisyen'],
    answer: 'Jam',
  },
  {
    question: 'Bagian manakah yang menunjukkan minit pada jam?',
    options: ['Jarum pendek', 'Jarum panjang', 'Angka-angka di jam', 'Jam digital'],
    answer: 'Jarum panjang',
  },
  {
    question: 'Berapakah jumlah jam dalam satu hari?',
    options: ['12', '24', '48', '60'],
    answer: '24',
  },
  {
    question: 'Jika jam menunjukkan 7:00 malam, apakah waktu sebenar?',
    options: ['Pagi', 'Petang', 'Malam'],
    answer: 'Malam',
  },
  {
    question: 'Berapakah jumlah minit dalam satu jam?',
    options: [
      '30',
      '45',
      '60',
      '90',
    ],
    answer: '60',
  },
  {
    question: 'Jika jam menunjukkan 8:00 pagi, apakah waktu sebenar?',
    options: ['Pagi', 'Petang', 'Malam'],
    answer: 'Pagi',
  },
  {
    question: 'Mana yang lebih panjang, satu jam atau satu minit?',
    options: [
      'Satu jam',
      'Satu minit',
      'Sama panjang'
    ],
    answer: 'Satu jam',
  },
  {
    question: 'Jika jam menunjukkan 1:20 petang, bagaimanakah anda menyatakannya dalam bentuk jam digital?',
    options: ['1:20 AM', '13:20', '1:20 PM', '12:20'],
    answer: '1:20 PM',
  },
  {
    question: 'Jika jarum jam menunjukkan angka 3 dan jarum minit menunjukkan angka 9, berapakah waktu yang ditunjukkan?',
    options: [
      '3:45',
      '3:15',
      '3:30',
      '3:00',
    ],
    answer: '3:45',
  },
  {
    question: 'Jika sekarang jam 2:15 petang, berapa waktu lagi sehingga jam 4:30 petang?',
    options: ['1 jam 15 minit', '2 jam 15 minit', '2 jam 30 minit', '2 jam 45 minit'],
    answer: '2 jam 15 minit',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> <span style="color: red;">${incorrectAnswers[i].incorrectAnswer}</span><br>
        <strong>Correct Answer:</strong> <span style="color: green;">${incorrectAnswers[i].correctAnswer}</span>
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
    <button class="custom-button" onclick="redirectBack()">Back to Quiz Money</button>
  `;
}


submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
