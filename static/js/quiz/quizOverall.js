const quizData = [
  {
    question: 'Apakah warna wang kertas RM10?',
    options: ['Biru', 'Merah', 'Hijau', 'Ungu'],
    answer: 'Merah',
  },
  {
    question: 'Jika anda mempunyai 5 syiling 20 sen, berapa jumlahnya?',
    options: ['RM1', 'RM1.50', 'RM2', 'RM2.50'],
    answer: 'RM1',
  },
  {
    question: 'Apakah ciri keselamatan utama pada wang kertas Malaysia?',
    options: ['Tanda air', 'Jalur keamanan', 'Kertas khas', 'Semua jawapan betul'],
    answer: 'Semua jawapan betul',
  },
  {
    question: '4:00 PM dalam format 24 jam adalah...',
    options: ['0400', '1400', '1600', '1800'],
    answer: '1600',
  },
  {
    question: 'Jika jarum pendek pada angka 8 dan jarum panjang pada angka 6, pukul berapakah itu?',
    options: [
      '8:30',
      '6:40',
      '8:00',
      '6:00',
    ],
    answer: '8:30',
  },
  {
    question: 'Jika sekarang jam 2:10 petang, berapa minit lagi sehingga jam 3:00 petang?',
    options: ['50 minit', '40 minit', '30 minit', '20 minit'],
    answer: '50 minit',
  },
  {
    question: 'Jika anda menabung RM1 setiap hari, berapa jumlah tabungan selepas seminggu?',
    options: [
      'RM5',
      'RM7',
      'RM10',
      'RM14',
    ],
    answer: 'RM7',
  },
  {
    question: 'Seorang pekerja bekerja dari jam 9 pagi hingga 5 petang. Berapa jam dia bekerja dalam sehari?',
    options: ['6 jam', '7 jam', '8 jam', '9 jam'],
    answer: '8 jam',
  },
  {
    question: 'Jika anda membelanjakan RM15 setiap hari, berapa jumlah wang yang akan dibelanjakan dalam masa 5 hari?',
    options: [
      'RM60',
      'RM65',
      'RM70',
      'RM75',
    ],
    answer: 'RM75',
  },
  {
    question: 'Berapa lama masa yang diambil untuk 45 minit ditambah dengan 30 minit?',
    options: ['1 jam 15 minit', '1 jam 30 minit', '1 jam 45 minit', '2 jam'],
    answer: '1 jam 15 minit',
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
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
