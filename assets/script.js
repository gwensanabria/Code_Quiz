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
const time = document.getElementById("time");
const timeUp = document.getElementById("time-up");

let randomQ, currentQIndex;
////////// increments by one ////////////////////
startBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", timer => {
    update = setInterval("timer()", 1000)
});
nextBtn.addEventListener("click", () => {
  currentQIndex++;
  setNextQ();
});
///////////////////////////// Start button, randomize question //////////////////////////
function startGame() {
  t = 100;
  // console.log('Start')
  startBtn.classList.add("hide"); // hides starts button when pressed
  randomQ = questions.sort(() => Math.random() - 0.5);
  currentQIndex = 0;
  questionContainerEl.classList.remove("hide"); // Unhides the question, answers
  setNextQ();
}
// console.log(startGame)

////////////////////////// Timer //////////////////////////////////
function timer() {
  t = t - 1;
  if (t < 100) {
    time.innerHTML = t;
  }
  if (t < 1) {
    window.clearInterval(update);
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
    timeUp.innerText = "Time's Up!";
    timeUp.classList.remove("hide");
  }
}

update = setInterval("timer()", 1000);

/////////////////// Set Next Question ///////////////////////////////////
function setNextQ() {
  resetState();
  showQ(randomQ[currentQIndex]);
}

function showQ(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnEl.appendChild(button);
  });
}

//problem reseting timer on reset
function resetState() {
  clearStatusClass(document.body);
  nextBtn.classList.add("hide");
  timeUp.classList.add("hide");
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerBtnEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (randomQ.length > currentQIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    window.clearInterval(update);
    t = "-";
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
    timeUp.innerText = "Finished!";
    timeUp.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
  /// close to subtracting time, higher number than i want though///
  if (!correct) {
    element.classList.add("wrong");
    return (t = t - parseInt(2));
  } else {
    element.classList.add("correct");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
