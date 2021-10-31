

var test = () => {
  console.log("star");
}

var queue = [] // list of tupes (question, dict of (int, string choice), right choice)
const RefreshThreshold = 5;
const RefreshSize = 20;

const EvaluateQuestion = (answerChoice) => {
  const curQuestion = queue.shift();
  
}

setInterval(function() {
    if (queue.length <= RefreshThreshold) {
      console.log("calling backend for more questions");
      // add the backend response to the queue
    }
}, 1000); // update about every second
// display questions

//evbaulates answers

//fetch new questions from backend

// having a queue of questiosn
