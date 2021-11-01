
// list of tupes (question, dict of (int, string choice), right choice)
var questionQueue = []
var questionRenderFlag = false;
const kRefreshThreshold = 5;
const kRefreshSize = 20;
const kLoadingMessage = 'Loading new questions. Please wait.';
const kCorrectAnswerMessage = "You got the answer correct!!";
const kWrongAnswerMessage = "Incorrect!! The correct answer is ";

const InitGame = () => {
  RefillQuestions();
  RenderQuestion();
}

const RenderQuestion = () => {
  let oldGameArea = document.getElementById('game-area')
  if (oldGameArea != null)
    oldGameArea.parentNode.removeChild(oldGameArea);

  var gameArea = document.createElement('div');
  gameArea.id = 'game-area';

  if (questionQueue.length == 0) {
    gameArea.appendChild(document.createElement('h1').appendChild(
      document.createTextNode(kLoadingMessage)));
      questionRenderFlag = true;
  }
  else {
    curQuestion = questionQueue[0];
    var questionPrompt = document.createElement('p');
    questionPrompt.appendChild(document.createTextNode(curQuestion[0]));
    gameArea.appendChild(questionPrompt);

    for (let i = 0; i < 4; i++) {
      var answerChoice = document.createElement('button');
      answerChoice.appendChild(document.createTextNode(curQuestion[1][i]));
      answerChoice.id = ''.concat('c', i+1);
      answerChoice.onclick = () => { EvaluateQuestion(i) };
      gameArea.appendChild(answerChoice);
    }
    questionRenderFlag = false;
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
  const curQuestion = questionQueue.shift();
  if (answerChoice == curQuestion[2]) {
    alert(kCorrectAnswerMessage)
  }
  else {
    alert(kWrongAnswerMessage.concat(curQuestion[1][2]));
  }
  questionRenderFlag = true;
}

setInterval(() => {
    if (questionQueue.length <= kRefreshThreshold) {
      RefillQuestions();
      console.log("calling backend for more questions");
    }
}, 5000);

setInterval(() => {
  if (questionRenderFlag)
    RenderQuestion();
}, 10);
