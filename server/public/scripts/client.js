$(document).ready(onReady);

function onReady() {
    console.log('DOM is loaded!');
    $('#submitButton').on('click', submitCalculation);
    $('#additionOperatorButton').on('click', addition);
}

//global variables
let operator;

//when the submit button is clicked
//function will collect input values
//and send them to server.js
//where calculations will occur
//will be sent to server.js using a /post route
function submitCalculation() {
    //test to see if button works
    console.log('submit')
    //grab input values
    let newNumberOne = Number($('#numberOneInput').val());
    let newNumberTwo = Number($('#numberOneInput').val());
    //make a new object to send to server
    let newCalculation = {
        numberOne: newNumberOne,
        numberTwo: newNumberTwo,
        operator: operator
    }
    //send to server using a POST route
    $.ajax({
        url: '/submitCalculation',
        method: 'post',
        data: newCalculation
      }).then((res) => {
        //test to see if server recieved newCalculation object
        console.log('send calculation to server');
        //call showAnswer function
        //so answer to most recent equation can be displayed on DOM
        showSolution();
        //call showPreviousEquations function 
        //so answer history can be sent back to browser
        showPreviousEquations();
      })
      //empty input values after hitting submit
      $('input').val('');
}

function showSolution() {
    $.ajax({
        url: '/showSolution',
        method: 'get'
    }).then((res) => {
        console.log('recieved solution from server')
        //append answer to the DOM
        $('#currentSolution').append(`
        <h2>${res}</h2>
        `);

    })
}


//sending a req to server, 
//server will run the equation and save
//the equation as a string
//that we can append to a table 
//to show previous calculations
function showPreviousEquations() {
    $.ajax({
        url: '/showPreviousEquations',
        method: 'get'
    }).then((res) => {
        console.log('recieved equation from server');
        //append calculation to list
        $('#previousEquations').append(`
        <li>${res}</li>
        `);
    })
}


//functions for each operator
function addition() {
    let operatorToSend = "+";
    operator = operatorToSend;
}
