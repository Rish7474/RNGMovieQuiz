
// list of tupes (question, dict of (int, string choice), right choice)
var questionQueue = []
var questionRenderFlag = false;
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

const AddUser = () => {
  console.log(JSON.stringify({
    user_id: document.getElementById('user-id').value
  }));

  var data = {
    "user_id": document.getElementById('user-id').value
  }

  var headers = {
    'Content-Type': 'application/json',
    "Access-Control-Origin": "*"
  }


  fetch(kBackendEndpoint + '/add-user', {
    method: 'POST',
    mode: "no-cors",
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => { console.log(res.json()) });
};

const RefillQuestions = () => {
  fetch(kBackendEndpoint + '/rng-gen').then(response => response.json()).then(data => {
    data["questions"].forEach(question => {
      questionQueue.push(question);
    });
  });
}

const EvaluateQuestion = (answerChoice) => {
  const curQuestion = questionQueue.shift();
  if (answerChoice == curQuestion[2]) {
    alert("You got the answer correct!!")
  }
  else {
    alert("Incorrect!! The correct answer is ".concat(curQuestion[1][2]));
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
