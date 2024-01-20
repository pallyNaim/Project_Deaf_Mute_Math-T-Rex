const quizData = [
  {
    question: 'Apakah mata wang negara Malaysia?',
    options: ['Ringgit', 'Dolar', 'Euro', ' Yen'],
    answer: 'Ringgit',
  },
  {
    question: 'Kenalpasti mata wang Malaysia berikut:',
    options: ['$20', 'RM5', '€10', ' ¥1000'],
    answer: 'RM5',
  },
  {
    question: 'Apakah wang yang digunakan di China?',
    options: ['Ringgit (RM)', 'Dolar Amerika (USD)', 'Yuan (CNY)', 'Euro (EUR)'],
    answer: 'Yuan (CNY)',
  },
  {
    question: 'Apakah nama mata wang utama di Jepun?',
    options: ['Yen', 'Won', 'Ringgit', 'Baht'],
    answer: 'Yen',
  },
  {
    question: 'Apakah jenis wang yang biasanya dikeluarkan dalam bentuk kertas?',
    options: [
      'Logam',
      'Duit syiling',
      'Mata wang kertas',
      'Kad kredit',
    ],
    answer: 'Mata wang kertas',
  },
  {
    question: 'Apakah warna dominan pada wang kertas RM10?',
    options: ['Merah', 'Biru', 'Hijau', 'Kuning'],
    answer: 'Merah',
  },
  {
    question: 'Berapakah jumlah jika anda memiliki tiga keping duit syiling RM1?',
    options: [
      'RM1',
      'RM2',
      'RM3',
      'RM4',
    ],
    answer: 'RM3',
  },
  {
    question: 'Apakah ciri khas yang ada pada semua duit syiling Malaysia?',
    options: ['Gambar Raja-Raja Melayu', 'Tanda Tangan Gabenor Bank Negara', 'Lambang Negara Malaysia', 'Tulisan Jawi'],
    answer: 'Lambang Negara Malaysia',
  },
  {
    question: 'Siapakah wajah yang terdapat pada wang kertas RM1?',
    options: [
      'Tunku Abdul Rahman',
      'Tun Dr. Mahathir Mohamad',
      'Sultan Abdul Samad',
      'Yang di-Pertuan Agong',
    ],
    answer: 'Tunku Abdul Rahman',
  },
  {
    question: 'Duit syiling yang paling kecil nilainya di Malaysia ialah:',
    options: ['1 sen', '5 sen', '10 sen', '20 sen'],
    answer: '5 sen',
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


function redirectBack() {
  // Redirect back to quizMoney.html
  window.location.href = '/quizOption';
}


submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);


displayQuestion();