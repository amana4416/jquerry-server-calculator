$(document).ready(onReady);

function onReady() {
    console.log('DOM is loaded!');
    $('#submitButton').on('click', submitCalculation);
    handleOperatorButtons();
}

//global variables
let numberOne = '';
let numberTwo = '';
let operation = '';

//mega function to hold click operators for
//each operator button
function handleOperatorButtons() {
$('#additionOperatorButton').on('click', additionOperator)
$('#subtractionOperatorButton').on('click', subtractionOperator)
$('#multiplicationOperatorButton').on('click', multiplicationOperator)
$('#divisionOperatorButton').on('click', divisionOperator)
$('#clearButton').on('click', clearCalculator)
}


//will grab input values when submit button is clicked
function submitCalculation() {
    //test to see if button works
    console.log('submit')
    //grab input values
    let newNumberOne = $('#numberOneInput').val();
    let newNumberTwo = $('#numberTwoInput').val();
    //make a new object to send to server
    let newCalculation = {
        numberOne: newNumberOne,
        numberTwo: newNumberTwo,
        operator: operation
    };
    //post request to send object over to server
    $.ajax({
        url: '/postCalculation',
        method: 'post', 
        data: newCalculation
    }).then((res) => {
        //seeing if our input values posted
        //and were added to the array server side
        console.log(res);
    });
     //call get request after values have been 
     //sent to server in a post route
     getSolutions();
}

//function to get solution back from server
function getSolutions() {
    $.ajax({
        url: '/getSolutions',
        method: 'get'
    }).then((res) => {
        //empty out solution when a new calcualtion is made 
        //that way most recent solution can be displayed
        $('#solution').empty();
        //display solution on DOM
        $('#solution').append(`
        <h2>Solution: ${res[res.length-1].result} </h2>
        `);
        //empty out previous equations list and create a new one
        //each time a calculation is made
        $('#previousEquations').empty();
        //show previous equations on DOM in a list
        for (let part of res) {
            $('#previousEquations').append(`
            <li>
            ${part.numberOne} ${part.operator} ${part.numberTwo} = ${part.result}
            </li>
            `)
            };
    });
}

//function to clear inputs once
function clearCalculator(){
    // console.log('clear!');
    $('#numberOneInput').val('');
    $('#numberTwoInput').val('');
}

//each operator will have their own function 
//so the operator can be stored in the global variable operation
function additionOperator() {
    console.log('addition');
    operation = '+';
}

function subtractionOperator() {
    console.log('subtract');
    operation = '-';
}

function multiplicationOperator() {
    console.log('multiply');
    operation = '*';
}

function divisionOperator() {
    console.log('divide');
    operation = '/';
}
