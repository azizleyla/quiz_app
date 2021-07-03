const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons');
let currentQuestionIndex;
let shuffledQuestions;
const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [
            { text: 'Web Dev Simplified', correct: false },
            { text: 'Traversy Media', correct: true },
            { text: 'Dev Ed', correct: false },
            { text: 'Fun Fun Function', correct: false }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
            { text: 'Kinda', correct: false },
            { text: 'YES!!!', correct: true },
            { text: 'Um no', correct: false },
            { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true }
        ]
    }
]





startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', function () {
    currentQuestionIndex++;
    setNextQuestion();
})
//start game
function startGame() {
    questionContainerElement.classList.remove('hide')
    startButton.classList.add('hide');
    shuffledQuestions = questions;
    currentQuestionIndex = 0;
    setNextQuestion();
}

//set next question
function setNextQuestion() {
    clearStatusClass(document.body)
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//show questions
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {

        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        answerButtonsElement.append(button)
        button.addEventListener('click', selectAnswer)
    })

}

//reset states
function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.firstChild.remove();
    }
}

//select answer
function selectAnswer(e) {
    const correct = e.target.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    nextButton.classList.remove('hide');
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {

        nextButton.classList.remove('hide')

    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove('hide')
        nextButton.classList.add('hide');
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

