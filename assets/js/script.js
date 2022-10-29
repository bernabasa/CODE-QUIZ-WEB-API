var questions = [
    {
        title: "When you pass a function into a function it is called?",
        choices: ["Hosting",
                "Call back Function",
                "Loop",
                "Pseudocode"],
        answer: "Call back Function"
    },
    {
        title: "What are the two ways to create a function?",
        choices: ["Function expression",
                "Function declaration",
                "All of the above"
            ],
            answer: "All of the above"
    },
    {
        title: "What is a variable?",
        choices: ["A named location for a value that gets stored in the browser's memory",
                " is A collaction of functionalites and data that access through one name",

        ],
        answer: "A named location for a value that gets stored in the browser's memory"

    },
    ];

    var score = 0;
    var questionIndex = 0;
    var startTimer = document.querySelector("#startTimeBtn");
    var currentTime = document.querySelector("#currentTime");
    var timeLeft = 80;
    var timepenality = 10;
    var holdInterval = 0;
    
    var title = document.querySelector("#quizTitle");
    var quiz = document.querySelector("#quiz");
    var quizInfo = document.querySelector("#quizInfo");
    var questionDiv = document.querySelector("#questionDiv");
    var quizText = document.querySelector("#quizText");
    var specialMsg = document.querySelector("#specialMsg");

    startTimer.addEventListener("click", function() {
        // hide title and start button
        title.hidden = true;
        startTimer.hidden = true;
        
        if (holdInterval === 0) {
            holdInterval = setInterval(function() {
                timeLeft--;
                currentTime.textContent = "Timer: " + timeLeft;
                if (timeLeft === 0) {
                    clearInterval(holdInterval);
                    currentTime.textContent = "Time's Up!";
                    endQuiz();
                }
            }, 1000);
        }
        questionStart(questionIndex);
    });

    var questionStart = function(questionIndex) {

        //clear exisiting data
        questionDiv.innerHTML = "";
        quizText.innerHTML = "";

        var question = questions[questionIndex].title;
        var choices = questions[questionIndex].choices;
        quizText.textContent = question;

        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "btn");
        choiceBtn.textContent = choices;

        // split each choice into it's own button
        choices.forEach(function(newItem) {
            var choiceBtn = document.createElement("button");
            choiceBtn.setAttribute("class", "btn");
            choiceBtn.textContent = newItem;
            questionDiv.appendChild(choiceBtn);
            choiceBtn.addEventListener("click", (compareSelection));
        })
    };
    var compareSelection = function(event) {
        var element = event.target;
        if(element.matches(".btn")) {
            if (element.textContent == questions[questionIndex].answer) {
                score++;
            }else {
                timeLeft = timeLeft - timepenality;
            }
        }
        questionIndex++;
        if (questionIndex >= questions.length) {
            endQuiz();
        } else {
            questionStart(questionIndex);
        }
    };

    var endQuiz = function() {
        questionDiv.innerHTML = "";
        quizText.innerHTML = "";
        currentTime.innerHTML = "";

        title.hidden = false;
        title.textContent = "Time's Up!";
        title.setAttribute("class", "title");
        if(timeLeft >= 0) {
            var timeRemaining = timeLeft;
            //stop timer
            clearInterval(holdInterval);
            quizText.setAttribute("class", "message");
            quizText.textContent = "Your final score is: " + timeRemaining;
            quizInfo.appendChild(quizText);
        }
        questionDiv.setAttribute("class", "form");
        var createLabel = document.createElement("label");
        createLabel.setAttribute("id", "label");
        createLabel.textContent = "Enter initials: ";

        questionDiv.appendChild(createLabel);

        var createInput = document.createElement("input");
        createInput.setAttribute("type", "text");
        createInput.textContent = "";

        questionDiv.appendChild(createInput);

        var submit = document.createElement("button");
        submit.setAttribute("type", "submit");
        submit.setAttribute("id", "submit");
        submit.setAttribute("class", "btn");
        submit.textContent = "Save Highscore!";

        questionDiv.appendChild(submit);

        //save initials and score to localstorage

        submit.addEventListener("click", function(){
            var userInitials = createInput.value;
            // create object for final score

            var finialScore = {
                initials: userInitials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores");

            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }

            allScores.push(finialScore);

            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            location.replace("./highScores.html");
        

        }
        );



    };