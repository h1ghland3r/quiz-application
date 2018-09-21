// init general variables
let counter = 0;
let score = 0;
let numberOfErrors = 0;
let maxErrors = 3;
let numberOfQuestions = 3;

// get elements
let randomNumber = document.getElementById('randomNumber');
let getRomanInputed = document.getElementById('romanInputed');
let btnSubmit = document.getElementById('btnSubmit');
let btnRestart = document.getElementById('btnRestart');

// gerenate random number
const min = 1; // min is 1 because there is no zero in the roman numerals
let max = 10; // sets the desired maxinum number for the random
let generateNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// quiz
let questions = [];
function generateQuestions() {
    for (let i = 0; i < numberOfQuestions; i++) {
        questions.push(generateNumber(min, max));
    }
    randomNumber.innerHTML = questions[0];
    return questions;
}
console.log(questions); // TODO - Remove

function verifyAnswer() {
    counter++;
    if (counter < numberOfQuestions) {
        verifyRomanNumeral();
        randomNumber.innerHTML = questions[counter];
    }
    if (counter === numberOfQuestions) {
        verifyRomanNumeral();
        alert('You scored ' + score + ' points of ' + numberOfQuestions + '.');
        randomNumber.innerHTML = 'No more questions.';
    }
    if (counter > numberOfQuestions) {
    }
    if (numberOfErrors === maxErrors) {
        displayErrorMessage();
    }
    console.log("errors: " + numberOfErrors); // TODO - Remove
}

// calculates roman numeral from an arabic number
const romanValues = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
];

function convertToRoman(number) {
    if (number > 0) {
        for (i in romanValues) {
            if (number >= romanValues[i][0]) {
                return romanValues[i][1] + convertToRoman(number - romanValues[i][0]);
            }
        }
    } else {
        return '';
    }
}

// check if number displayed matches with the inputed roman numeral
function verifyRomanNumeral() {
    let getQuestionNumber = randomNumber.innerText;
    let numberToRoman = convertToRoman(getQuestionNumber);
    if (numberToRoman.toUpperCase() === getRomanInputed.value.toUpperCase()) {
        alert('right answer');
        score++;
    } else {
        numberOfErrors++;
    }
    getRomanInputed.value = '';
}

function restartQuiz() {
    getRomanInputed.value = '';
    counter = 0;
    score = 0;
    numberOfErrors = 0;
    questions = [];
    return generateQuestions();
}

function displayErrorMessage() {
    randomNumber.innerHTML = 'Not this time. Start again.';
    numberOfErrors = 0;
}

// regex for only allow roman numerals in the input
function regexOnInput() {
    let string = this.value.toString();
    let stringReplaced = string.match(/^[MDCLXVI]+$/gi);
    return this.value = stringReplaced;
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    generateQuestions();
});

btnSubmit.addEventListener('click', function() {
    verifyAnswer();
});

btnRestart.addEventListener('click', function() {
    restartQuiz();
});

['blur', 'key up', 'input', 'paste', 'change'].forEach(function(e) {
    getRomanInputed.addEventListener(e, regexOnInput, false);
});