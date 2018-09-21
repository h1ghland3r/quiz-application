// init general variables
let counter = 0;
let score = 0;
let numberOfErrors = 0;
let maxErrors = 3;
let numberOfQuestions = 10;

// get elements
let randomNumber = document.getElementById('randomNumber');
let getRomanInputed = document.getElementById('romanInputed');
let descriptionForRandomNumber = document.getElementsByClassName('text-description--number')[0];
let btnSubmit = document.getElementById('btnSubmit');
let btnRestart = document.getElementById('btnRestart');

// gerenate random number
const min = 1; // min is 1 because there is no zero in the roman numerals
let max = 100; // set the desired maxinum number for the random
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

function verifyAnswer() {
    counter++;
    // continue while there are questions available
    if (counter < numberOfQuestions) {
        verifyRomanNumeral();
        randomNumber.innerHTML = questions[counter];
    }
    // check the result when reachs the last question
    if (counter === numberOfQuestions) {
        verifyRomanNumeral();
        if (numberOfErrors < maxErrors) {
            descriptionForRandomNumber.classList.toggle('d-none');
            randomNumber.classList.add('random-number--success');
            if (score === 0) {
                randomNumber.innerHTML = 'You scored <span class="lato-bold"> ' + score + '</span> points of <span class="lato-bold">' + numberOfQuestions + '</span>. Looser!';
            }
            if (score >= 1 && score <=3 ) {
                randomNumber.innerHTML = 'You scored <span class="lato-bold">' + score + '</span> points of <span class="lato-bold">' + numberOfQuestions + '</span>. Not bad!';
            }
            if (score >= 4 && score <=5 ) {
                randomNumber.innerHTML = 'You scored <span class="lato-bold">' + score + '</span> points of <span class="lato-bold">' + numberOfQuestions + '</span>. Good starter!';
            }
            if (score >= 5 && score <=7 ) {
                randomNumber.innerHTML = 'You scored <span class="lato-bold">' + score + '</span> points of <span class="lato-bold">' + numberOfQuestions + '</span>. Really nice!';
            }
            if (score >= 8 && score <=9 ) {
                randomNumber.innerHTML = 'You scored <span class="lato-bold">' + score + '</span> points of <span class="lato-bold">' + numberOfQuestions + '</span>. Impressive!';
            }
            if (score === 10 ) {
                randomNumber.innerHTML = 'You scored <span class="lato-bold">' + score + '</span> points of <span class="lato-bold">' + numberOfQuestions + '</span>. Perfect!';
            }
            btnRestart.classList.toggle('d-block');
        }
    }
    // calls error message function when reaches the max number of wrong answers
    if (numberOfErrors >= maxErrors) {
        displayErrorMessage();
    }
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
        alert('Right answer!');
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
    descriptionForRandomNumber.classList.toggle('d-none');
    randomNumber.classList.remove('random-number--success');
    randomNumber.classList.remove('random-number--fail');
    return generateQuestions();
}

function displayErrorMessage() {
    descriptionForRandomNumber.classList.toggle('d-none');
    randomNumber.classList.add('random-number--fail');
    randomNumber.innerHTML = 'You missed the answer three times.';
    btnRestart.classList.toggle('d-block');
    numberOfErrors = 0;
}

// regex for only allow roman numerals in the input
function regexOnInput() {
    let string = this.value.toString();
    let stringReplaced = string.match(/^[MDCLXVI]+$/gi);
    let stringAfterRegex = this.value = stringReplaced;
    return stringAfterRegex;
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
    this.classList.toggle('d-block');
});

['blur', 'key up', 'input', 'paste', 'change'].forEach(function(e) {
    getRomanInputed.addEventListener(e, regexOnInput, false);
});