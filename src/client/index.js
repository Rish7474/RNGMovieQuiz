
// list of tupes (question, dict of (int, string choice), right choice)
var questionQueue = []
const kRefreshThreshold = 5;
const kRefreshSize = 20;

const InitGame = () => {
  RefillQuestions();
  RenderQuestion();
}

const RenderQuestion = () => {
  let oldGameArea = document.getElementById('game-area')
  if (oldGameArea != null)
    oldGameArea.parentNode.removeChild(oldGameArea);

  curQuestion = questionQueue[0];
  var gameArea = document.createElement('div');
  gameArea.id = 'game-area';

  var questionPrompt = document.createElement('p');
  questionPrompt.appendChild(document.createTextNode(curQuestion[0]));
  gameArea.appendChild(questionPrompt);

  for (let i = 0; i < 4; i++) {
    var answerChoice = document.createElement('button');
    answerChoice.appendChild(document.createTextNode(curQuestion[1][i]));
    answerChoice.id = ''.concat('c', i);
    answerChoice.onclick = () => { EvaluateQuestion(i) };
    gameArea.appendChild(answerChoice);
  }

  document.getElementById('body').appendChild(gameArea);
}

const RefillQuestions = () => {
  questionQueue.push(["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", {
    0: "Movie 1",
    1: "Movie 2",
    2: "Movie 3",
    3: "Movie 4"
  }, 1]);
}

const EvaluateQuestion = (answerChoice) => {
  const curQuestion = questionQueue[0];//questionQueue.shift();
  if (answerChoice == curQuestion[2]) {
    console.log("right");
  }
  else {
    console.log("wrong");
  }
  RenderQuestion();
}

setInterval(() => {
    if (questionQueue.length <= kRefreshThreshold) {
      RefillQuestions();
      console.log("calling backend for more questions");
      // add the backend response to the queue
    }
}, 100000);
// display questions

//evbaulates answers

//fetch new questions from backend

// having a queue of questiosn
