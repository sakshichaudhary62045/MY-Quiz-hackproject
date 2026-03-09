const questions = [
    {
        question: "What is JavaScript mainly used for?",
        answers: [
            { text: "Styling web pages", correct: false },
            { text: "Structuring web page", correct: false },
            { text: "Making web pages interactive", correct: true },
            { text: "Creating databases", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "Which method is used to print something in the browser console?",
        answers: [
            {text: "print()", correct: false},
            {text: "console.log()", correct: true},
            {text: "display()", correct: false},
            {text: "log.console()", correct: false}
        ]
    },
    {
        question: "What is the correct way to write a JavaScript comment?",
        answers: [
             {text: "&lt;!-- comment --&gt;", correct: false},
            {text: "// comment", correct: true},
            {text: "** comment **", correct: false},
            {text: "## comment", correct: false}
        ]
    },
    {
        question: "Which symbol is used for strict equality in JavaScript?",
        answers: [
            {text: "=", correct: false},
            {text: "==", correct: false},
            {text: "===", correct: true},
            {text: "!=", correct: false}
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            {text: "Document Object Model", correct: true},
            {text: "Data Object Model", correct: false},
            {text: "Document Order Model", correct: false},
            {text: "Digital Object Model", correct: false},

        ]
    },
    {
        question: "Which method is used to select an element by ID?",
        answers: [
            {text: "getElementById()", correct: true},
            {text: "querySelectorAll()", correct: false},
            {text: "getElementsByClass()", correct: false},
            {text: "selectElement()", correct: false}
        ]
    },
    {
        question: "Which data type is used for text in JavaScript?",
        answers: [
            {text: "Number", correct: false},
            {text: "Boolean", correct: false},
            {text: "String", correct: true},
            {text: "Object", correct: false}
        ]
    },
    {
        question: "Which method converts a string to uppercase?",
        answers: [
            {text: "toUpperCase()", correct: true},
            {text: "upperCase()", correct: false},
            {text: "changeUpper()", correct: false},
            {text: "toCaps()", correct: false}
        ]
    },
    {
        question: "Which JavaScript method is used to convert a string into an array?",
        answers: [
            {text: "split()", correct: true},
            {text: "join()", correct: false},
            {text: "slice()", correct: false},
            {text: "push()", correct: false}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
   score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    } );
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }else{
        startQuiz();
    }
    });
startQuiz();
