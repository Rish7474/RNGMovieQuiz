// list of tupes (question, dict of (int, string choice), right choice)
var questionQueue = []
var questionRenderFlag = false;
var correctAnswers = 0;
var totalQuestions = 0;
var grade = null;
const kRefreshThreshold = 5;
const kBackendEndpoint = "http://localhost:3000";

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

  correctPercentage = document.createElement('h1');
  correctPercentage.appendChild(document.createTextNode("Accuracy: " + ((correctAnswers / totalQuestions) * 100) + "%"));
  correctPercentage.id = 'cp';

  playerGrade = document.createElement('h1');
  playerGrade.appendChild(document.createTextNode("Grade: " + grade));
  playerGrade.id = 'pg';
  
  gameArea.appendChild(correctPercentage);
  gameArea.appendChild(playerGrade);

  if (questionQueue.length == 0) {
    gameArea.appendChild(document.createElement('h1').appendChild(
      document.createTextNode('Loading new questions. Please wait.')));
    questionRenderFlag = true;
  }
  else {
    curQuestion = questionQueue[0];
    var questionPrompt = document.createElement('p');
    questionPrompt.appendChild(document.createTextNode(curQuestion[0]));
    questionPrompt.id = 'qp';
    gameArea.appendChild(questionPrompt);

    for (let i = 0; i < 4; i++) {
      var answerChoice = document.createElement('button');
      answerChoice.appendChild(document.createTextNode(curQuestion[1][i]));
      answerChoice.id = ''.concat('c', i + 1);
      answerChoice.onclick = () => { EvaluateQuestion(i) };
      gameArea.appendChild(answerChoice);
    }
    questionRenderFlag = false;
  }

  document.getElementById('body').appendChild(gameArea);
}

const RefillQuestions = () => {
  fetch(kBackendEndpoint+'/rng-gen').then(response => response.json()).then(data => {
    data["questions"].forEach(question => {
      questionQueue.push(question);
    });
  });
}

const EvaluateQuestion = (answerChoice) => {
  const curQuestion = questionQueue.shift();
  totalQuestions++;
  if (curQuestion[1][answerChoice] == curQuestion[2]) {
    correctAnswers++;
    alert("You got the answer correct!!")
  }
  else {
    alert("Incorrect!! The correct answer is ".concat(curQuestion[2]));
  }
  questionRenderFlag = true;
}

setInterval(() => {
  if (questionQueue.length <= kRefreshThreshold)
    RefillQuestions();
}, 5000);

setInterval(() => {
  if (questionRenderFlag)
    RenderQuestion();
}, 10);