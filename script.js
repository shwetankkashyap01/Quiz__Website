let allQuestions = [
  {
    question: "Q1. If x tan 45° sin 30° = cos 30° tan 30°, then x is equal to",
    choices: ["√3", "1/2", "1/√2", "1"],

    correctAnswer: 2,
  },
  {
    question: "Q2. One equation of pair of dependent linear equation -5x + 7y = 2. The second equation can be",
    choices: ["10x + 14y + 4 = 0", "10x - 14y = -4", "-10x + 14y + 4 = 0", "-10x - 14y + 4 = 0"],

    correctAnswer: 1,
  },
  {
    question: "Q3. sin 2B = 2 sin B is true when B is equal to",
    choices: ["30°", "60°", "0°", "90°"],

    correctAnswer: 2,
  },

  {
    question: "Q4. If the radius of base of a right circular cylinder is halved, keeping the height same, the ratio of the volume of the reduced cylinder to that of the original cylinder is:",
    choices: ["1: 4", "3 : 4", "2 : 3", "4 : 1"],

    correctAnswer: 0,
  },
  {
    question: "Q5. If P(A) denotes the probability of an event then:",
    choices: ["P(A) < 0", "P(A) > 0", "0 ≤ P(A) ≤ 1", "-1 ≤ P(A) ≤ 0"],

    correctAnswer: 2,
  },
];

let questionCounter = 0;
let totalQuestions = allQuestions.length;
let totalScore = 0;
let list = document.createElement("ul");
let nextButton = document.getElementById("Next");
let prevButton = document.getElementById("Previous");
let submButton = document.getElementById("submit");
const progressbarfull = document.querySelector("#progressBarFull");
prevButton.disabled = true;
submButton.disabled = true;

let userAnswer = allQuestions[questionCounter].userAnswer;
let score = allQuestions[questionCounter].score;

let quiz = function quiz() {
  let singleQuestion = allQuestions[questionCounter];


  let correctAnswer = singleQuestion.correctAnswer;
  let radioGroup = document.getElementById("radioGroup");
  let question = document.getElementById("question");
  question.innerHTML = singleQuestion.question;
  radioGroup.appendChild(list);


  for (let i = 0; i < singleQuestion.choices.length; i++) {
    let item = document.createElement("li");
    let optionButton = document.createElement("input");
    let optionText = document.createTextNode(singleQuestion.choices[i]);

    optionButton.setAttribute("type", "radio");
    optionButton.setAttribute("name", "quiz");
    optionButton.setAttribute("id", `choiceRadio-${i}`);
    optionButton.setAttribute("value", i);

    console.log(userAnswer);
    if (i == userAnswer) {
      optionButton.checked = true;
    }

    list.appendChild(item);
    item.appendChild(optionButton);
    item.appendChild(optionText);
  }
};

quiz();


let usersChoice = function usersChoice() {
  userAnswer = document.querySelectorAll('input[name="quiz"]:checked');


  if (userAnswer.length > 0) {
    userAnswer = userAnswer[0].value;
    return userAnswer;
  } else {

    alert("Please Select one of the Option");
  }
};

let calcScore = function calcScore() {
  let correctAnswer = allQuestions[questionCounter].correctAnswer;

  if (usersChoice() == correctAnswer) {
    score = 1;
  } else {
    score = 0;
  }


  totalScore += score;
};

let removeOptions = function removeOptions() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
};

let buttonLogic = function buttonLogic() {
  if (questionCounter < totalQuestions) {
    removeOptions();
    quiz();
  }

  if (questionCounter == totalQuestions) {

    nextButton.parentNode.removeChild(nextButton);

    const dselectall = () => {
      answers.forEach((usersChoice) => (usersChoice.checked = false));
    };


    removeOptions();


    let result = `
     Your Score = ${totalScore}/5
     `;
    question.innerHTML = result;
    prevButton.parentNode.removeChild(prevButton);

  }

  if (questionCounter == 0) {
    prevButton.style.display = "none";
    submButton.style.display = "none";
    if (questionCounter < 5) {
      submButton.disabled = true;
      submButton.style.display = "none";
    }

    if (questionCounter == 4) {
      prevButton.disabled = true;
      nextButton.disabled = true;
    }
  }
};


let next = function () {
  calcScore();
  questionCounter++;
  progressBarFull.style.width = `${(questionCounter / totalQuestions) * 100}%`;
  console.log(`You scored ${score} on this question`);
  buttonLogic();
  const dselectall = () => {
    answers.forEach((usersChoice) => (usersChoice.checked = false));
  };

  prevButton.disabled = false;
  submButton.disabled = true;
  if (questionCounter == 4) {
    prevButton.style.display = "none";
    nextButton.disabled = true;
    nextButton.style.display = "none";
    submButton.disabled = false;
  }
};

let submit = function () {
  calcScore();
  questionCounter++;
  progressBarFull.style.width = `${(questionCounter / totalQuestions) * 100}%`;

  buttonLogic();
  submButton.disabled = true;
  submButton.style.display = "none";
};


let prev = function () {
  questionCounter--;
  if (!totalScore == 0) {
    totalScore--;
  }
  console.log(`You scored ${score} on this question`);
  buttonLogic();
};


nextButton.addEventListener("click", next);
prevButton.addEventListener("click", prev);
submButton.addEventListener("click", submit);
