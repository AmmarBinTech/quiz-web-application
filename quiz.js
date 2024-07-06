const questions = [
    {
        question: "Which tasks are the responsibilities of AWS? (TWO.)",
        answers: [
            { text: "Maintaining virtualization infrastructure", correct: true },
            { text: "Configuring AWS infrastructure devices", correct: true },
            { text: "Deploying applications", correct: false },
            { text: "Managing user data", correct: false }
        ]
    },
    {
        question: "Which AWS service automates infrastructure provisioning and administrative tasks for an analytical data warehouse?",
        answers: [
            { text: "Amazon Redshift", correct: true },
            { text: "AWS Lambda", correct: false },
            { text: "Amazon S3", correct: false },
            { text: "Amazon EC2", correct: false }
        ]
    }
    // Add more questions as needed
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true; // Disable buttons after an answer is selected
    });
    if (correct) {
        score++;
    }
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = `Restart Quiz (Score: ${score})`;
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();
