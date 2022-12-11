//create server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
app.use(express.static('server/public'));
//call body-parser so server can read incoming data
app.use(bodyParser.urlencoded({extended:true}));

//global variables
let solutions = [];

//post route to recieve input values from client
app.post('/postCalculation', (req, res) => {
    console.log('recieved inputs from server')
    //add incoming object to solutions array
    solutions.push(req.body);
    //run incomig object through function 
    //that will run the calculation
    calculateSolution(solutions);
    //lets us know array arrived in /post route
    //and was added to solutions array
    res.sendStatus(200);
})

function calculateSolution(solutions) {
    //this will grab the most recently added array
    //in the solutions array
    let currentCalculation = solutions[solutions.length-1]
    //conditional statements for each operator
    //that will evanluate which operator is being used
    //and send it to a second function 
    //to actually solve the equation
    if (currentCalculation.operator === '+') {
        currentCalculation.result = addition(currentCalculation);
        //this function will solve the equation
        function addition(currentCalculation) {
            let result = Number(currentCalculation.numberOne) + Number(currentCalculation.numberTwo);
            return result;
            console.log(result);
        }
        //same conditional for each operation
    } else if (currentCalculation.operator === '-') {
        currentCalculation.result = subtraction(currentCalculation);
        function subtraction(currentCalculation) {
            let result = Number(currentCalculation.numberOne) + Number(currentCalculation.numberTwo);
            return result;
            console.log(result);
        }
    } else if (currentCalculation.operator === '*') {
        currentCalculation.result = multiplication(currentCalculation);
        function multiplication(currentCalculation) {
            let result = Number(currentCalculation.numberOne) * Number(currentCalculation.numberTwo);
            return result;
            console.log(result);
        }
    } else if (currentCalculation.operator === '/') {
        currentCalculation.result = division(currentCalculation);
        function division(currentCalculation) {
            let result = Number(currentCalculation.numberOne) / Number(currentCalculation.numberTwo);
            return result;
            console.log(result);
        }
    } 
}


//get route to send solutions back to client
app.get('/getSolutions', (req, res) => {
    console.log('sending solutions array to client');
    res.send(solutions);
    console.log(solutions)
})


//start server
app.listen(PORT, () => {
    console.log ('server is running')
  })