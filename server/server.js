//create server
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
app.use(express.static('server/public'));
//call body-parser so server can read incoming data
app.use(bodyParser.urlencoded({extended:true}))

//global variables
let equationString = [];
let equation;

//post route that will recieve new data
//will also run calculations here too
app.post('/submitCalculation', (req, res) => {
    //store incoming values from browser as a variable
    equation = req.body;
    let numOne = Number(equation.numberOne);
    let numTwo = Number(equation.numberTwo);
    let operator = equation.operator;
    //if statement to run addition calculation
    //will store equation in a string
    if (operator === "+") {
        let solution = Number(numOne) + Number(numTwo);
        equation = `${numOne}${operator}${numTwo} = ${solution}`;
        equationString.push(equation);
    }

    //response to send back to console on browser
    res.sendStatus(201);
}) 

//this get route will send over just the solution
//to the most recent equation
app.get('/showSolution', (req, res) => {
    //send just the solution 
    res.send(solution);

})

//this get route will send over the whole equation
//so that equation histroy can be displayed on the DOM
app.get('/showPreviousEquations', (req, res) => {
    //sending calculations back to browser as a string
    res.send(equationString);
    //empty string after it has been sent back in 
    //preperation for new string/equation
    equationString = [];
})




//start server
app.listen(PORT, () => {
    console.log ('server is running')
  })