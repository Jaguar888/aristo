// scripts.js

// Example Cipher (Aristocrat Cipher)
let cipherText = "Gsv jfrxp yildm ulc qfnkh levi gsv ozab wlt!";
let correctAnswer = "The quick brown fox jumps over the lazy dog";
let timeRemaining = 60;
let timerInterval;
let competitionEnded = false;

window.onload = function() {
    // Create input fields based on the cipher
    createInputFields();

    // Show the cipher text
    document.getElementById("cipher-text").textContent = cipherText;

    // Start the timer countdown
    startTimer();
};

function createInputFields() {
    let inputFieldsDiv = document.getElementById("input-fields");
    let letterCounts = {};

    // Count the frequency of each letter in the cipher text
    for (let letter of cipherText) {
        if (letter.match(/[a-zA-Z]/)) {
            letter = letter.toLowerCase();
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        }
    }

    // Create textboxes for each letter in the cipher
    for (let letter of cipherText) {
        if (letter.match(/[a-zA-Z]/)) {
            let letterContainer = document.createElement('div');
            letterContainer.classList.add('input-letter-container');

            // Create the letter element (for visual purposes)
            let letterElement = document.createElement('div');
            letterElement.textContent = letter.toUpperCase();
            letterContainer.appendChild(letterElement);

            // Create the input box for user guess
            let inputBox = document.createElement('input');
            inputBox.setAttribute('maxlength', '1');
            inputBox.setAttribute('placeholder', '?');
            letterContainer.appendChild(inputBox);

            // Create the count of how many times the letter appears
            let letterCount = document.createElement('div');
            letterCount.textContent = `(${letterCounts[letter.toLowerCase()]})`;
            letterContainer.appendChild(letterCount);

            inputFieldsDiv.appendChild(letterContainer);
        }
    }
}

function startTimer() {
    timerInterval = setInterval(function() {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endCompetition("Time's up! No one solved the cipher.");
        } else {
            timeRemaining--;
            document.getElementById("timer").textContent = timeRemaining;
        }
    }, 1000);
}

function submitAnswer() {
    if (competitionEnded) return;

    let userAnswer = '';
    let inputs = document.querySelectorAll('#input-fields input');

    // Collect the user answers from the input boxes
    inputs.forEach(input => {
        userAnswer += input.value.toLowerCase();
    });

    if (userAnswer === correctAnswer.toLowerCase()) {
        endCompetition("Congratulations! You solved the cipher!");
    } else {
        alert("Incorrect answer. Try again!");
    }
}

function endCompetition(message) {
    competitionEnded = true;
    document.getElementById("result-section").style.display = "block";
    document.getElementById("result-message").textContent = message;
    document.getElementById("solution-message").textContent = `The correct answer was: ${correctAnswer}`;
    document.getElementById("answer-section").style.display = "none";
    document.getElementById("timer-section").style.display = "none";
}
