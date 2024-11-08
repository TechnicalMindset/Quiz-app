const questions = [
    {
        question: "What is the purpose of the OSI physical layer?",
        options: [
            { text: "Controlling access to media", correct: false },
            { text: "Transmitting bits across the local media", correct: true, explanation: "The physical layer handles the actual transmission of raw data bits." },
            { text: "Performing error detection on received frames", correct: false },
            { text: "Exchanging frames between nodes over physical network media", correct: false }
        ]
    },
    {
        question: "Which statement is correct about network protocols?",
        options: [
            { text: "Define hardware and mounting", correct: false },
            { text: "Define message exchange between source and destination", correct: true, explanation: "Network protocols specify how data is transmitted and received." },
            { text: "Function only in network access layer of TCP/IP", correct: false },
            { text: "Only required for remote network devices", correct: false }
        ]
    },
    {
        question: "Which three acronyms/initialisms represent standards organizations? (Choose three)",
        options: [
            { text: "IANA", correct: true },
            { text: "TCP/IP", correct: false },
            { text: "IEEE", correct: true },
            { text: "IETF", correct: true },
            { text: "OSI", correct: false },
            { text: "MAC", correct: false }
        ]
    },
    {
        question: "What networking term describes a particular set of rules at one layer that govern communication at that layer?",
        options: [
            { text: "Duplex", correct: false },
            { text: "Encapsulation", correct: false },
            { text: "Error checking", correct: false },
            { text: "Protocol", correct: true, explanation: "A protocol defines the rules for communication within a layer." }
        ]
    },
    {
        question: "Which layer of the OSI model defines services to segment and reassemble data for individual communications between end devices?",
        options: [
            { text: "Application", correct: false },
            { text: "Presentation", correct: false },
            { text: "Session", correct: false },
            { text: "Transport", correct: true, explanation: "The transport layer handles segmentation and reassembly of data for end-to-end communication." },
            { text: "Network", correct: false }
        ]
    },
    {
        question: "What is the purpose of protocols in data communications?",
        options: [
            { text: "Specifying the bandwidth of the channel or medium for each type of communication", correct: false },
            { text: "Specifying the device operating systems that will support the communication", correct: false },
            { text: "Providing the rules required for a specific type of communication to occur", correct: true, explanation: "Protocols ensure that data can be transmitted between devices in an understandable format." },
            { text: "Dictating the content of the message sent during communication", correct: false }
        ]
    },
    {
        question: "Which term refers to the set of rules that define how a network operates?",
        options: [
            { text: "Standard", correct: true, explanation: "A network standard defines how the network operates and sets the rules for communication." },
            { text: "Protocol", correct: false },
            { text: "Model", correct: false },
            { text: "Domain", correct: false }
        ]
    },
    {
        question: "Which three layers of the OSI model make up the application layer of the TCP/IP model? (Choose three)",
        options: [
            { text: "Data Link", correct: false },
            { text: "Network", correct: false },
            { text: "Transport", correct: false },
            { text: "Session", correct: true },
            { text: "Presentation", correct: true },
            { text: "Application", correct: true }
        ]
    },
    {
        question: "Which organization publishes and manages the Request for Comments (RFC) documents?",
        options: [
            { text: "IEEE", correct: false },
            { text: "ISO", correct: false },
            { text: "IETF", correct: true, explanation: "The IETF publishes RFCs that define standards and protocols for the internet." },
            { text: "TIA/EIA", correct: false }
        ]
    },
    {
        question: "Which two OSI model layers have the same functionality as a single layer of the TCP/IP model? (Choose two)",
        options: [
            { text: "Data Link", correct: true },
            { text: "Network", correct: false },
            { text: "Physical", correct: true },
            { text: "Session", correct: false },
            { text: "Transport", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = ""; // Clear previous question
    const questionData = questions[currentQuestion];

    // Create question title
    const questionTitle = document.createElement("h2");
    questionTitle.textContent = questionData.question;
    questionContainer.appendChild(questionTitle);

    // Create answer options
    questionData.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.textContent = option.text;
        optionDiv.onclick = () => checkAnswer(option, optionDiv);
        questionContainer.appendChild(optionDiv);
    });
}

function checkAnswer(selectedOption, optionDiv) {
    // Disable clicking other options
    document.querySelectorAll(".option").forEach(opt => opt.onclick = null);
    document.getElementById("next-button").disabled = false;

    if (selectedOption.correct) {
        optionDiv.classList.add("correct");
        score++;
        showMessage("✅ That’s right!", selectedOption.explanation);
    } else {
        optionDiv.classList.add("incorrect");
        showMessage("❌ The answer is wrong. Try again!", selectedOption.explanation);
        // Highlight correct answer
        const correctOption = questions[currentQuestion].options.find(opt => opt.correct);
        const correctDiv = Array.from(document.getElementsByClassName("option")).find(div => div.textContent === correctOption.text);
        correctDiv.classList.add("correct");
    }
}

function showMessage(message, explanation) {
    const messageContainer = document.createElement("div");
    messageContainer.textContent = message;
    document.getElementById("question-container").appendChild(messageContainer);
    if (explanation) {
        const explanationDiv = document.createElement("p");
        explanationDiv.textContent = explanation;
        document.getElementById("question-container").appendChild(explanationDiv);
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById("next-button").disabled = true;
    } else {
        showResults();
    }
}

function showResults() {
    document.querySelector(".quiz-container h1").textContent = "Quiz Completed!";
    document.getElementById("question-container").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    const scoreContainer = document.getElementById("score-container");
    document.getElementById("score").textContent = `${score} out of ${questions.length}`;
    scoreContainer.style.display = "block";
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    loadQuestion();
    document.getElementById("score-container").style.display = "none";
    document.querySelector(".quiz-container h1").textContent = "📝 Networking Principles Quiz 📝";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("next-button").style.display = "block";
    document.getElementById("next-button").disabled = true;
}

loadQuestion();
