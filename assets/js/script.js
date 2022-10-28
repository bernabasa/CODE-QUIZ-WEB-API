var questions = [
    {
        questOne: "When you pass a function into a function it is called?",
        choices: ["Hosting",
                "Call back Function",
                "Loop",
                "Pseudocode"],
        answer: "Call back Function"
    },
    {
        questTwo: "What are the two ways to create a function?",
        choices: ["Function expression",
                "Function declaration",
                "All of the above"
            ],
            answer: "All of the above"
    },
    {
        questThree: "What is a variable?",
        choices: ["A named location for a value that gets stored in the browser's memory",
                " is A collaction of functionalites and data that access through one name",

        ],
        answer: "A named location for a value that gets stored in the browser's memory"

    },
    ];

    var score = 0;
    var startTimer = document.querySelector("#startTimeBtn");
    var currentTime = document.querySelector("#currentTime");
    var timeLeft = 80;
    var timepenality = 10;
    
