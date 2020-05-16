// Start the quiz
// Timer (lose time every question wrong, 0 on end)
// Randomize question
// log answer
// next question
// show questions wrong/right
// show high/low score
// save to local storage

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerBtnEl = document.getElementById("answer-buttons");

let randomQ, currentQIndex

startBtn.addEventListener('click', startGame)

function startGame() {
    // console.log('Start')
    startBtn.classList.add('hide') // hides starts button when pressed
    randomQ = questions.sort(() => Math.random() - .5)
    currentQIndex = 0
    questionContainerEl.classList.remove('hide') // Unhides the question, answers
    setNextQ()
}
// console.log(startGame)

function setNextQ() {
    resetState()
    showQ(randomQ[currentQIndex])
}

function showQ(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnEl.appendChild(button)
    });
}

function resetState() {
    nextBtn.classList.add('hide')
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function selectAnswer(event) {

}

const questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '44', correct: false},
            {text: '24', correct: false}
        ]
    }
]